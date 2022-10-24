import express from "express";
import { createPOst, deletePost, getFeaturedPosts, getPost, updatePOst } from "../controllers/postController.js";
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

router.get("/single/:postId" , getPost)
router.get("/featured-posts" , getFeaturedPosts)


export default router;
