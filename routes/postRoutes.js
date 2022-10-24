import express from "express";
import { createPOst } from "../controllers/postController.js";
import multer from "../middleware/multer.js";
import { postValidator, validate } from "../middleware/postValidator.js";
const router = express.Router();

router.post(
  "/create",
  multer.single("thumbnail"),
  (req,res,next) =>{
    const {tags} = req.body
    if(tags) req.body.tags = JSON.parse(tags)
    next()
   },
  postValidator,
  validate,
  createPOst
);

export default router;
