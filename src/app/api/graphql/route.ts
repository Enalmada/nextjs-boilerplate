import { makeYoga } from '@/server/graphql/yoga';

// export const runtime = 'edge';

const { handleRequest } = makeYoga('/api/graphql');

export { handleRequest as GET, handleRequest as POST };
