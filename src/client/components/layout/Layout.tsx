import Footer from './Footer';
import Header from './Header';

const companyName = 'ToDo App';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <span id={'sticky-footer'} className={'gradient leading-normal tracking-normal text-white'}>
      <Header companyName={companyName} />
      <main className={'flex-grow'}>{children}</main>
      <Footer companyName={companyName} />
    </span>
  );
}
