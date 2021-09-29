import RootState from '../../root-state'
import { Module } from 'vuex'
import {
    AuthenticationParameters,
    UserActions,
    UserContext,
    UserGetters,
    UserMutations,
    UserState,
} from './type'
import {JwtInfo, RoleKind, SimpleUser} from '../../../api/security-com'
import { SecurityController } from '../../../api/rest-controller'
import { persistJwtToken } from '../../../auth'
import { Optional } from '@/utils/optional'
import {Platform} from "@/api/perobobbot-lang";
import {openOauthUrl, openOauthUrlWithParam} from "@/utils/oauth_opener";

const securityController = new SecurityController()

const UserModule: Module<UserState, RootState> = {
    namespaced: true,
    state: () => ({
        user: undefined,
    }),

    getters: {
        [UserGetters.USER]: (state:UserState): SimpleUser | undefined => state.user,
        [UserGetters.LOGIN]: (state:UserState): string | undefined => state.user?.login,
        [UserGetters.ADMIN]: (state:UserState): boolean  => Optional.ofNullable(state.user).map(isAdmin).orElse(false),
        [UserGetters.AUTHENTICATED]: (state:UserState): boolean => state.user != undefined,
    },

    mutations: {
        [UserMutations.SET_USER](state:UserState, user: SimpleUser) {
            state.user = user
        },
        [UserMutations.CLEAR_USER](state:UserState) {
            state.user = undefined
        },
    },

    actions: {
        [UserActions.CLEAR_AUTHENTICATION](context: UserContext): void {
            context.commit(UserMutations.CLEAR_USER);
        },
        [UserActions.SET_USER](context: UserContext, user:SimpleUser): void {
            context.commit(UserMutations.SET_USER,user)
        },
        async [UserActions.PERFORM_AUTHENTICATION_WITH_PASSWORD](context: UserContext, parameter: AuthenticationParameters): Promise<SimpleUser> {
            return securityController.signIn({login:parameter.login, password:parameter.password})
                .then(jwtToken => handleJwtToken(context,jwtToken,parameter.rememberMe))
        },
        async [UserActions.PERFORM_AUTHENTICATION_WITH_OPENID](context: UserContext, platform:Platform): Promise<SimpleUser> {
            return securityController.oauthWith(platform)
                .then(oauthInfo => openOauthUrlWithParam(oauthInfo.oauth_uri, oauthInfo.sign_in_id))
                .then(id => securityController.getOpenIdUser(id))
                .then(jwtToken => handleJwtToken(context,jwtToken,true))
        }
    },
}

function handleJwtToken(context: UserContext, jwtToken:JwtInfo, rememberMe:boolean): SimpleUser {
    persistJwtToken(jwtToken, rememberMe);
    context.commit(UserMutations.SET_USER, jwtToken.user);
    return jwtToken.user
}

function isAdmin(user:SimpleUser):boolean {
    return user.roles.includes(RoleKind.ADMIN);
}

export default UserModule;

