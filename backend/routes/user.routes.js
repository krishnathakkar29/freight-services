import express from "express";
import { body } from "express-validator";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 2 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 2 })
      .withMessage("Password must be at least 2 characters long"),
  ],
  login
);

router.get("/logout", isAuthenticated, logout);
router.get("/getmyprofile", isAuthenticated, getMyProfile);

export default router;
