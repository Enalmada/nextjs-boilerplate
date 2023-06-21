import Link from "next/link";
import React, { type FC, useEffect, useState } from "react";

import { getRouteById } from "@/utils/routes";

// import { useAuth } from "../../utils/auth/auth";


interface Props {
    companyName: string;
}

type State = {
    header: string,
    navaction: string,
    toToggle: string,
    navcontent: string
}

const Header: FC<Props> = (props) => {
    // const { user } = useAuth();
    const user = "Default"

    const [showMenu, setShowMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const closedState: State = {
        header: "",
        navaction: "bg-white text-gray-800",
        toToggle: "text-white",
        navcontent: "bg-gray-200"
    };

    const topOpenState: State = {
        header: "",
        navaction: "bg-white text-gray-800",
        toToggle: "",
        navcontent: "bg-gray-200 shadow-xl"
    };

    const openState: State = {
        header: "bg-white shadow",
        navaction: "text-white gradient",
        toToggle: "text-gray-800",
        navcontent: "bg-white"
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
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
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

    const active = false;
    return (
        <nav id="header" className={`fixed w-full z-30 top-0 text-white ${headerStyle.header}`}>
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="pl-4 flex items-center">
                    <Link href={getRouteById("Index").path} data-testid="brand"
                          className={`toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-4xl ${headerStyle.toToggle}`}>

                            {/*
                        <svg className="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
                            <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502" transform="matrix(1,0,0,1,0,0)" />
                            <path className="plane-take-off" d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "/>
                        </svg>
                         */}
                            {props.companyName}

                    </Link>
                </div>

                <div className="block lg:hidden pr-4">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        id="nav-toggle"
                        className="flex items-center p-1 text-orange-800 hover:text-gray-900">
                        <svg
                            className="fill-current h-6 w-6"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>

                <div
                    className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20 ${
                        headerStyle.navcontent
                    } ${showMenu ? "" : "hidden"}`}
                    id="nav-content">
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        <li className="mr-3">
                            <Link href={getRouteById("About").path} className={`inline-block py-2 px-4 text-black no-underline ${active ? "font-bold no-underline" : "hover:text-gray-800 hover:text-underline"}`}>

                                    About

                            </Link>
                        </li>
                        <li className="mr-3">
                            <Link legacyBehavior href={getRouteById("Home").path}>
                                <button
                                    id="navAction"
                                    className={`mx-auto lg:mx-0 hover:underline font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 ${headerStyle.navaction}`}>
                                    {user ? "App" : "Login"}
                                </button>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>

            <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
        </nav>
    );
};

export default Header;
