import config from "../config/config";
import jwt from "jsonwebtoken"; 
import { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = config.jwtSecret;

export const generateJwtToken = (payload: JwtPayload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "5d" });
  };