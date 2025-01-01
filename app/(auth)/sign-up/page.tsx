"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaGoogle, FaFacebook, FaDiscord } from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";

export default function SignUpPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  return (
    <div className="grid w-full flex-grow items-center px-4 sm:justify-center">
      <div className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8">
        <header className="text-center flex flex-col items-center">
          <Image
            src={"/logo5.gif"}
            alt="logo sporton"
            width={100}
            height={100}
          />
          <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
            Create an account in{" "}
            <span className="px-2 text-secondary-500">SPORTON</span>
          </h1>
        </header>

        <div className="flex justify-evenly">
          <button
            onClick={() => signIn("google")}
            className="flex w-1/4 items-center justify-center gap-x-3 rounded-md px-3.5 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="flex w-1/4 items-center justify-center gap-x-3 rounded-md px-3.5 py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            <FaFacebook />
          </button>
          <button
            onClick={() => signIn("discord")}
            className="flex w-1/4 items-center justify-center gap-x-3 rounded-md px-3.5 py-1.5 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600"
          >
            <FaDiscord />
          </button>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-950">
              Email address
            </label>
            <input
              type="email"
              required
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-zinc-300 hover:ring-zinc-400 focus:ring-2 focus:ring-zinc-950"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-950">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-zinc-300 hover:ring-zinc-400 focus:ring-2 focus:ring-zinc-950"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary-500 px-3.5 py-1.5 text-sm font-medium text-white shadow hover:bg-primary-600"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          Have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-zinc-950 underline hover:text-zinc-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
