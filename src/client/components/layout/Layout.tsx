import Footer from './Footer';
import Header from './Header';

const companyName = 'ToDo App';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <span id={'sticky-footer'}>
      <Header companyName={companyName} />
      <main className={'flex-grow'}>{children}</main>
      <Footer companyName={companyName} />
    </span>
  );
}
