import {createStore} from 'vuex'

import RootState from '@/store/root-state'
import UserModule from "@/store/modules/user/user";
import Parameters from "@/store/modules/parameters/parameters";
import Tokens from "@/store/modules/tokens/tokens";


export enum Namespaces {
    USER = 'user',
    PARAMETERS = 'parameters',
    TOKENS = 'tokens',
}



const store = createStore<RootState>({
    modules: {
        [Namespaces.USER]: UserModule,
        [Namespaces.PARAMETERS]: Parameters,
        [Namespaces.TOKENS]: Tokens,
    },
})

export default store
