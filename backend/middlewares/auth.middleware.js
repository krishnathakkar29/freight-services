import { AsyncHandler, ErrorHandler } from "../lib/utils.js";
import jwt from "jsonwebtoken";
import { Captain } from "../models/captain.model.js";
import { User } from "../models/user.model.js";

export const isAuthenticated = AsyncHandler(async (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
});

export const isCaptainAuthenticated = AsyncHandler(async (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
});

export const authCaptain = async (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token) {
    console.log("token nahi hai");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);
    req.captain = captain;

    return next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authUser = async (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
