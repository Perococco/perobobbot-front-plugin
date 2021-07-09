<template>
  <div class="text-3xl">Bot Manager</div>
  <PlusIcon class="text-gray-900 h-5 w-5" @click="doCreateBot"/>
  <BotView  v-for="bot in bots" :key="bot.id" :bot="bot"/>
</template>

<script lang="ts">
import {Namespaces} from "@/store/namespaces";
import {Options, Vue} from "vue-class-component";
import {PlusIcon} from '@heroicons/vue/outline';
import {namespace} from "s-vuex-class";
import {CreateBotParameters} from "@/api/rest-com";
import {BotActions, BotGetters} from "@/store/modules/bots/type";
import {Bot} from "@/api/perobobbot-lang";
import {Optional} from "@/utils/optional";
import BotView from "@/components/dashboard/bots/BotView.vue";

const BotNamespace = namespace(Namespaces.BOTS);

@Options({
  components: {BotView, PlusIcon}
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
      const parameters = {name:name.get()}
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
