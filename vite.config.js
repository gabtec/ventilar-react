import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    setupFiles: 'setupTest.js',
  },
});
