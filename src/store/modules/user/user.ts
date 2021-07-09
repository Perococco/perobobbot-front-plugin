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
import { RoleKind, SimpleUser } from '../../../api/security-com'
import { SecurityController } from '../../../api/rest-controller'
import { persistJwtToken } from '../../../auth'
import { Optional } from '@/utils/optional'

const securityController = new SecurityController()

const UserModule: Module<UserState, RootState> = {
    namespaced: true,
    state: () => ({
        user: undefined,
    }),

    getters: {
        [UserGetters.USER]: (state): SimpleUser | undefined => state.user,
        [UserGetters.LOGIN]: (state): string | undefined => state.user?.login,
        [UserGetters.ADMIN]: (state): boolean  => Optional.ofNullable(state.user).map(isAdmin).orElse(false),
        [UserGetters.AUTHENTICATED]: (state): boolean => state.user != undefined,
    },

    mutations: {
        [UserMutations.SET_USER](state, user: SimpleUser) {
            state.user = user
        },
        [UserMutations.CLEAR_USER](state) {
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
        async [UserActions.PERFORM_AUTHENTICATION](context: UserContext, parameter: AuthenticationParameters): Promise<SimpleUser> {
            return securityController.signIn({login:parameter.login, password:parameter.password})
                .then(authInfo => {
                    persistJwtToken(authInfo, parameter.rememberMe);
                    context.commit(UserMutations.SET_USER, authInfo.user);
                    return authInfo.user
                })
        }
    },
}

function isAdmin(user:SimpleUser):boolean {
    return user.roles.includes(RoleKind.ADMIN);
}

export default UserModule;

