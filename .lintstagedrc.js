// https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
// https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js
const path = require("path");

const tsc = (filenames) => `pnpm tsc --noEmit`;

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const buildPrettierCommand = (filenames) => `pnpm prettier --write ${filenames.join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildPrettierCommand],
  "**/*.(ts|tsx)": [tsc],
};
