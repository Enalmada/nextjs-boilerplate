import Loader from "@/client/components/Loader";

import LogoutPage from "./LogoutPage";

export const runtime = "edge"; // https://github.com/cloudflare/next-on-pages

export const metadata = {
  title: "Logout",
};

export default function Logout() {
  return (
    <>
      <Loader />
      <LogoutPage />
    </>
  );
}
