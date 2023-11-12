import express from "express";
import { sendEmailcontroller, userLoginController, userSignupController, verifyOtpController } from "../controllers/userController/userAuthController";
import { loginValidationCheck, userRegistrationValidationCheck } from "../middlewares/validation";

const router = express.Router();

router.post("/send-otp", sendEmailcontroller);
router.post("/verify-otp", verifyOtpController);
router.post("/signup", userRegistrationValidationCheck, userSignupController);
router.post("/login", loginValidationCheck, userLoginController);
export default router;