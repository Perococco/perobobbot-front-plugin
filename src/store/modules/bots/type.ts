import { Bot } from '@/api/perobobbot-lang'
import RootState from "@/store/root-state";
import {ActionContext} from "vuex";

export enum BotGetters {
    BOTS = 'bots',
}

export enum BotMutations {
    SET_BOTS = 'SET_BOTS',
    CLEAR_BOTS = 'CLEAR_BOTS',
    UPDATE_BOTS = 'UPDATE_BOTS',
    DELETE_BOT = 'DELETE_BOT',
    ADD_BOT = 'ADD_BOT',
}

export enum BotActions {
    CREATE_BOT="createBot",
    REFRESH_BOTS="refreshBots",
    UPDATE_BOT="updateBot",
    DELETE_BOT="deleteBot",
}

export interface BotState {
    bots: Bot[]
}

export type BotContext = ActionContext<BotState,RootState>;
