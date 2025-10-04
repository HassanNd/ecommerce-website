import express from "express";
import userModel from "../models/userModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


interface RegisterParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
interface LoginParams {
  email: string;
  password: string;
}
export const register = async ({
  firstname,
  lastname,
  email,
  password,
}: RegisterParams) => {
  const finduser = await userModel.findOne({ email: email });
  if (finduser) {
    return { message: "user already exists", statusCode: 400 };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  return {
    data: generateJWT({ firstname, lastname, email }),
    statusCode: 200,
    message: "register successfuly done",
  };
};

export const login = async ({ email, password }: LoginParams) => {
  const finduser = await userModel.findOne({
    email: email,
  });
  if (!finduser) {
    return { message: "incorrect email or password", statusCode: 401 };
  }

  const PassordMatch = await bcrypt.compare(password, finduser.password);
  if (PassordMatch) {
    return {
      data: generateJWT({
        email,
        firstname: finduser.firstname,
        lastname: finduser.lastname,
      }),
      statusCode: 201,
      message: "login done successfuly",
    };
  }
  return { message: "incorrect email or password", statusCode: 401 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || '');
};
