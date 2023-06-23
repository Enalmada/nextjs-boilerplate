/*
    Rough default page structure for consumer pages
 */
// TODO: do margin top here tailwind style
// TODO: text-black should be something more thought out

import { type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Page = (props: Props) => {
  return (
    <>
      <section className="page-class border-b bg-white py-8 text-black">
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
