"use client";
import { addFriend, UserData } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
export let SugCard = ({
  result2,
  type,
  userInfo2,
  isChat,
  Ids,
  islg,
  refrish,
  setChat,
  isGuest
}: {
  isGuest:boolean;
  result2: string;
  type: string;
  userInfo2: string;
  isChat?: boolean;
  Ids?: string;
  islg?: boolean;
  refrish?: any;
  setChat?: any;
}) => {
  const userInfo: UserData = JSON.parse(userInfo2);
  const result: any[] = JSON.parse(result2);
  let navigate = useRouter();
  let pathname = usePathname();
  
  let handleAddMember = async (
    type: string,
    accountId: string,
    myId: string | undefined,
    isFriend: boolean,
    setfirst:any,
  ) => {
   if (isGuest) return
   setfirst(!isFriend)
    await addFriend({
      friendId: accountId,
      userId: myId,
      path: pathname,
      isFriend: isFriend,
    });
    refrish(Math.random());
  };
  return (
    <div className=" flex flex-col gap-6 w-full scroll-auto">
      {isChat && (
        <Link
          href="/"
          className=" flex items-center justify-between  g-3  no-underline text-body-bold text-white">
          <div className="flex items-center  gap-9">
            <div className=" max-sm:w-16 max-sm:h-16 w-20 h-20 relative ">
              <Image src="/logo5.gif" alt="" fill className="" />
            </div>
            <p className="ms-2 text-[#FF971D] -translate-x-10">SPORTON CHAT</p>
          </div>
        </Link>
      )}
      {result?.map((result, i) => <ResultMap key={i} result={result} userInfo={userInfo} i={i} setChat={setChat} isChat={isChat} islg={islg} Ids={Ids} navigate={navigate} handleAddMember={handleAddMember} type={type} isGuest={isGuest} />)}
    </div>
  );
};
let ResultMap=({result,userInfo,i,setChat,isChat,islg,Ids,navigate,handleAddMember,type,isGuest}:{result:any,userInfo:UserData,i:number,setChat:any,isChat?:boolean,islg?:boolean,Ids?:string,navigate:any,handleAddMember:any,type:string,isGuest:boolean})=>{
    let isFriend: boolean =
      userInfo?.friends.filter((e) => e.id === result?.id).length === 1;
    let checked = isFriend;
    let route = `/profile/${result?._id}`;
    const [first, setfirst] = useState(checked)
    return checked && isChat ? (
      <div
      
        onClick={()=>{if(islg){setChat(`${userInfo._id + "-" + result?._id}`)}else{navigate.push("/messaging/" + userInfo._id + "-" + result?._id)}}}
        className={`user-card cursor-pointer ${
          Ids === userInfo._id + "-" + result?._id
            ? "bg-[#b3b3b380] rounded-s-full"
            : ""
        }`}
        key={i}>
        <div
          className="user-card_avatar"
          // onClick={()=>setChat(`${userInfo._id + "-" + result?._id}`)}
          onLoad={() => {
            i === 0 &&
              islg &&Ids?.length===0&&
              setChat(`${userInfo._id + "-" + result?._id}`)
          }}
          >
            <div className="relative   aspect-square h-10 w-10  ">
                  <img
                    src={result?.image}
                    alt="post image"
                    className="absolute inset-0 w-full h-full rounded-full object-cover"
                  />
                </div>
          {/* <Image
            src={result?.image}
            alt={result?.name}
            height={48}
            width={48}
            className=" cursor-pointer rounded-full object-contain"
          /> */}
          <div className="flex-1 text-ellipsis  relative ">
            <Image
              src={"/" + result?.sport.split(" ")[0] + ".svg"}
              alt={result?.sport}
              height={result?.sport === "kung Fu" ? 20 : 30}
              width={result?.sport === "kung Fu" ? 20 : 30}
              className="-translate-x-4 -translate-y-4 top-0 left-0 absolute"
            />
            <div className=" cursor-pointer w-full flex gap-[3px]">
              <h5 className=" text-base-semibold text-light-1 z-20">
                {result?.name?.length > 11
                  ? result?.name?.slice(0, 11) + "..."
                  : result?.name}
              </h5>
              <Image
                src={"/golden.svg"}
                alt={"golden"}
                height={20}
                width={20}
                className=" max-sm:scale-150"
              />
            </div>
            <p className=" text-small-semibold text-gray-1">
              @
              {result?.username?.length > 11
                ? result?.username?.slice(0, 11) + "..."
                : result?.username
                }
            </p>
          </div>
        </div>
      </div>
    ) : (
      !isChat && (
        <article className="user-card" key={result?._id}>
          <div className="user-card_avatar">
          <div className="relative   aspect-square  h-10 w-10 ">
                  <img
                    src={result?.image}
                    alt="post image"
                    onClick={() => navigate.push(route)}
                    className="absolute inset-0 w-full h-full rounded-full object-cover"
                  />
                </div>
            {/* <Image
              src={result?.image}
              alt={result?.name}
              height={48}
              width={48}
              className=" cursor-pointer  object-contain"
            /> */}
            <div className="flex-1 text-ellipsis relative ">
              <Image
                src={"/" + result?.sport.split(" ")[0] + ".svg"}
                alt={result?.sport}
                height={result?.sport === "kung Fu" ? 20 : 30}
                width={result?.sport === "kung Fu" ? 20 : 30}
                className="-translate-x-4 -translate-y-4 top-0 left-0 absolute"
              />
              <div className=" cursor-pointer w-full flex gap-[3px]">
                <h5 className=" text-base-semibold text-light-1 z-20">
                  {result?.name?.length > 11
                    ? result?.name?.slice(0, 11) + "..."
                    : result?.name}
                </h5>

                <Image
                  src={"/golden.svg"}
                  alt={"golden"}
                  height={20}
                  width={20}
                  className=" max-sm:scale-150"
                />
              </div>
              <p className="text-small-semibold text-gray-1">
                @
                {result?.username?.length > 11
                  ? result?.username?.slice(0, 11) + "..."
                  : result?.username}
              </p>
            </div>
            {first && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={
                        !isGuest? "/messaging/" + userInfo?._id + "-" + result?._id:"/messaging"
                      }
                      className="">
                      <Image
                        src={`/assets/messnger-primary.svg`}
                        alt="messnger"
                        height={20}
                        width={20}
                        className="hover:scale-125 cursor-pointer object-contain"
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-primary-500">
                      messaging {result?.name.split(" ")[0]}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="flex no-underline gap-4 cursor-pointer"
                    onClick={() =>
                      handleAddMember(
                        type,
                        result?._id,
                        userInfo?._id,
                        first,setfirst
                      )
                    }>
                    <Image
                      src={
                        first
                          ? "/assets/user-true.svg"
                          : "/assets/user-plus.svg"
                      }
                      alt="add friend"
                      className="hover:scale-125 cursor-pointer object-contain"
                      width={24}
                      height={24}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-primary-500">
                    {!first ? "add your team" : "remove from team"}{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </article>
      )
    );

}