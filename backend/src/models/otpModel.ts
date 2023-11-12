import mongoose, { Schema } from "mongoose";
import { OTP } from "../types/otpType";

const otpSchema = new mongoose.Schema<OTP>({
      
       email : {type: String, required :true, unique : true},
        otp : Number,
        expireAt : Date
});

const otpModel = mongoose.model<OTP>("otp",otpSchema);
export default otpModel;
