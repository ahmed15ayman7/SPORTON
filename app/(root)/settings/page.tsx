"use client";
import { UserData, fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
  const router = useRouter();
  // const [userInfo, setUserInfo] = useState<string>();
  const [id, setId] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      try {
        const userInfo = await fetchUser();
        if (!(userInfo as UserData)?.onboarding) router.replace("/onboarding");
        userInfo && setId((userInfo as UserData)?._id);
        // && setUserInfo(JSON.stringify(userInfo))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="">
      <h1 className="mb-20 text-body-bold head-text text-[25px] text-white">
        Settings
      </h1>
      <ul className="flex flex-col gap-9">
        <li>
          <Link
            href={id ? "/profile/edit/" + id : ""}
            className="text-primary-500 flex gap-4 hover:opacity-75 text-body-bold"
          >
            <Image
              src="/assets/edit.svg"
              alt="edit"
              className=""
              width={24}
              height={24}
            />
            Edit Profile
          </Link>
        </li>
        <li>
          <Link
            href="/boosting"
            className="text-primary-500 flex hover:opacity-75 gap-4 text-body-bold"
          >
            <Image
              src="/assets/boosting.svg"
              alt="boosting"
              className=""
              width={24}
              height={24}
            />
            Boosting Profile
          </Link>
        </li>
        <li>
          <Link
            href="/new-post"
            className="text-primary-500 flex hover:opacity-75 gap-4 text-body-bold"
          >
            <Image
              src="/assets/createimg.svg"
              alt="create post"
              className=""
              width={24}
              height={24}
            />
            New Post
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
