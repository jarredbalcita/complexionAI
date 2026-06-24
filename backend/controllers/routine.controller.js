import { getProfile } from "../services/user.service.js";
import { generateRoutineReply } from "../services/routine.service.js";
import { handleError } from "../utils/handleError.js";

export const chatRoutine = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const profile = await getProfile(req.user.id);
    const result = await generateRoutineReply(message.trim(), profile);
    res.json(result);
  } catch (err) {
    handleError(res, err);
  }
};
