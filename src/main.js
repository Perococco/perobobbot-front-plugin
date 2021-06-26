import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import {setupI18n} from "./i18n/i18nTools";
import {initializeAuth} from "./auth";

const i18n = setupI18n()

initializeAuth(router)


createApp(App).use(i18n).use(router).use(store).mount('#app')


