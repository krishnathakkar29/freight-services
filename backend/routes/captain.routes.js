import express from "express";
import {
  authCaptain,
  isCaptainAuthenticated,
} from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import {
  captainLogin,
  captainLogout,
  captainRegister,
  getCaptain,
  getCaptainProfile,
} from "../controllers/captain.controller.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 1 })
      .withMessage("First name must be at least 1 characters long"),
    body("fullname.lastname")
      .isLength({ min: 1 })
      .withMessage("Last name must be at least 1 characters long"),
    body("password")
      .isLength({ min: 2 })
      .withMessage("Password must be at least 2 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  captainRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 2 })
      .withMessage("Password must be at least 2 characters long"),
  ],
  captainLogin
);

// router.get("/profile", isCaptainAuthenticated, getCaptainProfile);
router.get("/profile", authCaptain, getCaptain);

router.get("/logout", isCaptainAuthenticated, captainLogout);

export default router;
