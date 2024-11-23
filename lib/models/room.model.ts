import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    name: { type: String },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true, // يضيف createdAt و updatedAt تلقائيًا
  }
);

const Room = mongoose.models?.Room || mongoose.model("Room", chatRoomSchema);

export default Room;
