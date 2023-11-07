import mongoose, { Schema } from "mongoose";
import { User } from "../types/userType";

const userSchema = new mongoose.Schema<User>({
       firstName : {type: String, required :true},
       lastName : {type: String, required :true},
       email : {type: String, required :true, unique : true},
       password : {type: String},
       isBlocked : {type: Boolean, required : true},
       profileImage : {type : String},
       enrolledPrograms : [{type :  Schema.Types.ObjectId , ref : 'courses'}],
       otp: String,
       otpExpire: Date,
});

const userModel = mongoose.model<User>("user",userSchema);
export default userModel;
