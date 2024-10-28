"use client";

import {
	ButtonGroup as NextUIButtonGroup,
	type ButtonGroupProps as NextUIButtonGroupProps,
} from "@nextui-org/react";
import React from "react";

export function ButtonGroup({ ...props }: NextUIButtonGroupProps) {
	return <NextUIButtonGroup {...props}>{props.children}</NextUIButtonGroup>;
}
