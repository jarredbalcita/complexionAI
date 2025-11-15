import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";

import userProfileRoutes from "./routes/user-profile.routes.js";
import productScanRoutes from "./routes/product-scan.routes.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/profile", userProfileRoutes);
app.use("/api/scan", upload.single("image"), productScanRoutes);

app.get("/", (req, res) => res.send("Skincare AI Backend Live"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
