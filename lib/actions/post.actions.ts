"use server";
import { connectDB } from "@/mongoose";
import { revalidatePath } from "next/cache";
import Post from "../models/post.models";
import User from "../models/user.models";
interface props {
  isAchievement: string;
  text: string;
  image?: string;
  video?: string;
  repost?: string;
  author: string | undefined;
}
export interface PostData {
  isAchievement: string;
  repost: PostData;
  _id: string;
  parentId: string | null;
  currentId: String | undefined;
  author: {
    _id: string;
    id: string;
    name: string;
    image: string;
    sport: string;
  };
  react: string[];
  text: string;
  image: string;
  video: string;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  children: {
    author: {
      _id: string;
      id: string;
      image: string;
      name: string;
      sport: string;
    };
  }[];
}
export async function createPost({
  text,
  image,
  video,
  author,
  isAchievement,
  repost,
}: props) {
  connectDB();
  try {
    if (author) {
      let createPost = await Post.create({
        text,
        author,
        image,
        video,
        repost,
        isAchievement,
      });
      let post = await User.findByIdAndUpdate(author, {
        $push: { posts: createPost._id },
      });
      console.log("Post created ❤️‍🔥");
      return true;
    }
    // revalidatePath('/');
  } catch (error: any) {
    console.log(`failed to create posts: ${error.message}`);
    return false;
  }
}
export async function createCommentToPost({
  postId,
  commentText,
  userId,
  path,
}: {
  postId: string;
  commentText: string;
  userId: string;
  path: string;
}) {
  connectDB();
  try {
    const post = await Post.findById(postId);
    if (!post) {
      console.log("Post not found");
    }

    let createCommentToPost = new Post({
      text: commentText,
      author: userId,
      parentId: postId,
    });
    let saveCommentToPost = await createCommentToPost.save();
    await post.children.push(saveCommentToPost._id);
    await post.save();
    revalidatePath(path);
  } catch (error: any) {
    console.log(`failed to create posts: ${error.message}`);
  }
}
export async function reactToPost({
  postId,
  userId,
  react,
  path,
}: {
  postId: string;
  userId: string | undefined;
  react: boolean | undefined;
  path: string;
}) {
  await connectDB();
  try {
    const updateQuery = !react
      ? { $push: { react: { user: userId, createdAt: new Date() } } } // Add the user's reaction
      : { $pull: { react: { user: userId } } }; // Remove the user's reaction
    react &&
      console.log(`Add the user's reaction---lpklljlj----klkl-----jljl----`);

    await Post.updateOne({ _id: postId }, updateQuery);
    react &&
      console.log(
        `----------------------------------------------------------Add the user's reaction------------------------------------------------`
      );

    revalidatePath(path);
  } catch (error: any) {
    console.log(`Failed to react to post: ${error.message}`);
  }
}

