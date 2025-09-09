import express from "express";
import { upload } from "../middleware/multer_upload.js";
import { checkUpload } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), checkUpload);

export default uploadRouter;
