"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
interface props {
  _id: string;
  id: string;
  sport: string;
  name: string;
  username: string;
  image: string;
  personType: string;
}
const UserCard = ({ person }: { person: string }) => {
  let { _id, id, name, username, image, sport }: props = JSON.parse(person);
  let navigate = useRouter();
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        {/* <Image src={image} alt={name} height={48} width={48} className=' rounded-full object-contain'/> */}

        <div className="relative aspect-square h-[48px] w-[48px]">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full rounded-full object-cover"
          />
        </div>
        <div className=" flex-1 text-ellipsis">
          <Image
            src={"/" + sport.split(" ")[0] + ".svg"}
            alt={sport}
            height={30}
            width={30}
            className="-translate-x-4"
          />
          <h3 className=" text-base-semibold text-light-1">{name}</h3>
          <p className=" text-small-semibold text-gray-1">@{username}</p>
        </div>
      </div>
      <Button
        className="user-card_btn"
        onClick={() => navigate.push(`/profile/${_id}`)}
      >
        view
      </Button>
    </article>
  );
};

export default UserCard;
