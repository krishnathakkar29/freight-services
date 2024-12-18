import { validationResult } from "express-validator";
import { AsyncHandler, ErrorHandler, sendToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import { compare } from "bcrypt";

export const register = AsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array()[0].msg, 404));
  }

  const { fullname, email, password } = req.body;

  const exisitingUser = await User.findOne({
    email,
  });

  if (exisitingUser) {
    return next(new ErrorHandler("User already exists", 404));
  }

  const user = await User.create({
    fullname,
    email,
    password,
  });

  sendToken(res, user, 201, "User created");
});

export const login = AsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `Welcome back ${user.fullname.firstname}`);
});

export const logout = AsyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .cookie("auth-token", "", { httpOnly: true, secure: true, maxAge: 0 })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

export const getMyProfile = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);

  return res.status(200).json({
    success: true,
    user,
  });
});

export const getUserProfile = async (req, res, next) => {
  return res.status(200).json(req.user);
};
