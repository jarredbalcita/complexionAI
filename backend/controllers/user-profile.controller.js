import { getProfile, upsertProfile } from "../services/user.service.js";

export const getMyProfile = async (req, res) => {
  try {
    const profile = await getProfile(req.user.id);
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const profile = await upsertProfile(req.user.id, req.body);
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
