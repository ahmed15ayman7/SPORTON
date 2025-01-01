"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is already authenticated
    const checkAuth = async () => {
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      if (session?.user) router.replace("/");
    };
    checkAuth();
  }, [router]);

  return (
    <div className="grid w-full flex-grow items-center px-4 sm:justify-center">
      <div className="w-full space-y-6 rounded-2xl bg-[#fff] px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8">
        <header className="text-center flex flex-col items-center">
          <Image
            src={"/logo5.gif"}
            alt="logo sporton"
            width={100}
            height={100}
          />
          <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
            Sign in to
            <span className="px-2 text-secondary-500">SPORTON</span>
          </h1>
        </header>
        <div className="flex justify-evenly">
          <button
            onClick={() => signIn("google")}
            className="w-1/4 flex items-center justify-center gap-x-3 rounded-md bg-white px-3.5 py-1.5 shadow ring-1 ring-zinc-300 hover:ring-zinc-400"
          >
            <Image src="/google.svg" alt="Google" width={24} height={24} />
          </button>
          <button
            onClick={() => signIn("discord")}
            className="w-1/4 flex items-center justify-center gap-x-3 rounded-md bg-white px-3.5 py-1.5 shadow ring-1 ring-zinc-300 hover:ring-zinc-400"
          >
            <Image src="/discord.svg" alt="Discord" width={24} height={24} />
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="w-1/4 flex items-center justify-center gap-x-3 rounded-md bg-white px-3.5 py-1.5 shadow ring-1 ring-zinc-300 hover:ring-zinc-400"
          >
            <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
          </button>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => signIn("credentials", { redirect: false })}
            className="w-full rounded-md bg-primary-500 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-primary-500 hover:bg-primary-500/80"
          >
            Sign In with Email
          </button>
        </div>
        <h2 className="text-center text-sm text-zinc-500">
          No account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline"
          >
            Create an account
          </Link>
        </h2>
      </div>
    </div>
  );
}
