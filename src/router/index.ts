import {createRouter, createWebHistory, Router} from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboad.vue'
import store, {Namespaces} from "../store";
import {UserGetters} from "../store/modules/user/type";
import {JWT_TOKEN_KEY} from "../constants";
import {retrieveCurrentUser} from "../auth";

export enum Routes {
    HOME= "/",
    LOGIN="/login",
    DASHBOARD="/dashboard"
}

declare module 'vue-router' {
    interface RouteMeta {
        // must be declared by every route
        requiresAuth: boolean
    }
}


const routes = [
    {
        path: Routes.HOME,
        name: 'Home',
        component: Home,
        meta: {requiresAuth: false}
    },
    {
        path: Routes.LOGIN,
        name: 'Login',
        component: Login,
        meta: {requiresAuth: false}
    },
    {
        path: Routes.DASHBOARD,
        name: 'Dashboard',
        component: Dashboard,
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
