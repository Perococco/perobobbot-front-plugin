<template>
  <teleport to="#modals">
    <transition name="fade">
      <div class="absolute top-0 left-0 h-screen w-full bg-gray-500 bg-opacity-50" v-if="showModal">
        <div class="flex flex-col p-3 space-y-1 top-1/4 absolute w-5/6 h-1/2 bg-gray-50 shadow-2xl rounded mymodal">
          <div>
            <span class="font-bold mr-2">{{ $t('_lit.Platform') }}</span>
            <select v-model="platform">
              <option v-for="platform in platforms" key="p">{{ platform }}</option>
            </select>
          </div>
          <hr/>
          <span class="font-bold">Scopes</span>
          <div class="space-x-2">
            <button :className="buttonStyle" @click="clearSelection">Clear</button>
            <button :className="buttonStyle" @click="selectAll">Select All</button>
            <input type="text" v-model="scopeFilter"/>
          </div>
          <div class="h-full flex flex-row content-start flex-wrap overflow-y-scroll">
            <div class="w-1/2" v-for="state in selection" key="scope">
              <input type="checkbox" :id="state.scope" :name="state.scope"
                     :checked="state.checked"
                     @click="state.toggle()"/>
              <label class="pl-2" :for="state.scope">{{ state.scope }}</label>
            </div>
          </div>
          <div class="flex flex-row justify-end space-x-2">
            <button
                :className="buttonStyle"
                @click="closeModal">Cancel
            </button>
            <button
                :className="buttonStyle"
                :class="{'text-gray-900 font-bold': oauthParameter.isAbsent(), 'text-blue-500 hover:text-blue-700  font-bold': oauthParameter.isPresent()}"
                :disabled="oauthParameter.isAbsent()"
                @click="doCreateToken">Create
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Platform} from "@/api/perobobbot-lang";
import {TwitchScope} from "@/api/oauth-api";
import {Optional} from "@/utils/optional";
import {namespace} from "s-vuex-class";
import {Namespaces} from "@/store/namespaces";
import {TokenActions} from "@/store/modules/tokens/type";
import {OAuthProcessParameter} from "@/api/rest-com";


class ScopeState {
  scope: string
  checked: boolean

  constructor(scope: string, checked: boolean) {
    this.scope = scope;
    this.checked = checked;
  }

  toggle() {
    this.checked = !this.checked;
  }

  match(scopeFilter: string): boolean {
    return this.scope.includes(scopeFilter)
  }

}


const TokensNamespace = namespace(Namespaces.TOKENS);

@Options({
  props: {
    showModal: Boolean
  }
})
export default class CreateTokenModal extends Vue {

  @TokensNamespace.Action(TokenActions.CREATE_TOKEN) createToken!: (parameter: OAuthProcessParameter) => Promise<void>;


  buttonStyle: string = "pl-2 pr-2 rounded" +
      " font-bold bg-gray-50 text-blue-500 " +
      " border-0 focus:outline-none hover:text-blue-700"


  platform: Platform = null;
  selections: Map<Platform, ScopeState[]> = new Map();
  scopeFilter: string = "";

  get platforms(): Platform[] {
    const values: Platform[] = Object.values(Platform);
    return values.filter(p => p != Platform.LOCAL);
  }

  get selection(): ScopeState[] {
    if (this.platform != null) {
      const selection = this.selections.get(this.platform);
      return selection.filter(s => s.match(this.scopeFilter))
    }
    return [];
  }

  get oauthParameter(): Optional<OAuthProcessParameter> {
    const platform: Platform = this.platform;
    const selectedScopes: string[] = this.selection.filter(s => s.checked).map(s => s.scope);

    if (platform != undefined && selectedScopes.length > 0) {
      return Optional.of({platform: platform, scopes: selectedScopes});
    }
    return Optional.empty()
  }

  clearSelection() {
    this.setAll(this.selection, false);
  }

  selectAll() {
    this.setAll(this.selection, true);
  }

  private setAll(selection: ScopeState[], value: boolean) {
    selection.forEach(m => m.checked = value)
  }

  closeModal(): void {
    this.$emit('update:showModal', false)
  }

  async doCreateToken() {
    const parameter = this.oauthParameter.orUndefined();
    console.log(parameter)
    if (parameter != undefined) {
      try {
        await this.createToken(parameter)
        this.closeModal()
      } catch (error) {
        console.error(error)
      }
    }
  }

  mounted() {
    Object.values(Platform)
        .filter(platform => platform != Platform.LOCAL)
        .forEach((platform: Platform) => {
              CreateTokenModal.getScopes(platform)
                  .map(this.createInitialStates)
                  .ifPresent(states => this.selections.set(platform, states))
            }
        )
    this.platform = this.platforms[0];
  }

  private createInitialStates(scopes: string[]): ScopeState[] {
    return scopes.map(s => new ScopeState(s, false))
  }

  private static getScopes(platform: Platform): Optional<string[]> {
    switch (platform) {
      case Platform.TWITCH:
        const values = Object.values(TwitchScope).map(s => s.toString());
        return Optional.of(values);
    }
    return Optional.empty();
  }

}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mymodal {
  left: 8.33333%
}

</style>
