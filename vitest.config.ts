import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text'],
            reportsDirectory: './coverage',
            all: true,
            include: ['src/**/*.{js,ts,tsx}'],
            exclude: ['node_modules/', 'test/'],
        },
    },
    resolve: {
        alias: {
            features: path.resolve(__dirname, 'src/features'),
            shared: path.resolve(__dirname, 'src/shared'),
            entities: path.resolve(__dirname, 'src/entities'),
            widgets: path.resolve(__dirname, 'src/widgets'),
            pages: path.resolve(__dirname, 'src/pages'),
            app: path.resolve(__dirname, 'src/app'),
            assets: path.resolve(__dirname, 'src/assets'),
        }
    },
})
