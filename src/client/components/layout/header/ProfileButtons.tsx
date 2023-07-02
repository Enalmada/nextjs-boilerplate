import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/auth/hooks";
import { getRouteById } from "@/client/utils/routes";

export default function AuthButtons() {
  const { tenant } = useAuth();

  const active = false;
  return (
    <>
      {tenant ? (
        <Link
          href={"/app/profile"}
          className={`inline-block px-4 py-2 text-black no-underline ${
            active ? "font-bold no-underline" : "hover:text-underline hover:text-gray-800"
          }`}
        >
          Profile
        </Link>
      ) : (
        <Link
          href={getRouteById("About").path}
          className={`inline-block px-4 py-2 text-black no-underline ${
            active ? "font-bold no-underline" : "hover:text-underline hover:text-gray-800"
          }`}
        >
          About
        </Link>
      )}
    </>
  );
}
