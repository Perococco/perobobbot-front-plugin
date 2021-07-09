<template>
  <CreateTokenModal v-model:showModal="createInProgress"/>
  <div class="text-3xl"> User Token Manager</div>
  <div>
    <PlusIcon @click="doCreateToken" class="text-gray-900 h-5 w-5"/>
  </div>
  <TokenView v-for="token in tokens" :key="token.id" :token="token"/>
</template>

<script lang="ts">
import {Namespaces} from "@/store/namespaces";
import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import type {RestUserToken} from "@/api/rest-com";
import {PlusIcon} from '@heroicons/vue/outline'
import {TokenActions, TokenGetters} from "@/store/modules/tokens/type";
import TokenView from "@/components/dashboard/tokens/TokenView.vue";
import CreateTokenModal from "@/components/dashboard/tokens/CreateTokenModal.vue";


const TokenNamespace = namespace(Namespaces.TOKENS)

@Options({
  components: {TokenView, CreateTokenModal, PlusIcon}
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
