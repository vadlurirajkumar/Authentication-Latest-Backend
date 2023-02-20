import dotenv from "dotenv";
dotenv.config();
import DBconnection from "./config/DB.js";
DBconnection();

import express from "express";
const app = express();

import colors from 'colors';
import cors from 'cors'
import router from "./routes/user.routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/get", (req, res) => {
  try {
    res.send("ok");
  } catch (err) {
    res.send(err.message);
  }
});

//? For checking Date formatting of which country
// console.log(process.env.Lang);

app.use('/api/v1', router)
let port = process.env.PORT || 5002;

const startServer = () => {
  try {
    app.listen(port, () => {
      console.log(`server is running on ${port}`.cyan.underline);
    });
  } catch (error) {
    console.error(`Error is : ${error.message}`.yellow);
  }
};
startServer();
