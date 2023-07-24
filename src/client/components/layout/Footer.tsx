import Link from '@/client/ui/Link';
import { getRouteById } from '@/client/utils/routes';

interface Props {
  companyName: string;
}

const Footer = (props: Props) => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto  px-8">
        <div className="flex w-full flex-col py-6 md:flex-row">
          <div className="mb-6 flex-1">
            <Link
              href={getRouteById('Index').path}
              className="text-2xl font-bold text-orange-600 no-underline hover:no-underline lg:text-4xl"
            >
              {/*
                    <svg className="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
                        <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)" />
                        <path className="plane-take-off" d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "/>
                    </svg>
                     */}
              {props.companyName}
            </Link>
          </div>

          <div className="flex-1">
            <p className="uppercase text-gray-700 md:mb-6">Links</p>
            <ul className="list-reset mb-6">
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <Link
                  href={getRouteById('FAQ').path}
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-700 md:mb-6">Legal</p>
            <ul className="list-reset mb-6">
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <Link
                  href={getRouteById('Terms').path}
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  Terms
                </Link>
              </li>
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <Link
                  href={getRouteById('Privacy').path}
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-700 md:mb-6">Social</p>
            <ul className="list-reset mb-6">
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <a
                  href="facebook.com"
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  Facebook
                </a>
              </li>
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <a
                  href="linkedin.com"
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  Linkedin
                </a>
              </li>
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <a
                  href="twitter.com"
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-700 md:mb-6">Company</p>
            <ul className="list-reset mb-6">
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <Link
                  href={getRouteById('Blog').path}
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <Link
                  href={getRouteById('About').path}
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                <Link
                  href={getRouteById('Contact').path}
                  className="text-gray-800 no-underline hover:text-orange-500 hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
