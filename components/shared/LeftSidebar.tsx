"use client";
import { SidebarLinks } from "@/constants/icons";
import { UserData } from "@/lib/actions/user.actions";
import { clearUser } from "@/lib/redux/userSlice";
import { signOut } from "next-auth/react";
// import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const LeftSidebar = ({
  userInfo,
}: {
  userInfo: UserData | { redirect: string };
}) => {
  let dispatch = useDispatch();
  let pathname = usePathname();
  // let { userId } = useAuth();
  let userId = (userInfo as UserData)._id;
  const handleSignOut = () => {
    signOut({ callbackUrl: "/sign-in" }); // Redirect to the sign-in page after signing out
  };
  return (
    <section id="left" className="leftsidebar">
      <div className=" flex flex-col gap-2 px-6 mb-auto mt-8">
        {SidebarLinks.map((link, index) => {
          if (link.route === "/profile") link.route = `/profile/${userId}`;
          let isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={index}
              id={link.label}
              href={link.route}
              className={`leftsidebar_link ${
                isActive && " text-[#ffffff] bg-primary-500"
              }`}
            >
              <Image
                src={isActive ? link.imgURL : link.imgURLh}
                alt={link.label}
                height={24}
                width={24}
                style={{ color: "#000" }}
              />
              <span className=" max-lg:hidden">{link.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="px-10">
        <div id="logout" className="" onClick={() => dispatch(clearUser())}>
          <div onClick={handleSignOut} className="">
            <div className="flex gap-4 cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <span className=" text-white  max-lg:hidden">logout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
