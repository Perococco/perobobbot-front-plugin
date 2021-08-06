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
    build: {
        outDir: 'target/classes/dashboard-vue/public'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname,"./src")
        }
    }
})
