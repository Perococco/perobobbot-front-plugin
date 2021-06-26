import {createRouter, createWebHistory, Router} from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Secured from '../components/Secured.vue'
import store, {Namespaces} from "../store";
import {UserGetters} from "../store/modules/user/type";
import {JWT_TOKEN_KEY} from "../constants";
import {retrieveCurrentUser} from "../auth";

declare module 'vue-router' {
    interface RouteMeta {
        // must be declared by every route
        requiresAuth: boolean
    }
}


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {requiresAuth: false}
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {requiresAuth: false}
    },
    {
        path: '/secured',
        name: 'Secured',
        component: Secured,
        meta: {requiresAuth: true}
    },
]

const router:Router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth) {
        let authenticated = store.getters[Namespaces.USER+"/"+UserGetters.AUTHENTICATED];
        if (!authenticated) {
            const jwt = sessionStorage.getItem(JWT_TOKEN_KEY);
            if (jwt != null) {
                authenticated = await retrieveCurrentUser();
            }
        }
        if (!authenticated) {
            return "/login";
        }


    }
})

export default router
