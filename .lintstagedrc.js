// https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
// https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js

const tsc = () => "bun --bun tsc --noEmit";

export default {
	"**/*.{ts,tsx}": [tsc],
	"**/*.{js,jsx,ts,tsx,json,yaml,yml,md,css,scss}": () =>
		"biome check --fix --unsafe",
	"src/server/db/schema.ts": () => "bun drizzle:generate",
	// 'package.json': ['npm pkg fix', 'fixpack'],
};
