"use client";
//@ts-ignore
import * as Clerk from "@clerk/elements/common";
//@ts-ignore
import * as SignUp from "@clerk/elements/sign-up";
//@ts-ignore
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
export default function SignUpPage() {
  let { isSignedIn } = useAuth();
  let router = useRouter();
  useEffect(() => {
    if (isSignedIn) router.replace("/");
  }, []);
  return (
    <div className="grid w-full flex-grow items-center  px-4 sm:justify-center">
      <SignUp.Root>
        <SignUp.Step
          name="start"
          className="w-full space-y-6 rounded-2xl bg-[#fff] px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <header className="text-center flex flex-col items-center">
            <Image
              src={"/logo5.gif"}
              alt="logo sporton"
              width={100}
              height={100}
            />
            <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
              Create an account in
              <span className="px-2 text-secondary-500">SPORTON</span>
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />

          <div className="flex justify-evenly">
            <div className="space-y-2 w-1/4">
              <Clerk.Connection
                name="google"
                className="flex w-full items-center justify-center gap-x-3 rounded-md  px-3.5 py-1.5 text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/5%)_inset,0_0_0_1px_theme(colors.white/2%)_inset] outline-none hover:bg-gradient-to-b hover:from-white/5 hover:to-white/5 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gradient-to-b active:from-black/20 active:to-black/20 active:text-white/70"
              >
                <Image
                  src={"/google.svg"}
                  alt="Google"
                  width={24}
                  height={24}
                />
              </Clerk.Connection>
            </div>
            <div className="space-y-2 w-1/4">
              <Clerk.Connection
                name="discord"
                className="flex w-full items-center justify-center gap-x-3 rounded-md px-3.5 py-1.5 text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/5%)_inset,0_0_0_1px_theme(colors.white/2%)_inset] outline-none hover:bg-gradient-to-b hover:from-white/5 hover:to-white/5 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gradient-to-b active:from-black/20 active:to-black/20 active:text-white/70"
              >
                <Image
                  src={"/discord.svg"}
                  alt="Discord"
                  width={24}
                  height={24}
                />
              </Clerk.Connection>
            </div>

            <div className="space-y-2 w-1/4">
              <Clerk.Connection
                name="facebook"
                className="flex w-full items-center justify-center gap-x-3 rounded-md px-3.5 py-1.5 text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/5%)_inset,0_0_0_1px_theme(colors.white/2%)_inset] outline-none hover:bg-gradient-to-b hover:from-white/5 hover:to-white/5 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gradient-to-b active:from-black/20 active:to-black/20 active:text-white/70"
              >
                <Image
                  src={"/facebook.svg"}
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </Clerk.Connection>
            </div>
          </div>

          <div className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">
                Email address
              </Clerk.Label>
              <Clerk.Input
                type="email"
                required
                className="w-full rounded-md bg-[#ffffff] px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm  font-medium text-zinc-950">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-[#ffffff] px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignUp.Captcha className="empty:hidden" />
          <SignUp.Action
            submit
            className="w-full rounded-md bg-primary-500 px-3.5 py-1.5 text-center text-sm font-medium text-[#ffffff] shadow outline-none ring-1 ring-inset ring-primary-500 hover:bg-primary-500/80 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:text-[#ffffff]/70"
          >
            Sign Up
          </SignUp.Action>
          <p className="text-center text-sm text-zinc-500">
            Have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
            >
              Sign in
            </Link>
          </p>
        </SignUp.Step>
      </SignUp.Root>
      {/* <SignIn.Root>
        <SignIn.Step
          name="start"
          className="">
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="identifier" className="">
              <Clerk.Input
                type="hidden"
                name="email"
                required
                value="guest@sporton.website"

              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="">
              <Clerk.Input
                type="hidden"
                name="password"
                value="sporton123654789sporton"
                required
                
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignIn.Action
            submit
            className="w-full gap-4 flex justify-center items-center rounded-md bg-primary-500 px-3.5 py-2 text-center text-sm font-medium text-[#ffffff] shadow outline-none ring-1 ring-inset ring-primary-500 hover:bg-primary-500/80 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:text-[#ffffff]/70">
            <FaUserAlt /> Sign In guest 
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root> */}
    </div>
  );
}
