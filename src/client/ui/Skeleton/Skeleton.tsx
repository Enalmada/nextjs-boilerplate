"use client";

import {
	Skeleton as NextUISkeleton,
	type SkeletonProps as NextUISkeletonProps,
} from "@nextui-org/react";
import React from "react";

export const Skeleton = ({ ...props }: NextUISkeletonProps) => {
	return props.isLoaded ? (
		props.children
	) : (
		<NextUISkeleton {...props}>{props.children}</NextUISkeleton>
	);
};
