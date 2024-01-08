// default value as of next 14 doesn't include tailwind
// json causes trouble with storybook.
// js causes issues with next 14
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
