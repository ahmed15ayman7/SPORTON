"use server";
import User from "../models/user.models";
import Message from "../models/messages.models";
import { pusherServer } from "../pusher";
import Room from "../models/room.model";
import { connectDB } from "@/mongoose";
interface Message {
  content: string;
  sender: {
    _id: string | undefined;
    id: string | undefined;
    name: string | undefined;
    image: string | undefined;
    sport: string | undefined;
  };
  timestamp: Date;
  recipient: string;
}

export const createMessage = async (
  senderId: string,
  recipientId: string,
  content: string | null, // المحتوى النصي
  mediaUrl: string | null, // رابط الوسائط
  messageType: "text" | "image" | "video" | "audio" | "file", // نوع الرسالة
  RoomName: string | undefined,
  replyToMessageId?: string // دعم الرد على الرسائل
): Promise<void> => {
  let sender = await User.findById(senderId).select("name _id image sport"); // الحصول على بيانات المرسل من قاعدة البيانات
  let recipient = await User.findById(recipientId).select("name _id image"); // الحصول على بيانات المستلم

  if (!sender || !recipient) {
    throw new Error("Sender or recipient not found");
  }
  let timestamp = new Date();
  // إنشاء الرسالة بناءً على النوع
  const messageData = {
    content: messageType === "text" ? content : null,
    mediaUrl: messageType !== "text" ? mediaUrl : null,
    type: messageType,
    sender: sender._id,
    recipient: recipient._id,
    timestamp,
    replyTo: replyToMessageId ? replyToMessageId : null, // ربط الرد بالرسالة الأصلية
    isDelivered: false,
    isRead: false,
    reactions: [],
  };

  const message = new Message(messageData);

  // إرسال الرسالة عبر Pusher أو أي خدمة إشعارات أخرى
  if (RoomName) {
    await pusherServer.trigger("chat", RoomName, {
      ...messageData,
      sender: { _id: sender._id, name: sender.name, image: sender.image },
      recipient: {
        _id: recipient._id,
        name: recipient.name,
        image: recipient.image,
      },
    });
  }
  console.log(messageData);
  // حفظ الرسالة في قاعدة البيانات
  try {
    const savedMessage = await message.save();

    // تحديث الغرفة مع الرسالة الجديدة
    if (RoomName) {
      await Room.findOneAndUpdate(
        { name: RoomName },
        { $push: { messages: savedMessage._id }, updatedAt: timestamp }
      );
    }
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

// export const createMessage = async (
//   senderId: string,
//   recipientId: string,
//   content: string,
//   RoomName: string|undefined,
// ): Promise<void> => {
//   let sender=JSON.parse(senderId);
//   console.log("---------------------------------------------------------------------------------------------------")
//   const message: Message = {
//     content: content,
//     sender:{
//       _id:sender._id,
//       id:sender.id,
//       name:sender.name,
//       image:sender.image,
//       sport:sender.sport,
//     } ,
//     timestamp: new Date(),
//     recipient: recipientId,
//   };
//   console.log("---------------------------------------------------------------------------------------------------")
//   RoomName&& pusherServer.trigger("chat",RoomName,message)
//   console.log("---------------------------------------------------------------------------------------------------")
//   connectDB();
//   try {
//     const newMessage0 = new Message({
//       content:content,
//       sender: sender._id,
//       recipient: recipientId,
//     });
//     let newMessage = await newMessage0.save();
//     console.log("---------------------------------------------------------------------------------------------------")
//     RoomName&&await Room.findOneAndUpdate( { name: RoomName },{
//       $push: { messages: newMessage._id },
//     });
//   } catch (error) {
//     console.error('Error creating message and adding to user:', error);
//     throw error;
//   }
// };
