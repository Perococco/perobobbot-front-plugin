import {createStore} from 'vuex'

import RootState from '@/store/root-state'
import UserModule from "@/store/modules/user/user";
import Parameters from "@/store/modules/parameters/parameters";
import Tokens from "@/store/modules/tokens/tokens";
import BotsModule from "@/store/modules/bots/bots";
import {Namespaces} from "@/store/namespaces";



const store = createStore<RootState>({
    modules: {
        [Namespaces.USER]: UserModule,
        [Namespaces.PARAMETERS]: Parameters,
        [Namespaces.TOKENS]: Tokens,
        [Namespaces.BOTS]: BotsModule
    },
})

export default store
