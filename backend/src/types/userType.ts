import { Document, Schema } from "mongoose"

export interface User extends Document {
 firstName : string;
 lastName : string;
 email : string;
 password : string;
 isBlocked : boolean;
 profileImage : string;
 enrolledPrograms : Schema.Types.ObjectId[];
}