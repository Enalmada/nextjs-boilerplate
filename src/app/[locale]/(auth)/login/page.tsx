import { LoginPage as ClientLoginPage } from "./LoginPage";

export const metadata = {
	title: "Login",
};

interface Props {
	searchParams: Promise<{
		redirect?: string;
	}>;
}

export default async function Login(props: Props) {
	const searchParams = await props.searchParams;
	const redirect = searchParams.redirect;

	return <ClientLoginPage redirect={redirect} />;
}
