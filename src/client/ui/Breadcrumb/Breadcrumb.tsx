import { Link } from '@/client/ui';
import { type Route } from '@/client/utils/routes';

interface Props {
  routes: Route[];
}

// https://tailwindcomponents.com/component/breadcrumbs-1
const Breadcrumb = (props: Props) => {
  const last = props.routes.pop();

  return (
    <nav className="mb-8 font-bold text-black dark:text-white" aria-label="Breadcrumb">
      <ol className="inline-flex list-none p-0">
        {props.routes.map((route) => (
          <li key={route.id} className="flex items-center">
            <Link color="foreground" underline="none" href={route.path}>
              {route.name}
            </Link>
            <svg
              className="mx-3 h-3 w-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
        ))}

        <li>
          <div className="text-gray-500" aria-current="page">
            {last?.name}
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
