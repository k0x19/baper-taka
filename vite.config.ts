import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Local dev/preview servers are proxied through the Arena preview host.
  server: {
    host: '0.0.0.0',
    allowedHosts: ['localhost', '.e2b.app'],
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['localhost', '.e2b.app'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}', 'src/**/*.{test,spec}.{ts,tsx}'],
    restoreMocks: true,
  },
});
