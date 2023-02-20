import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(403).json({ message: "User not found!, Login first..." });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "500-Failed, Server Error" });
  }
};

export default isAuthenticated;
