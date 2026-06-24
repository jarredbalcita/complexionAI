import { getProfile } from "../services/user.service.js";
import { analyzeProduct } from "../services/vision.service.js";
import { handleError } from "../utils/handleError.js";

export const scanProduct = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const profile = await getProfile(req.user.id);
    if (!profile) return res.status(404).json({ error: "Create a profile first" });

    const result = await analyzeProduct(req.file.buffer, req.file.mimetype, profile);
    res.json(result);
  } catch (err) {
    handleError(res, err);
  }
};
