'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthButtons from '@/client/components/layout/header/AuthButtons';
import { getRouteById } from '@/client/utils/routes';

import ProfileButtons from './header/ProfileButtons';

interface Props {
  companyName: string;
}

export type State = {
  header: string;
  navaction: string;
  toToggle: string;
  navcontent: string;
};

const Header = (props: Props) => {
  // const { user } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closedState: State = {
    header: '',
    navaction: 'bg-white text-gray-800',
    toToggle: 'text-white',
    navcontent: 'bg-gray-200',
  };

  const topOpenState: State = {
    header: '',
    navaction: 'bg-white text-gray-800',
    toToggle: '',
    navcontent: 'bg-gray-200 shadow-xl',
  };

  const openState: State = {
    header: 'bg-white shadow',
    navaction: 'text-white gradient',
    toToggle: 'text-gray-800',
    navcontent: 'bg-white',
  };

  const [headerStyle, setHeaderStyle] = useState(closedState);

  // Track if scrolled or not for header colors
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onScroll = (e) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const currentScrolled = e.target.documentElement.scrollTop > isScrolled;
      if (isScrolled !== currentScrolled) {
        setIsScrolled(currentScrolled);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolled]);

  // change menu style when scrolled
  useEffect(() => {
    let shouldBeClasses = closedState;

    if (isScrolled) {
      shouldBeClasses = openState;
    } else {
      if (showMenu) {
        shouldBeClasses = topOpenState;
      }
    }

    if (JSON.stringify(shouldBeClasses) === JSON.stringify(headerStyle)) return;

    setHeaderStyle(shouldBeClasses);
    // eslint-disable-next-line
  }, [isScrolled, showMenu]);

  return (
    <nav id="header" className={`fixed top-0 z-30 w-full text-white ${headerStyle.header}`}>
      <div className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between py-2">
        <div className="flex items-center pl-4">
          <Link
            href={getRouteById('Index').path}
            data-testid="brand"
            className={`toggleColour text-2xl font-bold no-underline hover:no-underline lg:text-4xl ${headerStyle.toToggle}`}
          >
            {/*
                        <svg className="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
                            <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502" transform="matrix(1,0,0,1,0,0)" />
                            <path className="plane-take-off" d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "/>
                        </svg>
                         */}
            {props.companyName}
          </Link>
        </div>

        <div className="block pr-4 lg:hidden">
          <button
            onClick={() => setShowMenu(!showMenu)}
            id="nav-toggle"
            className="flex items-center p-1 text-orange-800 hover:text-gray-900"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={`z-20 mt-2 w-full flex-grow p-4 text-black lg:mt-0 lg:block lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:p-0 ${
            headerStyle.navcontent
          } ${showMenu ? '' : 'hidden'}`}
          id="nav-content"
        >
          <ul className="list-reset flex-1 items-center justify-end lg:flex">
            <li className="mr-3">
              <ProfileButtons />
            </li>
            <li className="mr-3">
              <AuthButtons headerStyle={headerStyle} />
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-0 border-b border-gray-100 py-0 opacity-25" />
    </nav>
  );
};

export default Header;
