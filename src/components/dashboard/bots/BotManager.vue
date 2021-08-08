<template xmlns="http://www.w3.org/1999/html">
  <div class="text-3xl">Bots</div>
  <div>
    <Icon type="PLUS" size="SIZE_4" @click="doCreateBot"/>
  </div>
  <BotView v-for="bot in bots" :key="bot.id" :bot="bot"/>
</template>

<script lang="ts">
import {Namespaces} from "@/store/namespaces";
import {Options, Vue} from "vue-class-component";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import {namespace} from "s-vuex-class";
import {CreateBotParameters} from "@/api/rest-com";
import {BotActions, BotGetters} from "@/store/modules/bots/type";
import {Bot} from "@/api/perobobbot-lang";
import {Optional} from "@/utils/optional";
import BotView from "@/components/dashboard/bots/BotView.vue";
import Icon from "@/components/icons/Icon.vue";

const BotNamespace = namespace(Namespaces.BOTS);

library.add(faPlus)

@Options({
  components: {Icon, BotView}
})
export default class BotManager extends Vue {

  @BotNamespace.Getter(BotGetters.BOTS) bots!: Bot[];
  @BotNamespace.Action(BotActions.REFRESH_BOTS) refreshBots!: () => Promise<void>;
  @BotNamespace.Action(BotActions.CREATE_BOT) createBot!: (parameter: CreateBotParameters) => Promise<Bot>;

  doCreateBot() {
    const name = this.findUsedName();
    if (name.isAbsent()) {
      console.error("Could not determined a name not used yet")
    } else {
      const parameters = {name: name.get()}
      this.createBot(parameters);
    }
  }

  findUsedName(): Optional<string> {
    const usedNames = new Set();
    this.bots.forEach(b => usedNames.add(b.name));
    for (let i = 1; i <= (this.bots.length + 1); i++) {
      const name = "Bot_" + i;
      if (!usedNames.has(name)) {
        return Optional.of(name);
      }
    }
    return Optional.empty();
  }

  mounted() {
    this.refreshBots();
  }
}
</script>

<style scoped>

</style>
