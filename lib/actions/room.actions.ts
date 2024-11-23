"use server";
import { connectDB } from "@/mongoose";
import Room from "../models/room.model";
import { revalidatePath } from "next/cache";
import { addFriend } from "./user.actions";
import User from '../models/user.models';
import Message from "../models/messages.models";
import { FilterQuery, SortOrder } from "mongoose";
interface AddFriendParams {
  userId?: string;
  friendId: string;
  path: string;
}
interface ChatROOM {
  _id: string;
  name: string,
  users: any[],
  messages: any[]
}
export async function GetChat({
  friendId,
  userId,
  path,
}: AddFriendParams) {
  connectDB();
  try {
    if (!userId || !friendId) {
      console.log("userId أو friendId غير موجود");
      return;
    }
    const ChatRoom: ChatROOM | null = await Room.findOne(
      { name: `${userId}-${friendId}` },
    ).populate({ path: 'users', model: User, select: '_id id name image sport' }).populate({ path: "messages", model: Message, populate: [{ path: "sender", model: User, select: "_id id name image sport" }, { path: "recipient", model: User, select: "_id id name image sport" }] }).lean();
    if (ChatRoom) {
      revalidatePath(path);
      return { chat: ChatRoom, ids: `${userId}-${friendId}` }
    } else {
      const ChatRoom2: ChatROOM | null = await Room.findOne(
        { name: `${friendId}-${userId}` },
      ).populate({ path: 'users', model: User, select: '_id id name image sport' }).populate({ path: "messages", model: Message, populate: [{ path: "sender", model: User, select: "_id id name image sport" }, { path: "recipient", model: User, select: "_id id name image sport" }] }).lean();
      if (ChatRoom2) {
        revalidatePath(path);
        return { chat: ChatRoom2, ids: `${friendId}-${userId}` }
      } else {
        let createChat: ChatROOM | undefined = await addFriend({ friendId: friendId, userId: userId, path: path, isFriend: true, isChat: true });
        revalidatePath(path);
        return { chat: createChat, ids: `${userId}-${friendId}` }
      }
    }
  } catch (error: any) {
    console.log(`فشل في إضافة/إزالة الصديق: ${error.message}`);
  }
}
export async function fetchAllRooms({
  searchString = "",
  pageNum = 1,
  pageSize = 5,
  sortBy = "desc",
  userId,
}: {
  searchString: string;
  pageNum: number;
  pageSize: number;
  sortBy?: SortOrder;
  userId?: string;
}) {
  try {
    await connectDB(); // تأكد من الاتصال بقاعدة البيانات
    const skipAmount = (pageNum - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    // إعداد البحث بناءً على المستخدم والكلمة المدخلة
    const query: FilterQuery<typeof Room> = { users: { $in: [userId] } };

    if (searchString.trim() !== "") {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
        { sport: { $regex: regex } },
      ];
    }

    // جلب المحادثات بترتيب آخر رسالة
    const Rooms = await Room.find(query)
      .populate("users")
      .sort({ updatedAt: sortBy })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .exec();
    const totalRooms = await Room.countDocuments(query);
    const isNext = totalRooms > skipAmount + Rooms.length;
    return { Rooms, isNext, pageNum };
  } catch (error: any) {
    console.error(`Failed to fetch rooms: ${error.message}`);
    return { Rooms: [], isNext: false, pageNum };
  }
}
