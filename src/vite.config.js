// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        music: resolve(__dirname, 'music.html'), 
        visuals: resolve(__dirname, 'visuals.html'),
        about: resolve(__dirname, 'about.html'),
        mixing: resolve(__dirname, 'mix-master.html'),
      },
    },
  },
});