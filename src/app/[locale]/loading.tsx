// Next.js will automatically use the loading.js to wrap page.js in a <Suspense> boundary.
// https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states
// Having one is necessary to protect against urql queries without any suspense wrapper which will infinite loop.
export default function LoadingLayout() {
    return null;
}
