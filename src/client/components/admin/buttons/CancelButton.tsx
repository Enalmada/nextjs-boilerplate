import { Button } from "@/client/ui";
import type { ButtonProps } from "@nextui-org/react";
import NextLink from "next/link";
import React from "react";

const CancelButton = (props: ButtonProps) => (
	<Button as={NextLink} color={"default"} {...props}>
		Cancel
	</Button>
);

export default CancelButton;
