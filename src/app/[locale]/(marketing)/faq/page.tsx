export const metadata = {
  title: 'FAQ',
};

export default function Page() {
  return (
    <>
      <div className="min-h-sceen mx-auto max-w-screen-xl bg-white px-5">
        <div className="flex flex-col items-center">
          <h2 className="mt-5 text-5xl font-bold tracking-tight">FAQ</h2>
          <p className="mt-3 text-xl text-neutral-500">Frequently asked questions</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
          <div className="py-5">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                <span> What is a SAAS platform?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="group-open:animate-fadeIn mt-3 text-neutral-600">
                SAAS platform is a cloud-based software service that allows users to access and use
                a variety of tools and functionality.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
