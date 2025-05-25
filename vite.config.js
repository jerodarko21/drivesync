import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        cart: resolve(__dirname, 'cart.html'),
        payment: resolve(__dirname, 'Payment.html'),
        privpol: resolve(__dirname, 'PrivPol.html'),
        dpp: resolve(__dirname, 'DPP.html')
      }
    }
  }
});