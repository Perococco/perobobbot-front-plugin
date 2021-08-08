import {Module} from 'vuex'
import {
    TokenActions,
    TokenContext,
    TokenGetters,
    TokenMutations,
    TokenState,
} from '@/store/modules/tokens/type'
import RootState from '@/store/root-state'
import {OAuthProcessParameter, RestUserToken} from '@/api/rest-com'
import {TokenController} from '@/api/rest-controller'
import {openOauthUrl, openOauthUrlWithParam} from "@/utils/oauth_opener";

const tokenController: TokenController = new TokenController()

const TokensModule: Module<TokenState, RootState> = {
    namespaced: true,
    state: () => ({
        tokens: [],
    }),
    getters: {
        [TokenGetters.TOKENS]: (state): RestUserToken[] => state.tokens,
    },
    mutations: {
        [TokenMutations.SET_TOKENS](state, tokens: RestUserToken[]) {
            state.tokens = tokens
        },
        [TokenMutations.CLEAR_TOKENS](state) {
            state.tokens = []
        },
        [TokenMutations.UPDATE_TOKEN](state, token: RestUserToken) {
            state.tokens = state.tokens.map((t) =>
                t.id == token.id ? token : t
            )
        },
        [TokenMutations.REMOVE_TOKEN](state, tokenId: string) {
            state.tokens = state.tokens.filter((v) => v.id != tokenId)
        },
    },
    actions: {
        async [TokenActions.REFRESH_TOKENS](
            context: TokenContext
        ): Promise<void> {
            try {
                const tokens = await tokenController.getUserToken()
                context.commit(TokenMutations.SET_TOKENS, tokens)
            } catch (error) {
                console.error(error)
                context.commit(TokenMutations.CLEAR_TOKENS)
            }
        },
        async [TokenActions.UPDATE_TOKEN](
            context: TokenContext,
            tokenId: string
        ): Promise<void> {
            try {
                const token = await tokenController.refreshUserToken(tokenId)
                context.commit(TokenMutations.UPDATE_TOKEN, token)
            } catch (error) {
                console.error(error)
            }
        },
        async [TokenActions.DELETE_TOKEN](
            context: TokenContext,
            tokenId: string
        ): Promise<void> {
            try {
                await tokenController.deleteUserToken(tokenId)
                context.commit(TokenMutations.REMOVE_TOKEN, tokenId)
            } catch (error) {
                console.error(error)
            }
        },
        async [TokenActions.CREATE_TOKEN](
            context: TokenContext,
            parameter: OAuthProcessParameter
        ): Promise<void> {
            const url = await tokenController.initiateOAuth(parameter)
            openOauthUrlWithParam(url)
                .then(() => {
                    context.dispatch(TokenActions.REFRESH_TOKENS)
                }, err => console.error("TODO: Fail to create token feedback for the user"));
        },
    },
}


export default TokensModule

