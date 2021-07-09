<template>
  <div class="flex flex-row justify-between p-2">
    <span>{{ token.viewer_identity.pseudo }}</span>
    <span>{{ token.viewer_identity.platform }}</span>
    <span>{{ expirationDate }}</span>
    <div class="flex flex-row space-x-2">
      <Icon type="REFRESH" @click="refreshToken()"/>
      <Icon type="TRASH" @click="trashToken()"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import type {RestUserToken} from "@/api/rest-com";
import {epochToDate} from "@/utils/dates";

import {RefreshIcon, TrashIcon} from '@heroicons/vue/outline'
import {namespace} from "s-vuex-class";
import {Namespaces} from "@/store/namespaces";
import {TokenActions} from "@/store/modules/tokens/type";
import Icon from "@/components/icons/Icon.vue";

const TokensNamespace = namespace(Namespaces.TOKENS);

@Options({
  props: {
    token: Object as () => RestUserToken
  },
  components: {Icon, TrashIcon,RefreshIcon}
})
export default class TokenView extends Vue {

  @TokensNamespace.Action(TokenActions.UPDATE_TOKEN) updateToken!: (tokenId:string) => Promise<void>;
  @TokensNamespace.Action(TokenActions.DELETE_TOKEN) deleteToken!: (tokenId:string) => Promise<void>;

  get expirationDate(): Date {
    const date = epochToDate(this.token.expiration_instant);
    return `${date.toLocaleString()}`
  }

  refreshToken() {
    const tokenId = this.token.id;
    this.updateToken(tokenId);
  }

  trashToken() {
    const tokenId = this.token.id;
    this.deleteToken(tokenId);
  }


}

</script>

<style scoped>

</style>
