import {createStore} from 'vuex'

import RootState from '@/store/root-state'
import UserModule from "@/store/modules/user/user";
import Parameters from "@/store/modules/parameters/parameters";


export enum Namespaces {
    USER = 'user',
    PARAMETERS = 'parameters',
}



const store = createStore<RootState>({
    modules: {
        [Namespaces.USER]: UserModule,
        [Namespaces.PARAMETERS]: Parameters,
    },
})

export default store
