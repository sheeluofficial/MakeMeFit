import express from "express";
import { userSignupController } from "../controllers/userController/userAuthController";
import { userRegistrationValidationCheck } from "../middlewares/validation";

const router = express.Router();

router.post("/signup", userRegistrationValidationCheck, userSignupController);

export default router;