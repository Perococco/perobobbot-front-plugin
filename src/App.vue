<template>
    <div class="bg-gray-50">
      <router-view/>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import {Namespaces} from "./store";
import {ExportedGlobalComposer, VueI18n} from "vue-i18n";
import {ParametersActions} from "./store/modules/parameters/types";


const ParametersNamespace = namespace(Namespaces.PARAMETERS);

export default class App extends Vue {

  @ParametersNamespace.Action(ParametersActions.INITIALIZE_I18N) initializeI18n!: (i18n:  | ExportedGlobalComposer) => void;

  async mounted() {
    await this.initializeI18n(this.$i18n)

  }
}

</script>
