"use server";
import { connectDB } from "@/mongoose";
// import { currentUser } from "@clerk/nextjs/server";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Post from "../models/post.models";
import User from "../models/user.models";
import { PostData } from "./post.actions";
import Room from "../models/room.model";
import { redirect } from "next/navigation";
import Message from "../models/messages.models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ensure the path to your NextAuth options is correct
interface props {
  email: string;
  userId: string | undefined;
  username: string;
  name: string;
  bio: string;
  sport: String;
  image: string;
  type: string;
  phone: string;
  path: string;
}
interface UserAuth {
  name: string;
  email: string;
  image: string;
}

export interface UserData {
  email: string;
  redirect: string;
  _id: string;
  id: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  sport: string;
  phone: string;
  posts: PostData[];
  communities: string[];
  onboarding: boolean;
  type: string;
  friends: {
    _id: string;
    id: string;
    name: string;
    username: string;
    image: string;
  }[];
}
export interface Result {
  _id: string;
  name: string;
  image: string;
  id: string;
  sport: string;
  type: string;
  phone: string;
  posts: PostData[];
}

export const currentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return session.user as UserAuth;
};

export async function updateUser({
  email,
  userId,
  username,
  sport,
  name,
  bio,
  image,
  path,
  type,
  phone,
}: props): Promise<void> {
  connectDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        email: email,
        username: username,
        bio: bio,
        sport: sport,
        name: name,
        image: image,
        onboarding: true,
        phone: phone,
        type: type,
      },
      { upsert: true }
    ).lean();
    console.log("Successfully updated user");
    if (path.includes("/profile/edit")) {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(`failed to update user: ${error.message}`);
  }
}

export async function currentUserFun() {
  return await currentUser();
}
export async function fetchUser(userId?: string | undefined) {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) return { redirect: "/sign-in" };
    let email = user.email;
    let userInfo: UserData | null = userId
      ? await User.findById(userId)
          .populate({
            path: "friends",
            model: User,
            select: "_id id image name username sport",
          })
          .lean()
      : await User.findOne({ email: email })
          .populate({
            path: "friends",
            model: User,
            select: "_id id image name username sport",
          })
          .lean();
    console.log(userInfo);
    if (!userInfo || !userInfo?.onboarding) {
      console.log("user not found");
      console.log("found user with id ");
      return { redirect: "/onboarding" };
    }
    return userInfo;
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export async function fetchAllUser({
  searchString = "",
  pageNum = 1,
  pageSize = 5,
  sortBy = "desc",
  isChat,
  friends,
}: {
  searchString: string;
  pageNum: number;
  pageSize: number;
  sortBy?: SortOrder;
  isChat?: boolean;
  friends?: any[];
}) {
  try {
    await connectDB(); // تأكد من أنك تقوم بالاتصال بقاعدة البيانات
    const user = await currentUser();
    const skipAmount = (pageNum - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof User> = { email: { $ne: user?.email } };

    if (searchString.trim() !== "") {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
        { sport: { $regex: regex } },
      ];
    }

    const users = isChat
      ? await User.find({ ...query, _id: { $in: friends } })
          .populate({
            path: "rooms",
            populate: {
              path: "messages",
              options: { sort: { timestamp: -1 }, limit: 1 },
            },
          })
          .sort({
            "rooms.messages.createdAt": sortBy,
          })
          .limit(pageSize)
          .lean()
          .exec()
      : await User.find(query)
          .sort({ createdAt: sortBy })
          .skip(skipAmount)
          .limit(pageSize)
          .lean()
          .exec();

    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext, pageNum };
  } catch (error: any) {
    console.error(`Failed to fetch users: ${error.message}`);
    return { users: [], isNext: false, pageNum };
  }
}

