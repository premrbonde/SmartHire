// routes/chatRoutes.js
import express from "express";
import { saveChat } from "../controllers/chatController.js";
const router = express.Router();

router.post("/save", saveChat);

export default router;
