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
    LOGIN= 'login',
    AUTHENTICATED= 'authenticated',
}

export enum UserMutations {
    SET_USER= 'SET_USER',
    CLEAR_USER= 'CLEAR_USER',
}

export enum UserActions {
    PERFORM_AUTHENTICATION = 'performAuthentication',
    SET_USER= 'setUser',
    CLEAR_AUTHENTICATION= 'clearAuthentication',
}

export interface UserState {
    user:SimpleUser | undefined
}


export type UserContext = ActionContext<UserState, RootState>;
