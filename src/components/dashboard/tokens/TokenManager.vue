<template>
  <CreateTokenModal v-model:showModal="createInProgress"/>
  <div class="text-3xl">{{$t('tokens.title')}}</div>
  <div>
    <Icon type="PLUS" size="SIZE_4" @click="doCreateToken" />
  </div>
  <TokenView v-for="token in tokens" :key="token.id" :token="token"/>
</template>

<script lang="ts">
import {Namespaces} from "@/store/namespaces";
import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import type {RestUserToken} from "@/api/rest-com";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

import {TokenActions, TokenGetters} from "@/store/modules/tokens/type";
import TokenView from "@/components/dashboard/tokens/TokenView.vue";
import CreateTokenModal from "@/components/dashboard/tokens/CreateTokenModal.vue";
import Icon from "@/components/icons/Icon.vue";


library.add(faPlus)

const TokenNamespace = namespace(Namespaces.TOKENS)

@Options({
  components: {Icon, TokenView, CreateTokenModal}
})
export default class TokenManager extends Vue {

  @TokenNamespace.Getter(TokenGetters.TOKENS) tokens!: RestUserToken[];
  @TokenNamespace.Action(TokenActions.REFRESH_TOKENS) refreshTokens!: () => void;

  createInProgress:boolean = false

  mounted() {
    this.refreshTokens()
  }

  doCreateToken() {
    this.createInProgress = true
    // const parameter: OAuthProcessParameter = {
    //   platform: Platform.TWITCH,
    //   scopes: [TwitchScope.MODERATION_READ],
    // }
    // this.createToken(parameter)
  }

}

</script>

<style scoped>

</style>
