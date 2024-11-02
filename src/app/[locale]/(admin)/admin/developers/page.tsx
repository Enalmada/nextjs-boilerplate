import type { Metadata } from "next/index";
import React from "react";
import { Content } from "./Content";

export const metadata: Metadata = {
	title: "Admin",
};

export default function Page() {
	return <Content />;
}
