


Must add the following to your tailwind content section so css isn't purged:
`'./node_modules/nextui-admin/dist/**/*.{js,ts,jsx,tsx}',`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/nextui-admin/dist/**/*.{js,ts,jsx,tsx}',
  ],
  ...
```