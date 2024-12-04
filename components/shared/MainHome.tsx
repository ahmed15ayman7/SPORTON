"use client";
import { useState, useEffect } from "react";
import CardPost from "@/components/cards/CardPost";
import PostButtonHome from "@/components/cards/PostHome";
import LocalStore from "@/components/cards/LocalStore";
import { PostData } from "@/lib/actions/post.actions";
import { UserData } from "@/lib/actions/user.actions";
import Loader from "./Loader";
import { GuestEmail } from "@/constants/data";

export default function Home({
  FPosts2,
  userInfo2,
  setAction,
}: {
  FPosts2: any;
  userInfo2: any;
  setAction: any;
}) {
  const userInfo: UserData = JSON.parse(userInfo2);
  const FPosts: PostData[] = JSON.parse(FPosts2);
  let friends = userInfo.friends;

  useEffect(() => {
    userInfo && sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);
  let isGuest = (userInfo as UserData).email === GuestEmail;
  return friends && userInfo && FPosts ? (
    <main >
      <h1 className="hidden">SPORTON Home</h1>
      <PostButtonHome />
      <section className="p-16 pt-0 flex flex-col gap-8 max-sm:p-0">
        <LocalStore {...userInfo} />
        {FPosts?.map((post, i) => (
          <CardPost
            isGuest={isGuest}
            repost={post.repost}
            setAction={setAction}
            Team={friends}
            key={i}
            isAchievement={post?.isAchievement}
            id={post?._id}
            video={post?.video}
            image={post?.image}
            parentId={post?.parentId}
            react={post.react}
            currentId={userInfo?.id}
            userId={userInfo?._id}
            author={post?.author}
            content={post?.text}
            createdAt={post?.createdAt}
            community={post?.community}
            comments={post?.children}
          />
        ))}
      </section>
    </main>
  ) : (
    <Loader is />
  );
}
