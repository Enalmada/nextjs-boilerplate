"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

// https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/
export const LoginForm = () => {
  return (
    <a
      className="mb-3 flex w-full items-center justify-center rounded px-7 py-2 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
      style={{ backgroundColor: "#3b5998" }}
      onClick={() => {
        void signIn("google", { callbackUrl: "/app" });
      }}
      role="button"
    >
      <Image
        className="pr-2"
        src="/images/btn_google_light_normal_ios.svg"
        alt=""
        style={{ height: "2rem" }}
      />
      Sign in with Google
    </a>
  );
};
