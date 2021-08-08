import {Namespaces} from "@/store/namespaces";
import {createRouter, createWebHashHistory, createWebHistory, Router} from 'vue-router'
import store from "@/store";
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Dashboard from '@/components/Dashboad.vue'
import UserHome from '@/components/dashboard/UserHome.vue'
import TokenManager from '@/components/dashboard/tokens/TokenManager.vue'
import BotManager from '@/components/dashboard/bots/BotManager.vue'
import {UserGetters} from "@/store/modules/user/type";
import {JWT_TOKEN_KEY} from "@/constants";
import {retrieveCurrentUser} from "@/auth";

export enum Routes {
    HOME= "/",
    LOGIN="/login",
    DASHBOARD="/dashboard",
}

export enum DashboardRoutes {
    WELCOME = '',
    TOKEN_MANAGER = 'token',
    BOT_MANAGER = 'bot',

}

export function dashboardRoute(child:DashboardRoutes):string {
    if (child == DashboardRoutes.WELCOME) {
        return Routes.DASHBOARD;
    }
    return Routes.DASHBOARD+"/"+child;
}

declare module 'vue-router' {
    interface RouteMeta {
        // must be declared by every route
        requiresAuth: boolean
    }
}


const routes = [
    { path:'/index.html', redirect:'/'},
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
        meta: {requiresAuth: true},
        children: [
            {
                path: DashboardRoutes.WELCOME,
                component: UserHome
            },
            {
                path: 'token',
                component: TokenManager
            },
            {
                path: DashboardRoutes.BOT_MANAGER,
                component: BotManager
            }
        ],

    },
]

const router:Router = createRouter({
    history: createWebHashHistory("/front/"),
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
