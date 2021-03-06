
import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './index.css'
import {setupI18n} from "./i18n/i18nTools";
import {initializeAuth} from "./auth";
import {VueI18n} from "vue-i18n";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {Vue} from "vue-class-component";


const i18n:VueI18n = setupI18n()
initializeAuth(router)

//@ts-ignore
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(i18n).use(router).use(store).mount('#app')


