import User from "../model/userModel.js";
import asyncHanlder from "express-async-handler";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route Post/api/users/login
// @access Public
const authUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({
      name: "shahiq",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email and password");
  }
});

// @desc Register User & access token
// @route Post /api/users/login
// access Public
const registerUser = asyncHanlder(async (req, res) => {
  const { name, email, password } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    console.log(errors[0]);
    const pickError = errors[0];
    throw new Error(`${pickError.param} ${pickError.msg}`);
  } else {
    const exitUser = await User.findOne({ email });
    if (exitUser) {
      res.status(400);
      throw new Error("user is Already Exists");
    }
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

export { authUser, registerUser };
