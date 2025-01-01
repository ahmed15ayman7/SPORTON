import { SignOutbutton } from "../../../components/cards/SignOutbutton";
import AccountProfile from "../../../components/forms/AccountProfile";
import {
  UserData,
  currentUser,
  fetchUser,
} from "../../../lib/actions/user.actions";
// import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { connectDB } from "@/mongoose";
import React from "react";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "SPORTEN | onboarding",
// };
interface usData {
  id: string | undefined;
  email: string;
  objectID: string | undefined;
  username: string | null | undefined;
  name: string;
  bio: string;
  sport: string;
  image: string | undefined;
  type: string | undefined;
  phone: string | undefined;
}
const Onboarding = async () => {
  await connectDB();
  let user = await currentUser();
  const userInfo = await fetchUser();
  if (!user) redirect("/sign-in");
  if ((userInfo as UserData)?.onboarding) redirect("/");
  console.log(user);
  let userData: usData = {
    id: user?.email,
    email: (userInfo as UserData)?.email || user?.email,
    objectID: (userInfo as UserData)?._id,
    username: user?.name || (userInfo as UserData)?.username,
    name: user?.name || (userInfo as UserData)?.name || "",
    bio: (userInfo as UserData)?.bio || "",
    sport: (userInfo as UserData)?.sport || "",
    image: user?.image || (userInfo as UserData)?.image,
    type: (userInfo as UserData)?.type,
    phone: (userInfo as UserData)?.phone,
  };
  return (
    <main className=" px-1 max-sm:w-full w-2/3 mx-auto py-12 flex flex-col max-w-xl">
      <div className="px-10 fixed rounded-full lg:left-2  -left-4 top-10">
        <SignOutbutton />
      </div>

      <div className=" bg-dark-2  lg:p-10 p-2   w-full">
        <AccountProfile userData={userData} />
      </div>
    </main>
  );
};

export default Onboarding;
