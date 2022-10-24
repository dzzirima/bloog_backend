import express from "express"
import { createPOst } from "../controllers/postController.js"
import multer from "../middleware/multer.js"
const router = express.Router()

router.post("/create", multer.single('thumbnail'),  createPOst)


export default router