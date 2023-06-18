import { type FC } from "react";

/*
    Rough default page structure for consumer pages
 */
// TODO: do margin top here tailwind style
// TODO: text-black should be something more thought out
const Page: FC = (props) => {
    return (
        <>
            <section className="bg-white border-b py-8 page-class text-black">
                <div className="container mx-auto px-4">{props.children}</div>
            </section>
            <style jsx>{`
                .page-class {
                    margin-top: 72px;
                }
                @media screen and (max-width: 1023px) {
                    .page-class {
                        margin-top: 52px;
                    }
                }
            `}</style>
        </>
    );
};

export default Page;
