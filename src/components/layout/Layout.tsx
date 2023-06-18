import { type PropsWithChildren } from "react";

import Footer from "./Footer";
import Header from "./Header";

interface Props {
    title?: string;
    description?: string;
    transparent?: boolean;
    empty?: boolean;
    noindex?: boolean;
}

//  <NextSeo title={props.title} description={props.description} noindex={props.noindex} />

const companyName = "Technical Challenge";

const Layout = (props: PropsWithChildren<Props>) => {
    return (
        <>
            {!props.empty && <Header companyName={companyName} />}
            <main className={"flex-grow"}>{props.children}</main>
            {!props.empty && <Footer companyName={companyName} />}
        </>
    );
};

export default Layout;
