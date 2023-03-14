import express from "express";
import { body, validationResult } from "express-validator";

import { authUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/\d/),
  authUser
);
router.post(
  "/signup",
  body("email").isEmail(),
  body("name")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 characters"),
  registerUser
);

export default router;
