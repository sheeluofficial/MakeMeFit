import express from "express";
import { userLoginController, userSignupController } from "../controllers/userController/userAuthController";
import { loginValidationCheck, userRegistrationValidationCheck } from "../middlewares/validation";

const router = express.Router();

router.post("/signup", userRegistrationValidationCheck, userSignupController);
router.post("/login", loginValidationCheck, userLoginController);
export default router;