import { type MetadataRoute } from "next";

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file
export default function robots(): MetadataRoute.Robots {
  if (process.env.APP_ENV === "production") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/app/",
      },
    };
  } else {
    return {
      rules: {
        userAgent: "*",
        disallow: " ",
      },
    };
  }
}
