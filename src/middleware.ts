export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/app/(.*)"],
  // Example of everything except
  //matcher: ["/((?!register|login|graphql|api|images).*)"],
};
