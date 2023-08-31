import { LoginPage as ClientLoginPage } from './LoginPage';

export const metadata = {
  title: 'Login',
};

interface Props {
  searchParams: {
    redirect?: string;
  };
}

export default function Login({ searchParams }: Props) {
  const redirect = searchParams.redirect;

  return <ClientLoginPage redirect={redirect} />;
}
