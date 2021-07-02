<template>
  <CreateTokenModal v-model:showModal="createInProgress"/>
  <div> User Token Manager</div>
  <button @click="doCreateToken">Create</button>
  <TokenView v-for="token in tokens" :key="token.id" :token="token"/>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import {Namespaces} from "@/store";
import type {RestUserToken} from "@/api/rest-com";
import {OAuthProcessParameter} from "@/api/rest-com";
import {TokenActions, TokenGetters} from "@/store/modules/tokens/type";
import TokenView from "@/components/dashboard/tokens/TokenView.vue";
import CreateTokenModal from "@/components/dashboard/tokens/CreateTokenModal.vue";
import {Platform} from "@/api/perobobbot-lang";
import {TwitchScope} from "@/api/oauth-api";

const TokenNamespace = namespace(Namespaces.TOKENS)

@Options({
  components: {TokenView, CreateTokenModal}
})
export default class TokenManager extends Vue {

  @TokenNamespace.Getter(TokenGetters.TOKENS) tokens!: RestUserToken[];
  @TokenNamespace.Action(TokenActions.REFRESH_TOKENS) refreshTokens!: () => void;
  @TokenNamespace.Action(TokenActions.CREATE_TOKEN) createToken!: (parameter: OAuthProcessParameter) => Promise<void>;

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
