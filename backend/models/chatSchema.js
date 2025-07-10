// models/chatSchema.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: String,
  messages: [
    {
      type: { type: String, enum: ["user", "bot"] },
      text: String,
      time: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Chat", chatSchema);
