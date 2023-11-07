import UserModel from "../../models/userModel";
import bcrypt from "bcryptjs";
import customError from "../../utils/customError";

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

      return {
        userSignup
      }
      
    }
    
    export default createAuthService;