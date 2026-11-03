import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base = nome del repo, così funziona su GitHub Pages (tisaaaaa.github.io/bloom-shop)
export default defineConfig({
  plugins: [react()],
  base: '/bloom-shop/',
});
