import { Document, Schema } from "mongoose"

export interface OTP extends Document {

 email : string;
 otp : number;
 expireAt : Date;
}