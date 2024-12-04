"use client";
import Image from "next/image";
import Link from "next/link";
const PostButtonHome = () => {
  return (
    <div
      id="new-post"
      className="  max-sm:px-0 px-4 flex gap-7 max-sm:gap-0 cursor-pointer"
    >
      <Link href={"/new-post?sh=true"} className="   px-4 flex cursor-pointer ">
        <Image
          src={"/assets/createimg.svg"}
          alt={""}
          height={30}
          width={30}
          className={"rounded-full object-contain"}
        />
      </Link>
      <Link href={"/new-post"} className="grow  px-4 flex cursor-pointer ">
        <div className="w-full  border-primary-500 border-2 rounded-full text-primary-500 px-7 py-3">
          What are you thinking?
        </div>
      </Link>
    </div>
  );
};

export default PostButtonHome;
