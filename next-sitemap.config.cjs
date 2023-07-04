/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml", "/app/*", "/graphql", "/login", "/logout", "/maintenance-mode"],
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies:
      process.env.APP_ENV === "production"
        ? [
            {
              userAgent: "*",
              disallow: "/app",
            },
          ]
        : [
            {
              userAgent: "*",
              disallow: " ",
            },
          ],
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_REDIRECT_URL}/server-sitemap.xml`],
  },
};
