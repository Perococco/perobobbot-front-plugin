import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'https://femtoparsec.net/bot',
                changeOrigin: true,
                secure: true,
            },
            '/events': {
                target: 'https://femtoparsec.net/bot',
                changeOrigin: true,
                secure: true,
            }
        }
    },
    base: process.env.NODE_ENV === 'production' ?'./':'/',
    build: {
        outDir: 'target/classes/dashboard-vue/public',
        assetsDir: "./assets"
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname,"./src")
        }
    }
})
