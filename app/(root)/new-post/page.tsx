"use client"
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserData, fetchUser } from "@/lib/actions/user.actions";
import { redirect, useRouter } from "next/navigation";
import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { GuestEmail } from "@/constants/data";

const Page = () => {
  const { data: userInfo, error, isLoading } =  useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  const router = useRouter();
  if (isLoading) return <Loader is />;
  if (error ) {
    return null
  }
  interface redirectType {
    redirect: string;
  }

  if ((userInfo as redirectType ).redirect) {
    router.replace((userInfo as redirectType ).redirect);
    return null; // تأكد من عدم إرجاع أي محتوى أثناء التوجيه
  }
  let isGuest=(userInfo as UserData).email === GuestEmail
  return (
    <div>
      <h1 className="hidden">Add Post</h1>
      <PostForm
      isGuest={isGuest}
        action="Create"
        _id={(userInfo as UserData)._id}
        friends={(userInfo as UserData).friends}
        id={(userInfo as UserData).id}
        image={(userInfo as UserData)?.image}
        name={(userInfo as UserData)?.name}
        username={(userInfo as UserData)?.username}
      />
    </div>
  );
};

export default Page;
