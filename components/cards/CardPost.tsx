"use client";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
  PostData,
  //  deletePost,
  reactToPost,
} from "@/lib/actions/post.actions";
import { formatDateString } from "@/lib/utils";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import FriendCarousel from "./FriendCarousel";
import { Button } from "@/components/ui/button";
import ReactionIcons from "./ReactionIcons";
import { Howl } from "howler";
interface parms {
  isGuest: boolean;
  isRepost?: boolean;
  isAchievement?: string;
  id: string;
  Team: any[];
  image?: string;
  video?: string;
  userId: string | undefined;
  parentId: string | null;
  currentId: String | undefined;
  author: {
    _id: string;
    id: string;
    name: string;
    image: string;
    sport: string;
  };
  react: string[] | undefined;
  content: string;
  community?: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      _id: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
  repost?: PostData;
  isComment?: boolean;
  setAction?: any;
}

const CardPost = ({
  isGuest,
  isRepost,
  id,
  parentId,
  Team,
  isAchievement,
  currentId,
  userId,
  author,
  content,
  community,
  react,
  createdAt,
  comments,
  isComment,
  video,
  image,
  setAction,
  repost,
}: parms) => {
  const secretKey = process.env.SecretKey
    ? Buffer.from(process.env.SecretKey, "base64")
    : randomBytes(32);
  const iv = randomBytes(16); // نقطة البداية (initialization vector)

  // تشفير
  function encryptId(text: string): string {
    const cipher = createCipheriv("aes-256-cbc", secretKey, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}555abc666def${text}555abc666def${encrypted}`;
  }

  const date = new Date(createdAt);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  const [isHovering, setIsHovering] = useState(false);
  let pathname = usePathname();
  let [copy, setCopy] = useState(false);
  let isFriend = Team?.filter((friend) => friend.id === author.id).length === 1;
  let commentsFilter = comments.filter((e) => e.author._id !== undefined);
  let isReplay =
    commentsFilter.filter((e) => e.author.id === currentId).length >= 1;
  let commLen = isReplay ? commentsFilter.length - 1 : commentsFilter.length;
  let isReact2 =
    react !== undefined &&
    react.filter((e: any) => e?.user?._id === userId).length >= 1;
  const [LenReact, setLenReact] = useState(react ? react.length : 0);
  const [isReact, setIsReact] = useState(isReact2);
  const [reactionImg, setReactionImage] = useState("/assets/heart-filled.svg");
  const sounds = {
    like: new Howl({ src: ["/sounds/like.wav"] }),
    love: new Howl({ src: ["/sounds/love.mp3"] }),
    support: new Howl({ src: ["/sounds/like.wav"] }),
    wow: new Howl({ src: ["/sounds/wow.wav"] }),
    haha: new Howl({ src: ["/sounds/haha.wav"] }),
    sad: new Howl({ src: ["/sounds/sad.wav"] }),
    angry: new Howl({ src: ["/sounds/angry.wav"] }),
    // click: new Howl({ src: ['/sounds/click.mp3'] }),
  };
  let handleHeart = async (
    reaction: string,
    img: string,
    isClick?: boolean
  ) => {
    if (isGuest) return;
    //@ts-ignore
    sounds[`${reaction}`].play();
    setReactionImage(img);
    isClick && setIsReact(!isReact);
    setLenReact(isReact === true ? LenReact - 1 : LenReact + 1);
    console.log(react);
    await reactToPost({
      postId: id,
      react: isReact,
      userId: userId,
      path: pathname,
    });
    setAction && setAction(Math.random());
  };
  let handelDeletePost = async () => {
    try {
      if (isGuest) return;
      // await deletePost(id, author._id, parentId, isComment, pathname);
    } catch (e) {
      console.log(e);
    }
  };
  //!!!!!!!! SocialShare
  //?????????? SocialShare
  const SocialShare = ({ url, title }: { url: string; title: string }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedMessage = encodeURIComponent(`${title} \n  ${url}`);
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };
    return (
      <div className={"flex justify-center gap-5"}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div onClick={copyToClipboard}>
                <Image
                  src={`/assets/copy.svg`}
                  alt="copy"
                  height={30}
                  width={30}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">Copy link </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/assets/facebook.svg`}
                  alt="facebook"
                  height={40}
                  width={40}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">Share on Facebook</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/assets/twitter.svg`}
                  alt="twitter"
                  height={30}
                  width={30}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">Share on Twitter</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href={`https://api.whatsapp.com/send?text=${encodedMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/assets/whatsapp.svg`}
                  alt="whatsapp"
                  height={30}
                  width={30}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">Share on WhatsApp</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };
  //?????????? end SocialShare
  //!!!!!!!! SocialShare
  let IconsFooter = ({
    isMessenger,
    isWhite,
  }: {
    isMessenger?: boolean;
    isWhite?: boolean;
  }) => (
    <div className={`${isComment && "mb-10"} flex flex-col `}>
      <div className="flex flex-row-reverse items-center justify-between">
        {LenReact && LenReact > 0 ? (
          <div className="mt-1 flex flex-row items-center">
            <p
              className={` text-subtle-medium  ${
                isWhite ? " text-[#ffffff]" : "text-gray-1"
              }`}
            >
              {LenReact}
            </p>
            <Image
              src={"/assets/heart-filled.svg"}
              alt="heart"
              height={20}
              width={20}
              className="  object-contain"
            />
          </div>
        ) : null}
        {!isComment && commentsFilter.length > 0 && (
          <Link href={`/post/${id}`}>
            {commLen > 0 ? (
              <p
                className={`mt-1 text-subtle-medium  ${
                  isWhite ? " text-[#ffffff]" : "text-gray-1"
                }`}
              >
                {isReplay && "you and "}
                {commLen} repl{commLen > 1 ? "ies" : "y"}
              </p>
            ) : null}
          </Link>
        )}
      </div>
      <div className="mt-3 flex flex-row items-center gap-6">
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image
            src={
              isReact
                ? reactionImg
                : `/assets/heart${isWhite ? "-white" : "-gray"}.svg`
            }
            alt="heart"
            height={20}
            width={20}
            className="hover:scale-125 cursor-pointer object-contain"
            onClick={() =>
              handleHeart("love", "/assets/heart-filled.svg", true)
            }
          />
          <ReactionIcons
            isVisible={isHovering}
            onReact={handleHeart}
            isWhite={isWhite}
          />
        </div>
        {/* <Image
          src={
            isReact
              ? "/assets/heart-filled.svg"
              : `/assets/heart${isWhite ? "-white" : "-gray"}.svg`
          }
          alt="heart"
          height={20}
          width={20}
          className=" hover:scale-125 cursor-pointer object-contain"
          onClick={handleHeart}
        /> */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/post/${encryptId(id)}`}>
                <Image
                  src={`/assets/reply${isWhite ? "-white" : ""}.svg`}
                  alt="heart"
                  height={20}
                  width={20}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">reply</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/new-post?repost=${id}`} className="">
                <Image
                  src={`/assets/repost${isWhite ? "-white" : ""}.svg`}
                  alt="repost"
                  height={20}
                  width={20}
                  className="hover:scale-125 cursor-pointer object-contain"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">repost</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {!isMessenger && isFriend && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={"/messaging/" + userId + "-" + author._id}
                  className=""
                >
                  <Image
                    src={`/assets/messnger${isWhite ? "-white" : ""}.svg`}
                    alt="repost"
                    height={20}
                    width={20}
                    className="hover:scale-125 cursor-pointer object-contain"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-[#ffffff]">
                <p className="text-primary-500">messaging {author.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Drawer>
          <DrawerTrigger>
            <Image
              src={`/assets/share${isWhite ? "-white" : ""}.svg`}
              alt="share"
              height={20}
              width={20}
              className="hover:scale-125 cursor-pointer object-contain"
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className={"absolute right-[10%] top-5"}>
                <DrawerClose>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={`/assets/close.svg`}
                          alt="repost"
                          height={30}
                          width={30}
                          className="hover:scale-125  cursor-pointer object-contain"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#ffffff]">
                        <p className="text-primary-500">close</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DrawerClose>
              </div>
              <div className={"flex flex-col  items-center gap-5"}>
                <DrawerTitle>It’s Time to share</DrawerTitle>
                {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
              </div>
            </DrawerHeader>
            <DrawerFooter>
              {Team.length > 0 && (
                <>
                  <h2 className="text-body-bold">Send to friends?</h2>
                  <FriendCarousel
                    url={`/post/${id}`}
                    title={content}
                    friends={Team}
                  />
                </>
              )}
              <SocialShare
                url={`https://www.sporton.website/post/${id}`}
                title={content}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
  let DropDown = ({ isBlack }: { isBlack?: boolean }) => (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={`/assets/points-virtical${isBlack ? "-white" : ""}.svg`}
            alt={"points"}
            height={5}
            width={5}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem>
            <Link href={"/profile/" + author.id} className="flex gap-2">
              <Image
                src={"/assets/edit.svg"}
                alt={author.name}
                height={20}
                width={20}
              />
              <p>Edit post</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant={"outline"}
              className={
                "w-full mx-0 flex outline-none gap-4 border-none justify-start text-start"
              }
              onClick={() => handelDeletePost()}
            >
              <AiFillDelete color="#ff0000" /> delete
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <article
      className={` flex w-full flex-col rounded-xl ${
        isComment ? " px-0 xs:px-7" : "bg-dark-2 p-5"
      } ${isRepost ? "border rounded-xl  px-0 xs:px-3 py-5" : ""}`}
    >
      <div className=" flex items-start justify-between">
        <div className=" flex w-full flex-1 flex-row gap-4 ">
          <div
            className={` text-white flex-col items-center ${
              isRepost ? "" : "lg:flex"
            } hidden `}
          >
            <Link href={"/profile/" + author.id} className="relative w-11 h-11">
              <div className="relative   aspect-square h-10 w-10  ">
                <img
                  src={author.image}
                  alt={author.name}
                  className="absolute inset-0 w-full h-full rounded-full object-cover"
                />
              </div>
              {/* <Image
                src={author.image}
                alt={author.name}
                fill
                className="cursor-pointer rounded-full"
              /> */}
            </Link>
            {!isRepost && <div className="thread-card_bar" />}
          </div>
          <div className=" text-white flex flex-col gap-4 w-full  ">
            <div className="flex w-full flex-1 flex-row gap-4 ">
              <div className="flex w-full flex-1 flex-row gap-4 ">
                <div
                  className={` text-white flex flex-col items-center ${
                    isRepost ? "" : "lg:hidden"
                  }  `}
                >
                  <Link
                    href={"/profile/" + author.id}
                    className="relative w-11 h-11"
                  >
                    <Image
                      src={author.image}
                      alt={author.name}
                      fill
                      className="cursor-pointer rounded-full"
                    />
                  </Link>
                  <div className="thread-card_bar" />
                </div>
                <div className="-translate-y-3">
                  <Image
                    src={"/" + author.sport.split(" ")[0] + ".svg"}
                    alt={author.sport}
                    height={30}
                    width={30}
                    className="-translate-x-4"
                  />
                  <Link
                    href={"/profile/" + author.id}
                    className=" cursor-pointer w-full flex gap-4 "
                  >
                    <div className=" cursor-pointer w-full flex gap-[3px]">
                      <h2>{author.name}</h2>
                      <Image
                        src={"/golden.svg"}
                        alt={"golden"}
                        height={20}
                        width={20}
                        className=" max-sm:scale-150"
                      />
                    </div>
                    {isFriend && (
                      <Image
                        src={"/assets/members.svg"}
                        alt="add friend"
                        className=""
                        width={24}
                        height={24}
                      />
                    )}
                    {isAchievement === "1" ? (
                      <Image
                        src={"/assets/achievement.svg"}
                        alt={"achievement"}
                        height={24}
                        width={24}
                        className="object-contain"
                      />
                    ) : null}
                  </Link>
                </div>
              </div>
              {author._id === userId && <DropDown isBlack />}
            </div>
            <p className=" text-small-regular text-light-2 ">{content}</p>
            {image && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className={`max-sm:px-0 ${isRepost ? "" : "px-16"} `}>
                    <div className="relative max-sm:aspect-square max-md:aspect-video aspect-square  mb-5">
                      <img
                        src={image}
                        alt="post image"
                        className="absolute inset-0 w-full h-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className=" flex justify-between">
                      {author._id === userId ? <DropDown /> : <div></div>}
                      <AlertDialogTitle
                        className={"text-[#ffffff] text-center"}
                      >
                        <h5>@{author.name}</h5>
                      </AlertDialogTitle>
                      <AlertDialogCancel>
                        <Image
                          src={"/assets/back.svg"}
                          alt={"points"}
                          height={15}
                          width={15}
                        />
                      </AlertDialogCancel>
                    </div>
                    <AlertDialogDescription>
                      <div className="max-sm:px-0 px-16">
                        {/* <div className="relative max-sm:aspect-square max-md:aspect-video aspect-square  mb-5"> */}
                        <img
                          src={image}
                          alt="post image"
                          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
                        />
                        {/* </div> */}
                      </div>
                    </AlertDialogDescription>
                    <AlertDialogDescription
                      className={"text-[#ffffff] text-center"}
                    >
                      {content}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <div className="flex justify-center w-full">
                      {author._id !== userId ? (
                        <IconsFooter isWhite />
                      ) : (
                        <IconsFooter isWhite isMessenger />
                      )}
                      {/* <Link href={"/messaging/" + author.id}>
                          <button className="p-2  text-[#ffffff] focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 bg-transparent hover:border-[#ffffff] border  dark:text-[#ffffff] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#ffffff] transition-colors focus-visible:outline-none ">
                            Messaging {author.name}
                          </button>
                        </Link> */}
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {repost && repost?.createdAt && (
              <CardPost
                isGuest={isGuest}
                isRepost
                setAction={() => {}}
                Team={[]}
                isAchievement={repost?.isAchievement}
                id={repost?._id}
                repost={repost?.repost}
                video={repost?.video}
                image={repost?.image}
                parentId={repost?.parentId}
                react={[]}
                currentId={currentId}
                userId={userId}
                author={repost?.author}
                content={repost?.text}
                createdAt={repost?.createdAt}
                comments={[]}
              />
            )}
            {video && (
              <video
                src={video}
                controls
                // autoPlay
                className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
              />
            )}
            <IconsFooter />
          </div>
        </div>
      </div>

      {/* {!isComment && community?.name && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 items-center flex text-gray-50">
          <p className=" text-subtle-medium">
            {formatDateString(createdAt)}- {community.name} community
          </p>
          <Image
            src={community.image}
            alt={community.name}
            height={25}
            width={25}
            className=" ml-1 rounded-full object-fill"
          />
        </Link>
      )} */}
      {!isComment && commentsFilter.length > 0 && (
        <div className="ml-2 mt-3 flex items-center gap-2">
          {commentsFilter.map((comment, index, arr) => {
            let count = -1;
            if (index > 0) {
              if (
                comment?.author._id === arr[index - 1]?.author._id ||
                comment?.author.id === author.id
              ) {
                return null;
              } else {
                count += index + 1;
              }
            }
            if (count >= 3) {
              return null;
            }
            return (
              <div
                key={index}
                className="relative aspect-square   w-10 h-10  shadow-2xl rounded-full"
              >
                <img
                  src={comment?.author.image}
                  alt={`user_${index}`}
                  className={`${
                    count !== 0 && index !== 0
                      ? "-ml-5"
                      : count === 0 && index !== 0
                      ? ""
                      : index !== 0
                      ? "-ml-5"
                      : ""
                  } absolute inset-0 w-full h-full rounded-full object-cover`}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-2 text-gray-400 text-xs">{formattedDate}</div>
    </article>
  );
};

export default CardPost;
