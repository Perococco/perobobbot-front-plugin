<template>
  <div class="locale-selector">
    <select @change="onLocaleSelected($event)">
      <option v-for="locale in availableLocales" :key="`locale-${locale}`" :value="locale" :selected="locale === current_locale">{{ locale }}</option>
    </select>
  </div>
</template>


<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import {Namespaces} from "@/store";
import {ParametersActions, ParametersGetters, SetLocaleParameter} from "@/store/modules/parameters/types";
import {namespace} from "s-vuex-class"

const ParametersNamespace = namespace(Namespaces.PARAMETERS);

@Options({})
export default class Dictionary extends Vue {

  @ParametersNamespace.Getter(ParametersGetters.CURRENT_LOCALE) current_locale!: string

  @ParametersNamespace.Getter(ParametersGetters.AVAILABLE_LOCALES) availableLocales!:string[]

  @ParametersNamespace.Action(ParametersActions.SET_CURRENT_LOCALE) setLocale!: (parameter:SetLocaleParameter) => void

  onLocaleSelected(event: Event): void {
    const locale = event.target.value;
    const parameters:SetLocaleParameter = {locale:locale, i18n:this.$i18n}
    this.setLocale(parameters);
 }

}
</script>

<style scoped>

</style>
