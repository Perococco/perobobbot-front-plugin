<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/login">Login</router-link> |
  <router-link to="/secured">Secured</router-link>
  <div class="p-4">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import {Namespaces} from "./store";
import {VueI18n} from "vue-i18n";
import {ParametersActions} from "./store/modules/parameters/types";


const ParametersNamespace = namespace(Namespaces.PARAMETERS);

export default class App extends Vue {

  @ParametersNamespace.Action(ParametersActions.INITIALIZE_I18N) initializeI18n!: (i18n:VueI18n) => void;

  mounted() {
    this.initializeI18n(this.$i18n)
  }
}

</script>
