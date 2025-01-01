"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MdAddBusiness } from "react-icons/md";
import AddProductForm from "@/components/forms/AddProduct";
import React, { useEffect } from "react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { selectUser, setUser } from "@/lib/redux/userSlice";
import { UserData } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
interface redirectType {
  redirect: string;
}
const Topbar = ({ userInfo }: { userInfo: UserData | redirectType }) => {
  const path = usePathname();
  let dispatch = useDispatch();
  const show = path.split("/").pop() === "new-post";
  const router = useRouter();
  if (show) {
    return <></>;
  }
  if (!userInfo) {
    return <></>;
  }
  useEffect(() => {
    // dispatch(setUser(userInfo as UserData))
  }, [userInfo]);

  return (
    <div className="topbar z-[40]">
      <div className="container p-0">
        <div className="flex flex-row justify-between">
          <Link
            id="home"
            href="/"
            className="flex min-w-96 max-sm:min-w-10 items-center justify-between w-1/12 g-3 no-underline text-body-bold text-white"
          >
            <div className="flex items-center gap-9">
              <div className="max-sm:w-16 max-sm:h-16 w-20 h-20 relative">
                <Image src="/logo5.gif" alt="" fill className="" />
              </div>
              <p className="ms-2 text-[#FF971D] -translate-x-10">SPORTON</p>
            </div>
          </Link>
          <div className="flex items-center p-1 lg:gap-9 gap-2">
            {path === "/store" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    <MdAddBusiness size={30} color="rgb(135 126 255)" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#ffffff]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Add New Product</AlertDialogTitle>
                    <AlertDialogDescription>
                      Fill out the form below to add a new product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AddProductForm userId={(userInfo as UserData)?._id} />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={"/messaging/"} className="">
                    <Image
                      src={`/assets/messnger-primary.svg`}
                      alt="Messaging"
                      height={30}
                      width={30}
                      className="hover:scale-125 cursor-pointer object-contain"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-primary-500">Go Messaging</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {(userInfo as UserData)?.image ? (
              <Link
                href={`/profile/${
                  (userInfo as UserData)?._id ? (userInfo as UserData)._id : ""
                }`}
                className="p-0"
              >
                <Image
                  src={(userInfo as UserData)?.image}
                  alt="Profile"
                  height={40}
                  width={40}
                  className="rounded-full object-contain"
                />
              </Link>
            ) : (
              <></>
            )}
            {/* <ModeToggle/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
