import Link from "next/link";

import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
          <div className="bg-white px-8 py-10 md:w-8/12 lg:w-5/12">
            <LoginForm />
          </div>
        </div>
        <div className="text-muted-foreground px-8 text-center text-sm">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="hover:text-brand underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-brand underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </div>
      </section>
    </>
  );
}
