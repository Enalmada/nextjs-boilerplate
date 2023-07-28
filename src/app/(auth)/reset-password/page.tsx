import { ResetPasswordPage } from './ResetPasswordPage';

export const metadata = {
  title: 'Reset Password',
};

interface Props {
  searchParams: {
    redirect?: string;
  };
}

export default function ResetPassword({ searchParams }: Props) {
  const redirect = searchParams.redirect;

  return <ResetPasswordPage redirect={redirect} />;
}
