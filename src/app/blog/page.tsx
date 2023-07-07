import PageLayout from "@/client/components/layout/PageLayout";

export const runtime = "edge"; // https://github.com/cloudflare/next-on-pages

export const metadata = {
  title: "Blog",
};

export default function Page() {
  return <PageLayout>Blog</PageLayout>;
}
