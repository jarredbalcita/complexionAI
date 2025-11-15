import { getProfile } from "../services/user.service.js";
import { analyzeProduct } from "../services/vision.service.js";

export const scanProduct = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const profile = await getProfile(req.user.id);
    if (!profile)
      return res.status(404).json({ error: "Create profile first" });

    const imageBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
    const result = await analyzeProduct(imageBase64, profile);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
