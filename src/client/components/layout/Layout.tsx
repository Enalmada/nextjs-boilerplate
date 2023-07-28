import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <span id={'sticky-footer'} className={'gradient leading-normal tracking-normal text-white'}>
      <Header />
      <main className={'flex-grow'}>{children}</main>
      <Footer />
    </span>
  );
}
