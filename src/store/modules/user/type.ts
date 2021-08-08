import {SimpleUser} from "../../../api/security-com";
import {ActionContext} from "vuex";
import RootState from "../../root-state";

export interface AuthenticationParameters  {
    login:string,
    password:string,
    rememberMe:boolean
}

export enum UserGetters {
    USER= 'user',
    ADMIN= 'admin',
    LOGIN= 'login',
    AUTHENTICATED= 'authenticated',
}

export enum UserMutations {
    SET_USER= 'SET_USER',
    CLEAR_USER= 'CLEAR_USER',
}

export enum UserActions {
    PERFORM_AUTHENTICATION_WITH_PASSWORD = 'performAuthenticationWithPassword',
    PERFORM_AUTHENTICATION_WITH_OPENID = 'performAuthenticationWithOpenId',
    SET_USER= 'setUser',
    CLEAR_AUTHENTICATION= 'clearAuthentication',
}

export interface UserState {
    user:SimpleUser | undefined
}


export type UserContext = ActionContext<UserState, RootState>;
