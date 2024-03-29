import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const Filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, file.originalname);
    // colback(null, file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, res, callback) => {
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return callback(HttpError(400, ".exe not valid extension format"));
  }
  callback(null, true);
};
const upload = multer({
  storage,
  limits,
  fileFilter,
});
export default upload;
