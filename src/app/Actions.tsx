import { type State } from "@/client/components/layout/Header";
import { signIn, signOut } from "next-auth/react";

interface Props {
  headerStyle: State;
}
export function SignOut(props: Props) {
  return (
    <button
      className={`mx-auto mt-4 rounded-full bg-white px-8 py-4 font-bold opacity-75 shadow hover:underline lg:mx-0 lg:mt-0 ${props.headerStyle.navaction}`}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}

export function SignIn(props: Props) {
  return (
    <button
      className={`mx-auto mt-4 rounded-full bg-white px-8 py-4 font-bold opacity-75 shadow hover:underline lg:mx-0 lg:mt-0 ${props.headerStyle.navaction}`}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => signIn("google")}
    >
      Login
    </button>
  );
}
