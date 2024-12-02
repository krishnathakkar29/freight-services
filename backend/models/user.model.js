import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
export const User = mongoose.model("User", userSchema);
