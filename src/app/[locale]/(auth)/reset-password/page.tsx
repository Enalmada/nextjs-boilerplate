import { ResetPasswordPage } from "./ResetPasswordPage";

export const metadata = {
	title: "Reset Password",
};

interface Props {
	searchParams: Promise<{
		redirect?: string;
	}>;
}

export default async function ResetPassword(props: Props) {
	const searchParams = await props.searchParams;
	const redirect = searchParams.redirect;

	return <ResetPasswordPage redirect={redirect} />;
}
