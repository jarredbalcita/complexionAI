import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/user-profile.controller.js";

const router = express.Router();

router.use(protect);
router.get("/", getMyProfile);
router.post("/", updateMyProfile);
router.put("/", updateMyProfile);

export default router;
