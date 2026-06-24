import express from "express";
import cors from "cors";
import multer from "multer";
import rateLimit from "express-rate-limit";
import "dotenv/config";

import userProfileRoutes from "./routes/user-profile.routes.js";
import productScanRoutes from "./routes/product-scan.routes.js";
import routineRoutes from "./routes/routine.routes.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

const scanLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many scan requests, please try again later." },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

app.use("/api/profile", userProfileRoutes);
app.use("/api/scan", scanLimiter, upload.single("image"), productScanRoutes);
app.use("/api/routine", routineRoutes);

app.get("/", (_req, res) => res.send("ComplexionAI Backend Live"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
