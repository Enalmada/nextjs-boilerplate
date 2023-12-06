// https://dev.to/thejaredwilcurt/improving-vitest-performance-42c6#:~:text=Turning%20isolation%20off%20(%20%2D%2Dno,cause%20issues%20in%20watch%20mode.
import path from 'path';
import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Graphql is loaded twice and this seems to fix it
    // https://github.com/vitejs/vite/issues/7879
    // https://github.com/vitest-dev/vitest/issues/2806#issuecomment-1474468560
    server: {
      deps: {
        inline: [/^(?!.*vitest).*$/],
      },
    },
    exclude: [...configDefaults.exclude, 'src/e2e/*'],
    watch: false,
    globals: true,
    environmentMatchGlobs: [
      ['src/app/**/api/**', 'node'],
      ['src/(app|client)/**', 'happy-dom'],
      ['src/server/**', 'node'],
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
