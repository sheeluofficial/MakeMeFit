import UserModel from "../../models/userModel";
import bcrypt from "bcryptjs";
import customError from "../../utils/customError";
import { generateJwtToken } from "../../middlewares/jwtAuth";
import config from "../../config/config";
import nodemailer, { Transporter } from "nodemailer";
import otpModel from "../../models/otpModel";

const SALT_ROUNDS = 10;

const createAuthService = () => {
  const userSignup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new customError("Email already registered", 409);
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const isBlocked: boolean = false;

      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isBlocked,
      });
      return newUser;
    } catch (error: any) {
      throw error;
    }
  };

  const userLogin = async (email: string, password: string) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new customError("User not found", 404);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new customError("Invalid Email or Password", 401);
      }

      const token = generateJwtToken({
        id: user._id.toString(),
        role: "users",
      });
      return { token, user };
    } catch (error: any) {
      throw error;
    }
  };

  const sendOtp = async (email: string) => {
    try {
      const transporter: Transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: config.EMAIL_NODE_MAILER,
          pass: config.EMAIL_PASSWORD,
        },
      });

      let otp = Math.floor(10000 + Math.random() * 900000).toString();
      let expireAt = new Date();

      // Add 15 minutes to the current time
      expireAt.setMinutes(expireAt.getMinutes() + 15);

      otpModel.updateOne({ email }, { otp, expireAt }, { upsert: true });

      const mailOptions = {
        from: config.EMAIL_NODE_MAILER,
        to: email,
        subject: "OTP for Login",
        text: `Your OTP for login is: ${otp}. The otp is valid for 15 mins`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    } catch (error: any) {
      throw new customError(error.message,400);
    }
  };

  const verifyOtp = async (enteredOtp: number, email : string) => {
    try {
        let otpObj  = await otpModel.findOne({ email });

        if (!otpObj) {
            return { message: "OTP not found" };
        }
        if (otpObj.expireAt && otpObj.expireAt.getTime() >= Date.now()) {
            if (enteredOtp === otpObj.otp) {
                return { message: "OTP verified" };
            } else {
                return { message: "Invalid OTP" };
            }
        } else {
            return { message: "OTP expired" };
        }
    } catch (error: any) {
        throw new customError(error.message,400);
    }
};


  return {
    userSignup,
    userLogin,
    sendOtp,
    verifyOtp
  };
};

export default createAuthService;