// export async function reactToPost({
//   postId,
//   react,
//   userId,
//   path,
// }: {
//   postId: string;
//   userId: string | undefined;
//   react: boolean | undefined;
//   path: string;
// }) {
//   connectDB();
//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       console.log("Post not found");
//     }
//     if (userId && post.react) {
//       react ? post.react.pop(userId) : post.react.push(userId);
//       await post.save();
//       revalidatePath(path);
//     }
//   } catch (error: any) {
//     console.log(`failed to create posts: ${error.message}`);
//   }
// }
export async function fetchPostById(id: string) {
  connectDB();
  try {
    const post: PostData | null = await Post.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image sport",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image sport",
          },
          {
            path: "react.user",
            model: User,
            select: "_id id name image sport",
          },
          {
            path: "children",
            model: Post,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image sport",
            },
          },
        ],
      })
      .populate({
        path: "react.user",
        model: User,
        select: "_id id name image sport",
      })
      .lean();
    if (!post) {
      console.log("post not found");
    }

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPosts(
  pageNum = 0,
  pageSize = 20,
  lastPostId?: string
) {
  await connectDB();

  try {
    // حساب عدد المنشورات التي سيتم تخطيها بناءً على رقم الصفحة وحجم الصفحة
    const skipAmount = pageNum * pageSize;

    // بناء الاستعلام لتجنب تكرار البوستات
    const matchConditions: any = { parentId: { $in: [null, undefined] } };
    if (lastPostId) {
      matchConditions._id = { $ne: lastPostId }; // تجنب جلب البوستات بنفس المعرف
    }

    // استعلام تجميع للمنشورات باستخدام Mongoose
    const posts = await Post.aggregate([
      { $match: matchConditions },
      { $sort: { createdAt: -1 } }, // ترتيب المنشورات بناءً على تاريخ الإنشاء
      { $skip: skipAmount },
      { $limit: pageSize },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $lookup: {
          from: "posts",
          localField: "children",
          foreignField: "_id",
          as: "childrenINF",
        },
      },
      { $unwind: { path: "$childrenINF", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "childrenINF.author",
          foreignField: "_id",
          as: "childrenINF.authorINF",
        },
      },
      {
        $unwind: {
          path: "$childrenINF.authorINF",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "repost",
          foreignField: "_id",
          as: "repostINF",
        },
      },
      { $unwind: { path: "$repostINF", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "repostINF.author",
          foreignField: "_id",
          as: "repostINF.authorINF",
        },
      },
      {
        $unwind: {
          path: "$repostINF.authorINF",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "communities",
          localField: "community",
          foreignField: "_id",
          as: "community",
        },
      },
      { $unwind: { path: "$community", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "react.user",
          foreignField: "_id",
          as: "reactUsers",
        },
      },
      { $unwind: { path: "$reactUsers", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$_id",
          text: { $first: "$text" },
          isAchievement: { $first: "$isAchievement" },
          video: { $first: "$video" },
          image: { $first: "$image" },
          author: { $first: "$author" },
          repost: {
            $first: {
              _id: "$repostINF._id",
              text: "$repostINF.text",
              image: "$repostINF.image",
              video: "$repostINF.video",
              author: "$repostINF.authorINF",
              createdAt: "$repostINF.createdAt",
            },
          },
          react: {
            $push: {
              user: "$reactUsers",
              createdAt: "$createdAt",
            },
          },
          createdAt: { $first: "$createdAt" },
          community: { $first: "$community" },
          parentId: { $first: "$parentId" },
          children: {
            $push: {
              author: {
                _id: "$childrenINF.authorINF._id",
                sport: "$childrenINF.authorINF.sport",
                id: "$childrenINF.authorINF.id",
                name: "$childrenINF.authorINF.name",
                username: "$childrenINF.authorINF.username",
                image: "$childrenINF.authorINF.image",
                parentId: "$childrenINF.authorINF.parentId",
              },
            },
          },
        },
      },
    ]);

    // حساب إجمالي عدد المنشورات لتحديد ما إذا كان هناك صفحات إضافية
    const totalPosts = await Post.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    // تحديد ما إذا كانت هناك صفحة تالية بناءً على العدد الإجمالي للمنشورات وعدد المنشورات في الصفحة الحالية
    const isNext = totalPosts > pageNum * pageSize + posts.length;

    return { posts, hasMore: isNext, nextPage: pageNum + 1 };
  } catch (error: any) {
    console.error("Failed to fetch posts:", error.message);
    throw error; // رمي الخطأ لتمريره إلى الأعلى
  }
}

export async function fetchPostsSiteMap() {
  connectDB();
  try {
    return await Post.find();
  } catch (e: any) {
    console.log(`Failed to delete post: ${e.message}`);
  }
}
export async function deletePost(
  postId: string,
  authorId: string,
  parentId: string | null,
  isComment: boolean | undefined,
  path: string
) {
  connectDB();
  try {
    // Find and delete the post by its ID
    console.log(postId);
    const post = await Post.findByIdAndDelete(postId);
    console.log(post);
    if (post) {
      if (isComment) {
        await User.findByIdAndUpdate(authorId, {
          $pull: { comments: parentId },
        });
      } else {
        await User.findByIdAndUpdate(authorId, {
          $pull: { posts: postId },
        });
      }
      console.log("Post deleted successfully 💥");
      revalidatePath(path);
      return true;
    } else {
      console.log("Post not found 😢");
      return false;
    }
  } catch (error: any) {
    console.log(`Failed to delete post: ${error.message}`);
    return false;
  }
}
