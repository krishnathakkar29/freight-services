import jwt from "jsonwebtoken";

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const AsyncHandler = (passedFn) => async (req, res, next) => {
  try {
    await passedFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const sendToken = async (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("auth-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};
