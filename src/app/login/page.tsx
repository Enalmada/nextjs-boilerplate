import { LoginPage as ClientLoginPage } from "./LoginPage";

export const runtime = "edge"; // https://github.com/cloudflare/next-on-pages

export default function Login() {
  return <ClientLoginPage />;
}
