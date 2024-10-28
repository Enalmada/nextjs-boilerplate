import { Button } from "@/client/ui";
import type { ButtonProps } from "@nextui-org/react";
import React from "react";

const DeleteButton = (props: ButtonProps) => (
	<Button type="button" color="danger" {...props}>
		Delete
	</Button>
);

export default DeleteButton;
