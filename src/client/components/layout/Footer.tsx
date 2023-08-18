import { Link } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';
import { config } from '@/metadata.config';

const formEnabled = false;

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h4 className="font-semibold text-gray-100">{children}</h4>;
};

const ListItem = ({ children, route }: { children: React.ReactNode; route: string }) => {
  return (
    <p>
      <Link className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200" href={route}>
        {children}
      </Link>
    </p>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black">
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-full lg:col-span-1">
            <a className="flex-none text-xl font-semibold text-white" href="#" aria-label="Brand">
              {config.applicationName}
            </a>
          </div>

          <div className="col-span-1">
            <Title>Product</Title>

            <div className="mt-3 grid space-y-3">
              <ListItem route={getRouteById('FAQ').path}>FAQ</ListItem>
              <ListItem route={getRouteById('Pricing').path}>Pricing</ListItem>
            </div>
          </div>

          <div className="col-span-1">
            <Title>Company</Title>

            <div className="mt-3 grid space-y-3">
              <ListItem route={getRouteById('About').path}>About</ListItem>
              <ListItem route={getRouteById('Blog').path}>Blog</ListItem>
              <ListItem route={getRouteById('Contact').path}>Contact Us</ListItem>
            </div>
          </div>

          <div className="col-span-1">
            <Title>Legal</Title>

            <div className="mt-3 grid space-y-3">
              <ListItem route={getRouteById('Terms').path}>Terms and Conditions</ListItem>
              <ListItem route={getRouteById('Privacy').path}>Privacy Policy</ListItem>
            </div>
          </div>

          {formEnabled && (
            <div className="col-span-2">
              <h4 className="font-semibold text-gray-100">Stay up to date</h4>

              <form>
                <div className="mt-4 flex flex-col items-center gap-2 rounded-md bg-white p-2 sm:flex-row sm:gap-3">
                  <div className="w-full">
                    <label htmlFor="hero-input" className="sr-only">
                      Search
                    </label>
                    <input
                      type="text"
                      id="hero-input"
                      name="hero-input"
                      className="block w-full rounded-md border-transparent px-4 py-3 shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <a
                    className="inline-flex w-full items-center justify-center gap-x-3 whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white sm:w-auto"
                    href="#"
                  >
                    Subscribe
                  </a>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  New UI kits or big discounts. Never spam.
                </p>
              </form>
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-y-2 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-y-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">© 2023 Todo. All rights reserved.</p>
          </div>

          <div>
            <Link
              isExternal
              className="inline-flex h-10 w-10 items-center justify-center gap-x-3.5 rounded-md text-center text-gray-200 transition hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              href="https://www.facebook.com/"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </Link>

            <Link
              isExternal
              className="inline-flex h-10 w-10 items-center justify-center gap-x-3.5 rounded-md text-center text-gray-200 transition hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              href="https://twitter.com"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
