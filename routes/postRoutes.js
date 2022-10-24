import express from "express";
import { createPOst } from "../controllers/postController.js";
import { parseData } from "../middleware/index.js";
import multer from "../middleware/multer.js";

import { postValidator, validate } from "../middleware/postValidator.js";
const router = express.Router();

router.post(
  "/create",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  createPOst
);

export default router;
