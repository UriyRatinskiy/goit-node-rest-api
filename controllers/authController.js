import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import gravatar from "gravatar";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";

const { JWT_SECRET } = process.env;

console.log(JWT_SECRET);

const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const newUser = await authServices.register({ ...req.body, avatarURL });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await authServices.validatePassword(
    password,
    user.password
  );
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id: id } = user;
  const payload = {
    id,
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await authServices.updateUser({ _id: id }, { token });

  res.json({ token, user: { email, subscription: user.subscription } });
};

const logoutUser = async (req, res) => {
  const { _id: id } = req.user;
  await authServices.updateUser({ _id: id }, { token: "" });

  res.status(204).json({ message: "No Content" });
};

const getCurrentUser = async (req, res) => {
  const { username, email } = req.user;
  res
    .status(200)
    .json({ username, email, subscription: req.user.subscription });
};

const updateStatus = async (req, res) => {
  const { subscription } = req.user;
  const { _id: id } = req.user;
  await authServices.updateUser({ _id: id }, { subscription });
  res.status(200).json({ subscription });
};

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  if (!req.file) {
    return res.status(400).json({ massage: "File not found, please add file" });
  }
  const { path: tempUpload, originalname } = req.file;
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).write(tempUpload);
  const filename = `${id}_${originalname}`;
  const upload = path.join(avatarPath, filename);
  await fs.rename(tempUpload, upload);
  const avatarURL = path.join("avatars", filename);
  await authServices.updateUser({ _id: id }, { avatarURL });
  res.json({ avatarURL });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateStatus: ctrlWrapper(updateStatus),
  updateAvatar: ctrlWrapper(updateAvatar),
};
