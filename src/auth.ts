import {Namespaces} from "@/store/namespaces";
import axios, {AxiosResponse} from 'axios'
import {JWT_TOKEN_KEY} from '@/constants'
import {SecurityController} from '@/api/rest-controller'
import {JwtInfo} from '@/api/security-com'
import store from '@/store'
import {UserActions} from '@/store/modules/user/type'
import {Router} from 'vue-router'
import {Routes} from "@/router";

interface Context {
    internalCall: boolean;
}

const securityController = new SecurityController()
const context: Context = {internalCall: false};

function persistJwtToken(jwt: JwtInfo, rememberMe: boolean) {
    sessionStorage.setItem(JWT_TOKEN_KEY, jwt.token)

    if (rememberMe) {
        localStorage.setItem(JWT_TOKEN_KEY, jwt.token)
    } else {
        localStorage.removeItem(JWT_TOKEN_KEY)
    }
}

function setupAxiosHeader() {
    axios.interceptors.request.use((config) => {
        const token = sessionStorage.getItem(JWT_TOKEN_KEY)
        if (token !== undefined) {
            config.headers.Authorization = 'bearer ' + token
        }
        return config
    })
}

function setupAxios403(router: Router) {
    axios.interceptors.response.use(
        (resp) => resp,
        (error) => {
            if (context.internalCall) {
                throw error;
            }
            context.internalCall = true;
            rejectedOnFailedAuthentication(error.response)
                .then(authFailed => {
                        if (authFailed) {
                            return clearAllAuthenticationInformation().then((_) => router.push(Routes.LOGIN))
                        }
                    }
                ).finally(() => {
                    context.internalCall = false
                }
            )
            throw error
        }
    )
}

function rejectedOnFailedAuthentication(response: AxiosResponse): Promise<boolean> {
    if (response.status != 403) {
        return Promise.resolve(false)
    }
    return securityController.getCurrentUser()
        .then(u => false)
        .catch(e => true);
}

function initializeAuth(router: Router) {
    setupAxiosHeader()
    setupAxios403(router)
    copyLocalToSessionStorage()
}

function clearAllJwtTokens() {
    sessionStorage.removeItem(JWT_TOKEN_KEY)
    localStorage.removeItem(JWT_TOKEN_KEY)
}

async function retrieveCurrentUser(): Promise<boolean> {
    if (jwtIsPresentInSessionStorage()) {
        return securityController.getCurrentUser().then(
            async (user) => {
                await store.dispatch(
                    Namespaces.USER + '/' + UserActions.SET_USER,
                    user
                )
                return Promise.resolve(true)
            },
            async (reason) => {
                await clearAllAuthenticationInformation()
                return Promise.resolve(false)
            }
        )
    }
    return Promise.resolve(false)
}

async function clearAllAuthenticationInformation() {
    clearAllJwtTokens()
    return store.dispatch(
        Namespaces.USER + '/' + UserActions.CLEAR_AUTHENTICATION
    )
}

function jwtIsPresentInSessionStorage() {
    return sessionStorage.getItem(JWT_TOKEN_KEY) != null
}

function copyLocalToSessionStorage() {
    const localJwt = localStorage.getItem(JWT_TOKEN_KEY)
    const sessionJwt = sessionStorage.getItem(JWT_TOKEN_KEY)
    if (sessionJwt == null && localJwt != null) {
        sessionStorage.setItem(JWT_TOKEN_KEY, localJwt)
    }
}

export {initializeAuth, persistJwtToken, retrieveCurrentUser, clearAllAuthenticationInformation}
