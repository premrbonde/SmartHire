// controllers/chatController.js
import Chat from "../models/chatSchema.js";

export const saveChat = async (req, res) => {
  try {
    const { userId, role, messages } = req.body;
    const chat = await Chat.create({ userId, role, messages });
    res.status(200).json({ success: true, chat });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