export async function fetchUsers() {
  try {
    connectDB();
    let users = await User.find();
    return users;
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export async function fetchUserPosts(userId: string) {
  connectDB();
  try {
    let posts: Result | null = await User.findById(userId)
      .populate({
        path: "posts",
        model: Post,
        populate: [
          {
            path: "children",
            model: Post,
            populate: {
              path: "author",
              model: User,
              select: "_id id name image",
            },
          },
        ],
      })
      .lean();

    return posts;
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
interface ActivityData {
  createdAt: Date;
  text: string;
  author: {
    _id: string;
    name: string;
    image: string;
    sport: string;
  };
  parentId: string;
  type: string;
}

interface ReactData {
  createdAt: Date;
  user: {
    _id: string;
    name: string;
    image: string;
    sport: string;
  };
  _id: string;
  type: string;
  parentId: string;
}
export async function getActivity(userId: string) {
  connectDB();
  try {
    let userPosts = await Post.find({ author: userId })
      .populate({
        path: "react.user",
        model: User,
        select: "_id name image sport",
      })
      .lean();
    let childPostIds = userPosts.reduce(
      (acc: any, post: any) => acc.concat(post.children),
      []
    );
    let reacts: ReactData[] = userPosts.reduce(
      (acc: any, post: any) =>
        acc.concat(
          post.react.map((e: { user: any; _id: string; createdAt: any }) => {
            return { ...e, type: "react", parentId: post._id };
          })
        ),
      []
    );
    let replies: ActivityData[] = await Post.find({
      _id: { $in: childPostIds },
      author: { $ne: userId },
    })
      .populate({
        path: "author",
        model: User,
        select: "_id name image sport",
      })
      .lean();
    return { activity: replies, reacts };
  } catch (e: any) {
    console.log(`not found user: ${e.message}`);
  }
}
interface AddFriendParams {
  userId?: string;
  friendId: string;
  path: string;
  isFriend: boolean;
  isChat?: boolean;
}
interface ChatROOM {
  _id: string;
  name: string;
  users: any[];
  messages: any[];
}
export async function addFriend({
  friendId,
  userId,
  path,
  isFriend,
  isChat,
}: AddFriendParams) {
  connectDB();
  try {
    if (!userId || !friendId) {
      console.log("userId أو friendId غير موجود");
      return;
    }
    const updateOperation = isFriend
      ? { $pull: { friends: friendId } }
      : { $push: { friends: friendId } };
    const updateFriendQ = isFriend
      ? { $pull: { friends: userId } }
      : { $push: { friends: userId } };

    const ChatRoom: ChatROOM | null = await Room.findOneAndUpdate(
      { name: { $in: [`${userId}-${friendId}`, `${friendId}-${userId}`] } },
      {
        $setOnInsert: {
          name: `${userId}-${friendId}`,
          users: [userId, friendId],
        },
      },
      { upsert: true, new: true }
    )
      .populate({
        path: "users",
        model: User,
        select: "_id id name image sport",
      })
      .populate({
        path: "messages",
        model: Message,
        populate: [
          { path: "sender", model: User, select: "_id id name image sport" },
          { path: "recipient", model: User, select: "_id id name image sport" },
        ],
      })
      .lean();
    let user = await User.findById(userId);
    let isChatAdded = user
      ? user?.rooms
        ? user.rooms.includes(ChatRoom?._id)
        : false
      : false;
    if (ChatRoom) {
      let quary = !isChatAdded
        ? {
            $push: { rooms: ChatRoom._id },
            ...updateOperation,
          }
        : updateOperation;
      let quary2 = !isChatAdded
        ? {
            $push: { rooms: ChatRoom._id },
            ...updateFriendQ,
          }
        : updateFriendQ;
      await User.findByIdAndUpdate(userId, quary).lean();
      await User.findByIdAndUpdate(friendId, quary2).lean();
      if (isChat) {
        return ChatRoom;
      }
    }

    console.log("نجاح في إضافة/إزالة الصديق");
    revalidatePath(path); // Assuming you have a function to revalidate the path
  } catch (error: any) {
    console.log(`فشل في إضافة/إزالة الصديق: ${error.message}`);
  }
}

// export async function addFriend({
//   friendId,
//   userId,
//   path,
//   isFriend,
// }: AddFriendParams) {
//   connectDB();
//   try {
//     if (!userId || !friendId) {
//       console.log("userId أو friendId غير موجود");
//       return;
//     }

//     const updateOperation = isFriend
//       ? { $pull: { friends: friendId } }
//       : { $push: { friends: friendId } };

//     await User.findByIdAndUpdate(userId, updateOperation);
//     await User.findByIdAndUpdate(
//       friendId,
//       isFriend ? { $pull: { friends: userId } } : { $push: { friends: userId } }
//     );

//     console.log("نجاح في إضافة/إزالة الصديق");
//     revalidatePath(path);
//   } catch (error: any) {
//     console.log(`فشل في إضافة/إزالة الصديق: ${error.message}`);
//   }
// }
