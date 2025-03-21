import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
      allowedHosts: ['candidate-search-app-f8ny.onrender.com'], // Add this host to allowed hosts
  },
});
