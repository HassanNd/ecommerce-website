import express from "express";
import { login, register } from "../services/userService.ts";

const app = express();
app.use(express.json());

const user_router = express.Router();

user_router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const { statusCode, data, message } = await register({
      firstname,
      lastname,
      email,
      password,
    });
    if (data) {
      res.status(statusCode).json(`${data} ,  ${message}`);
    } else {
      res.status(statusCode).send(message);
    }
  } catch (error) {
    res.status(402).send("error in the server ....");
  }
});
user_router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode, message } = await login({ email, password });
    if (data) {
      res
        .status(statusCode)
        .json(`This is the message:${message}, and the userInfo:${data}`);
    } else {
      res.status(statusCode).send(message);
    }
  } catch (error) {
    res.status(300).send("error in the server connection ");
  }
});

export default user_router;
