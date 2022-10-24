import express from "express";
import { createPOst, deletePost, updatePOst } from "../controllers/postController.js";
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
router.put(
  "/:postId",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  updatePOst
);

router.delete("/:postId",deletePost)


export default router;
