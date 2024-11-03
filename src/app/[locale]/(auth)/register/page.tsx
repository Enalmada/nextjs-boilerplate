import { RegisterPage } from "./RegisterPage";

export const metadata = {
	title: "Register",
};

interface Props {
	searchParams: Promise<{
		redirect?: string;
	}>;
}

export default async function Register(props: Props) {
	const searchParams = await props.searchParams;
	const redirect = searchParams.redirect;

	return <RegisterPage redirect={redirect} />;
}
