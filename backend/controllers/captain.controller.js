import { validationResult } from "express-validator";
import { AsyncHandler, ErrorHandler, sendToken } from "../lib/utils.js";
import { Captain } from "../models/captain.model.js";
import { compare } from "bcrypt";

export const captainRegister = AsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const exisitingUser = await Captain.findOne({
    email,
  });

  if (exisitingUser) {
    return next(new ErrorHandler("User already exists", 404));
  }

  const user = await Captain.create({
    fullname,
    email,
    password,
    vehicle: {
      capacity: vehicle.capacity,
      color: vehicle.color,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
    },
  });

  sendToken(res, user, 201, "User created");
});

export const captainLogin = AsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await Captain.findOne({
    email,
  }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `Welcome back ${user.fullname.firstname}`);
});

export const captainLogout = AsyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .cookie("auth-token", "", { httpOnly: true, secure: true, maxAge: 0 })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

export const getCaptainProfile = AsyncHandler(async (req, res, next) => {
  const user = await Captain.findById(req.user);

  return res.status(200).json({
    success: true,
    user,
  });
});
