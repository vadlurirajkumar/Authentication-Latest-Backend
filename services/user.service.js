import { User } from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";

//? Signup User
export const signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all Fields",
      });
    }

    //! Cheaking if user already exists with this email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: `${email} has already exists, try again with new Email`,
      });
    }

    let hashed;
    //@ Cheaking password length
    if (password.length < 8) {
      return res.status(401).json({
        success: false,
        message: "Password length must be 8 characters",
      });
    } else {
      //@ Hashing the password
      hashed = await hashPassword(password);
    }

    //@ Creating user
    user = await User.create({
      full_name,
      email,
      password: hashed,
    });

    // user = await User.findOne({email}).select("-password")
    res.status(201).json({ success: true, message: "Signup successfully",user });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "500-Failed, Server Error" });
  }
};

//? Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all Fields",
      });
    }

    //! Checking Email is Valid or not
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //! Checking Password is Valid or not
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //@ Generating Token
    const token = generateToken(user._id);

    user = await User.findOne({ email });

    res
      .status(200)
      .json({ success: true, message: "Login successfully", user, token });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "500-Failed, Server Error" });
  }
};

//? CRUD
export const userData = async (req, res) => {
  try {
    const data = await User.findById({ _id: req.user._id });

    res.send(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "500-Failed, Server Error" });
  }
};
