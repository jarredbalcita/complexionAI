import express from "express";
import { protect } from "../middleware/auth.js";
import { chatRoutine } from "../controllers/routine.controller.js";

const router = express.Router();
router.use(protect);
router.post("/", chatRoutine);

export default router;
