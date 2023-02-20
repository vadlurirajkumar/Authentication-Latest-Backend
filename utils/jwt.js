import jwt from "jsonwebtoken";

const generateToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000,
  });
};
export default generateToken;

// function toLower(v) {
//   return v.toLowerCase();
// }