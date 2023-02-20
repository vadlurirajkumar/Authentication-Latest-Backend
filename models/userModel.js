import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Enter your name"],
    },
    email: {
      type: String,
      unique: [true, "This e-mail has already exists"],
      required: [true, "Enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
      minlength:[8, "Password length must be 8 characters"],
      select:false,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export { User };
