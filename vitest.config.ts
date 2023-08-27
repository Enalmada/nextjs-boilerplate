// https://dev.to/thejaredwilcurt/improving-vitest-performance-42c6#:~:text=Turning%20isolation%20off%20(%20%2D%2Dno,cause%20issues%20in%20watch%20mode.
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    watch: false,
    // globals: true, //     "types": ["vitest/globals"]
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
