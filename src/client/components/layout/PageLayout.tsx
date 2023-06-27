// TODO: text-black should be something more thought out
import Layout from "@/client/components/layout/Layout";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout(props: Props) {
  return (
    <Layout>
      <section className="page-class border-b bg-white py-8 text-black">
        <div className="container mx-auto px-4">{props.children}</div>
      </section>
    </Layout>
  );
}
