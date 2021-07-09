<template>
  <div class="flex flex-row">
    <div class="w-1/5 font-bold">{{ bot.name }}</div>
    <div v-if="admin">{{ bot.owner_login }}</div>
    <Icon type='TRASH' class="ml-auto" @click="doDeleteBot"/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Namespaces} from "@/store/namespaces";
import {Bot} from "@/api/perobobbot-lang";
import {namespace} from "s-vuex-class";
import {BotActions} from "@/store/modules/bots/type";
import {UserGetters} from "@/store/modules/user/type";
import Icon from "@/components/icons/Icon.vue";

const BotNamespace = namespace(Namespaces.BOTS)
const UserNamespace = namespace(Namespaces.USER)

@Options({
  props: {
    bot: Object as () => Bot
  },
  components: {Icon}
})
export default class BotView extends Vue {

  @UserNamespace.Getter(UserGetters.ADMIN) admin!:boolean;
  @BotNamespace.Action(BotActions.DELETE_BOT) deleteBot!: (string) => Promise<void>;



  doDeleteBot() {
    const botId = this.bot.id;
    this.deleteBot(botId);
  }

}
</script>

<style scoped>

</style>
