"use client";
import { SidebarLinks } from "@/constants/icons";
import { UserData } from "@/lib/actions/user.actions";
import { setUser } from "@/lib/redux/userSlice";
// import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Bottombar = ({
  userInfo,
}: {
  userInfo: UserData | { redirect: string };
}) => {
  let pathname = usePathname();
  let dispatch = useDispatch();
  // let {userId} = useAuth();
  let userId = (userInfo as UserData)._id;
  useEffect(() => {
    dispatch(setUser(userInfo as UserData));
  }, [userInfo]);
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {SidebarLinks.map((link, index) => {
          if (link.route === "/profile") link.route = `/profile/${userId}`;

          let isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={index}
              href={link.route}
              className={`bottombar_link ${
                isActive ? " bg-primary-500 text-[#ffffff] " : "text-white"
              }`}
            >
              <Image
                src={isActive ? link.imgURL : link.imgURLh}
                alt={link.label}
                height={24}
                width={24}
              />
              <span className="  hidden sm:block">
                {link.label.split(/\s+/)[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
