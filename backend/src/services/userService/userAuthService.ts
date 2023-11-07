import UserModel from "../../models/userModel";
import bcrypt from "bcryptjs";
import customError from "../../utils/customError";
import { generateJwtToken } from "../../middlewares/jwtAuth";

const SALT_ROUNDS = 10;

const createAuthService = () => {

    const userSignup = async (
        firstName: string,
        lastName:string,
        email: string,
        password: string
      ) => {
        try {
          const existingUser = await UserModel.findOne({ email });
          if (existingUser) {
            throw new customError("Email already registered",409);
          }
        
          const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
          const isBlocked :boolean = false;
    
          const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isBlocked
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
            throw new customError("User not found",404);
          }
    
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new customError("Invalid Email or Password",401);
          }
    
          const token = generateJwtToken({ id: user._id.toString() , role:'users' });
          return { token, user };
        } catch (error: any) {
          throw error;
        }
      };

      return {
        userSignup,
        userLogin
      }
      
    }
    
    export default createAuthService;