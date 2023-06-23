"use client";

import React from "react";
import { type NextPage } from "next";
import Layout from "@/components/layout/Layout";
import Page from "@/components/layout/Page";

const Blog: NextPage = () => {
  return (
    <Layout title={"Blog"}>
      <Page>Blog</Page>
    </Layout>
  );
};

export default Blog;
