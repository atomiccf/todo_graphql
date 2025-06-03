import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
      react(),
  ],
  css: {
        postcss: {
            plugins: [
                tailwindcss,
                autoprefixer,
            ],
        },
    },
  resolve: {
        alias: {
            'assets': path.resolve(__dirname, './src/assets'),
            'shared': path.resolve(__dirname, './src/shared'),
            'entities': path.resolve(__dirname, './src/entities'),
            'features': path.resolve(__dirname, './src/features'),
            'widgets': path.resolve(__dirname, './src/widgets'),
            'pages': path.resolve(__dirname, './src/pages'),
            'app': path.resolve(__dirname, './src/app'),
        }
    },
    server: {
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin-allow-popups same-origin",
            "Cross-Origin-Embedder-Policy": "same-origin"
        },
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
})
