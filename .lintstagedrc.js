// https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
// https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js
import path from 'path';

const tsc = () => `bun --bun tsc --noEmit`;

const buildEslintCommand = (filenames) =>
  `dotenv -e ./.env.local -e ./.env.development next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildPrettierCommand = (filenames) => `bun prettier --write ${filenames.join(' ')}`;

export default {
  '**/*.{ts,tsx,mjs,cjs}': [buildPrettierCommand, buildEslintCommand, tsc],
  'src/server/db/schema.ts': 'bun drizzle:generate',
  'package.json': ['npm pkg fix', 'fixpack'],
};
