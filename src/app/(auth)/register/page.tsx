import { RegisterPage } from './RegisterPage';

export const metadata = {
  title: 'Register',
};

interface Props {
  searchParams: {
    redirect?: string;
  };
}

export default function Register({ searchParams }: Props) {
  const redirect = searchParams.redirect;

  return <RegisterPage redirect={redirect} />;
}
