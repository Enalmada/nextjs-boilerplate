import { Spinner } from "@/client/ui";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}
export default function Redirecting({ children }: Props) {
	return (
		<div className="content-center justify-center text-center">
			<div className={"mb-5"}>{children}</div>
			<Spinner />
		</div>
	);
}
