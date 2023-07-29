import Image from 'next/image';
import Link from 'next/link';
import NextLink from 'next/link';
import { Button } from '@/client/ui/Button';
import { getRouteById } from '@/client/utils/routes';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      {/* <Users /> */}
      {/* <Pricing /> */}
      <CallToAction />
    </>
  );
}

const Hero = () => {
  return (
    <>
      <div>
        <div className="container mx-auto flex flex-col flex-wrap items-center px-3 md:flex-row">
          <div className="flex w-full flex-col items-start justify-center text-center md:w-2/5 md:text-left">
            <p className="tracking-loose w-full uppercase">Simple ToDo App</p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              We keep track of your todos so you don&apos;t have to
            </h1>
            <p className="mb-8 text-2xl leading-normal">
              Everyone loves a simple todo app exercise.
            </p>

            <Button
              as={NextLink}
              href={getRouteById('Home').path}
              hoverIndication={false}
              radius="full"
              color="default"
              size="lg"
              className={
                'mx-auto my-6 rounded-full bg-white bg-gradient-to-tr from-pink-500 to-yellow-500 px-8 py-4  font-bold text-gray-800 text-white lg:mx-0'
              }
            >
              Try For Free
            </Button>
          </div>

          <div className="mb-10 w-full py-6 text-center md:mb-0 md:w-3/5">
            {/*
                        <Image
                            priority
                            width={603}
                            height={333}
                            alt={""}
                            className="w-full md:w-4/5 z-0"
                            src="/images/home/undraw_To_do_list_re_9nt7.svg"
                            loader={imageLoader}
                        />
                        */}
            <Image
              width={603}
              height={333}
              alt={''}
              priority
              className="z-0 w-full md:w-4/5"
              src="/images/home/undraw_To_do_list_re_9nt7.svg"
            />
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24" style={{ zIndex: -1000 }}>
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
};

const Features = () => {
  return (
    <section className="border-b py-8">
      <div className="container m-8 mx-auto max-w-5xl">
        <div className="my-2 w-full text-center text-5xl font-bold leading-tight text-gray-800 dark:text-white">
          Features
        </div>
        <div className="mb-4 w-full">
          <div className="gradient mx-auto my-0 h-1 w-64 rounded-t py-0 opacity-25"></div>
        </div>

        <Feature
          isLeftImg={true}
          h3Text={'Secure Login'}
          pText={
            'Username & password registration so only authorized users can access the task manager.'
          }
          imgSrc={'/images/home/undraw_secure_login_pdn4.svg'}
        />

        <Feature
          isLeftImg={false}
          h3Text={'Create a task'}
          pText={'Keep track of anything you want'}
          imgSrc={'/images/home/undraw_task_31wc.svg'}
        />

        <Feature
          isLeftImg={true}
          h3Text={'See all tasks'}
          pText={'Look at everything in your list'}
          imgSrc={'/images/home/undraw_task_list_6x9d.svg'}
        />

        <Feature
          isLeftImg={false}
          h3Text={'View Details'}
          pText={'View details of a single task in a details view'}
          imgSrc={'/images/home/undraw_Checklist__re_2w7v.svg'}
        />

        <Feature
          isLeftImg={true}
          h3Text={'Delete a task'}
          pText={'Keep your list clean'}
          imgSrc={'/images/home/undraw_Throw_away_re_x60k.svg'}
        />
      </div>
    </section>
  );
};

interface FeatureProps {
  isLeftImg: boolean;
  h3Text: string;
  pText: string;
  imgSrc: string;
}

const Feature = ({ isLeftImg, h3Text, pText, imgSrc }: FeatureProps) => {
  if (isLeftImg) {
    return (
      <div className="flex flex-wrap">
        <div className="flex w-5/6 items-center p-6 sm:w-1/2">
          <div className="align-middle">
            <h2 className="mb-3 text-3xl font-bold leading-none text-gray-800 dark:text-white">
              {h3Text}
            </h2>
            <p className="mb-8 text-gray-700 dark:text-white">{pText}</p>
          </div>
        </div>
        <div className="w-full p-6 sm:w-1/2">
          {/* <Image alt="" src={imgSrc} unsized /> */}
          <Image alt="" src={imgSrc} style={{ objectFit: 'contain' }} width={521} height={146} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse flex-wrap sm:flex-row">
      <div className="mt-6 w-full p-6 sm:w-1/2">
        {/* <Image alt="" src={imgSrc} unsized /> */}
        <Image alt="" src={imgSrc} style={{ objectFit: 'contain' }} width={521} height={146} />
      </div>
      <div className="mt-6 flex w-full items-center p-6 sm:w-1/2">
        <div className="align-middle">
          <h3 className="mb-3 text-3xl font-bold leading-none text-gray-800 dark:text-white">
            {h3Text}
          </h3>
          <p className="mb-8 text-gray-700 dark:text-white">{pText}</p>
        </div>
      </div>
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Users = () => {
  return (
    <section className="border-b py-8">
      <div className="container mx-auto flex flex-wrap pb-12 pt-4">
        <div className="my-2 w-full text-center text-5xl font-bold leading-tight text-gray-800 dark:text-white">
          Title
        </div>
        <div className="mb-4 w-full">
          <div className="gradient mx-auto my-0 h-1 w-64 rounded-t py-0 opacity-25"></div>
        </div>

        <div className="flex w-full flex-shrink flex-grow flex-col p-6 md:w-1/3">
          <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-white shadow">
            <Link href={getRouteById('Home').path}>
              <a className="flex flex-wrap no-underline hover:no-underline">
                <p className="w-full px-6 text-xs text-gray-600 md:text-sm">GETTING STARTED</p>
                <div className="w-full px-6 text-xl font-bold text-gray-800 dark:text-white">
                  Lorem ipsum dolor sit amet.
                </div>
                <p className="mb-5 px-6 text-base text-gray-800">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc
                  commodo posuere et sit amet ligula.
                </p>
              </a>
            </Link>
          </div>
          <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none bg-white p-6 shadow">
            <div className="flex items-center justify-start">
              <button className="gradient mx-auto my-6 rounded-full px-8 py-4 font-bold text-white shadow-lg hover:underline lg:mx-0">
                Action
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-shrink flex-grow flex-col p-6 md:w-1/3">
          <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-white shadow">
            <Link href={getRouteById('Home').path}>
              <a className="flex flex-wrap no-underline hover:no-underline">
                <p className="w-full px-6 text-xs text-gray-600 md:text-sm">GETTING STARTED</p>
                <div className="w-full px-6 text-xl font-bold text-gray-800">
                  Lorem ipsum dolor sit amet.
                </div>
                <p className="mb-5 px-6 text-base text-gray-800">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc
                  commodo posuere et sit amet ligula.
                </p>
              </a>
            </Link>
          </div>
          <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none bg-white p-6 shadow">
            <div className="flex items-center justify-center">
              <button className="gradient mx-auto my-6 rounded-full px-8 py-4 font-bold text-white shadow-lg hover:underline lg:mx-0">
                Action
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-shrink flex-grow flex-col p-6 md:w-1/3">
          <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-white shadow">
            <Link href={getRouteById('Home').path}>
              <a className="flex flex-wrap no-underline hover:no-underline">
                <p className="w-full px-6 text-xs text-gray-600 md:text-sm">GETTING STARTED</p>
                <div className="w-full px-6 text-xl font-bold text-gray-800">
                  Lorem ipsum dolor sit amet.
                </div>
                <p className="mb-5 px-6 text-base text-gray-800">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc
                  commodo posuere et sit amet ligula.
                </p>
              </a>
            </Link>
          </div>
          <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none bg-white p-6 shadow">
            <div className="flex items-center justify-end">
              <button className="gradient mx-auto my-6 rounded-full px-8 py-4 font-bold text-white shadow-lg hover:underline lg:mx-0">
                Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Pricing = () => {
  return (
    <>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-2 pb-12 pt-4 text-gray-800">
          <h1 className="my-2 w-full text-center text-5xl font-bold leading-tight text-gray-800">
            Pricing
          </h1>
          <div className="mb-4 w-full">
            <div className="gradient mx-auto my-0 h-1 w-64 rounded-t py-0 opacity-25"></div>
          </div>

          <div className="my-12 flex flex-col justify-center pt-12 sm:my-4 sm:flex-row">
            <div className="mx-auto mt-4 flex w-5/6 flex-col rounded-none bg-white lg:mx-0 lg:w-1/4 lg:rounded-l-lg">
              <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-white text-gray-600 shadow">
                <div className="border-b-4 p-8 text-center text-3xl font-bold">Free</div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                </ul>
              </div>
              <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none bg-white p-6 shadow">
                <div className="w-full pt-6 text-center text-3xl font-bold text-gray-600">
                  £0 <span className="text-base">for one user</span>
                </div>
                <div className="flex items-center justify-center">
                  <button className="gradient mx-auto my-6 rounded-full px-8 py-4 font-bold text-white shadow-lg hover:underline lg:mx-0">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>

            <div className="z-10 mx-auto mt-4 flex w-5/6 flex-col rounded-lg bg-white shadow-lg sm:-mt-6 lg:mx-0 lg:w-1/3">
              <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-white shadow">
                <div className="w-full p-8 text-center text-3xl font-bold">Basic</div>
                <div className="gradient my-0 h-1 w-full rounded-t py-0"></div>
                <ul className="w-full text-center text-base font-bold">
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                </ul>
              </div>
              <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none bg-white p-6 shadow">
                <div className="w-full pt-6 text-center text-4xl font-bold">
                  £x.99 <span className="text-base">/ per user</span>
                </div>
                <div className="flex items-center justify-center">
                  <button className="gradient mx-auto my-6 rounded-full px-8 py-4 font-bold text-white shadow-lg hover:underline lg:mx-0">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-4 flex w-5/6 flex-col rounded-none bg-white lg:mx-0 lg:w-1/4 lg:rounded-l-lg">
              <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-white text-gray-600 shadow">
                <div className="border-b-4 p-8 text-center text-3xl font-bold">Pro</div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                </ul>
              </div>
              <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none bg-white p-6 shadow">
                <div className="w-full pt-6 text-center text-3xl font-bold text-gray-600">
                  £x.99 <span className="text-base">/ per user</span>
                </div>
                <div className="flex items-center justify-center">
                  <button className="gradient mx-auto my-6 rounded-full px-8 py-4 font-bold text-white shadow-lg hover:underline lg:mx-0">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <svg
        className="wave-top"
        viewBox="0 0 1439 147"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
            <g className="wave" fill="#f8fafc">
              <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  opacity="0.200000003"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

const CallToAction = () => {
  return (
    <>
      <section className="container mx-auto mb-12 py-6 text-center">
        <div className="my-2 w-full text-center text-5xl font-bold leading-tight">
          The best todo program ever
        </div>
        <div className="mb-4 w-full">
          <div className="mx-auto my-0 h-1 w-1/6 rounded-t bg-white py-0 opacity-25"></div>
        </div>

        <div className="my-4 text-3xl leading-tight">See for yourself how easy tasks are</div>

        <Button
          as={NextLink}
          href={getRouteById('Home').path}
          hoverIndication={false}
          radius="full"
          color="default"
          size="lg"
          className={
            'mx-auto my-6 rounded-full bg-white bg-gradient-to-tr from-pink-500 to-yellow-500 px-8 py-4  font-bold text-gray-800 text-white lg:mx-0'
          }
        >
          Try For Free
        </Button>
      </section>
    </>
  );
};
