import { getProfile, upsertProfile } from "../services/user.service.js";
import { handleError } from "../utils/handleError.js";

export const getMyProfile = async (req, res) => {
  try {
    const profile = await getProfile(req.user.id);
    res.json({ profile });
  } catch (err) {
    handleError(res, err);
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const profile = await upsertProfile(req.user.id, req.body);
    res.json({ profile });
  } catch (err) {
    handleError(res, err);
  }
};
