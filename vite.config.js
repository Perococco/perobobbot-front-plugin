import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'https://192.168.42.25:8443',
                changeOrigin: true,
                secure: false,
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
