import { Module } from 'vuex'
import { TokenMutations } from '@/store/modules/tokens/type'
import RootState from '@/store/root-state'
import { CreateBotParameters } from '@/api/rest-com'
import {
    BotActions,
    BotContext,
    BotGetters,
    BotMutations,
    BotState,
} from '@/store/modules/bots/type'
import { Bot } from '@/api/perobobbot-lang'
import { BotController } from '@/api/rest-controller'

const botController = new BotController()

const BotsModule: Module<BotState, RootState> = {
    namespaced: true,
    state: () => ({
        bots: [],
    }),
    getters: {
        [BotGetters.BOTS]: (state): Bot[] => state.bots,
    },
    mutations: {
        [BotMutations.SET_BOTS](state, bots: Bot[]) {
            state.bots = bots
        },
        [BotMutations.CLEAR_BOTS](state) {
            state.bots = []
        },
        [BotMutations.ADD_BOT](state,bot: Bot) {
            state.bots = [... state.bots,bot]
        },
        [BotMutations.UPDATE_BOTS](state, bot: Bot) {
            state.bots = state.bots.map((b) => (b.id == bot.id ? bot : b))
        },
        [BotMutations.DELETE_BOT](state, botId: string) {
            state.bots = state.bots.filter((v) => v.id != botId)
        },
    },
    actions: {
        async [BotActions.REFRESH_BOTS](context: BotContext): Promise<void> {
            try {
                const bots = await botController.listBots()
                context.commit(BotMutations.SET_BOTS, bots)
            } catch (error) {
                console.error(error)
                context.commit(TokenMutations.CLEAR_TOKENS)
            }
        },
        async [BotActions.UPDATE_BOT](context: BotContext, tokenId: string): Promise<void> {
            try {
                throw new Error("Not implemented yet")
            } catch (error) {
                console.error(error)
            }
        },
        async [BotActions.DELETE_BOT](context: BotContext, botId: string): Promise<void> {
            try {
                await botController.deleteBot(botId)
                context.commit(BotMutations.DELETE_BOT, botId)
            } catch (error) {
                console.error(error)
            }
        },
        async [BotActions.CREATE_BOT](context: BotContext, parameters:CreateBotParameters): Promise<Bot> {
            try {
                const bot = await botController.createBot(parameters);
                context.commit(BotMutations.ADD_BOT,bot);
                return bot;
            } catch (error) {
                console.error(error)
            }
        },
    },
}

export default BotsModule

