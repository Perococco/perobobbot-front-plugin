import {RestUserToken} from "@/api/rest-com";
import {ActionContext} from "vuex";
import RootState from "@/store/root-state";

export interface TokenState {
    tokens:RestUserToken[];
}

export enum TokenGetters {
    TOKENS="tokens",
}

export enum TokenMutations {
    SET_TOKENS="SET_TOKENS",
    CLEAR_TOKENS="CLEAR_TOKENS",
    UPDATE_TOKEN="UPDATE_TOKEN",
    REMOVE_TOKEN="REMOVE_TOKEN",
}

export enum TokenActions {
    CREATE_TOKEN="createToken",
    REFRESH_TOKENS="refreshTokens",
    UPDATE_TOKEN="updateToken",
    DELETE_TOKEN="deleteToken",
}

export type TokenContext = ActionContext<TokenState, RootState>
