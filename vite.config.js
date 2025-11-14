import {defineConfig} from "vite";
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'main.html'), // main.html 루트로 이동
            }
        }
    },
    server: {
        open: '/main.html',
    }
});