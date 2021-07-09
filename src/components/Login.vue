<template xmlns="http://www.w3.org/1999/html">
  <div class="flex items-center justify-center h-screen">
    <form class="flex flex-col space-y-2 bg-white shadow-xl p-9 rounded border-2 border-gray-100 ">
      <span v-if='errorMessage!=""' class="text-red-300">{{ errorMessage }}</span>
      <input class="rounded border-2 outline-none p-1 focus:border-blue-100" name="login" type="text"
             :placeholder="$t('login.username.placeholder')" v-model.trim="login"/>
      <input class="rounded border-2 outline-none p-1 focus:border-blue-100" name="password" type="password"
             :placeholder="$t('login.password.placeholder')"
             v-model.trim="password"/>
      <div class="flex flex-row justify-between">
        <label class="self-center">
          <input class="self-center" type="checkbox" value="Remember me" v-model="rememberMe"/>
          {{ $t('login.Remember_me') }}
        </label>
        <input class="p-2 pl-4 pr-4 rounded font-bold"
               :class="{'bg-blue-400 text-white': formValid, 'bg-gray-100 text-black': !formValid}"
               type="button"
               :disabled="!formValid"
               :value="$t('Login')" @click.prevent="onLogin">
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {Namespaces} from "@/store/namespaces";
import {SimpleUser} from "@/api/security-com";

import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import {AuthenticationParameters, UserActions} from "@/store/modules/user/type";

import {trimToOptional} from "@/utils/strings";

const UserNamespace = namespace(Namespaces.USER)

@Options({})
export default class Login extends Vue {
  login: string = "";
  password: string = "";
  rememberMe: boolean = false;
  errorMessage: string = "";

  @UserNamespace.Action(UserActions.PERFORM_AUTHENTICATION) performAuthentication!: (parameter: AuthenticationParameters) => Promise<SimpleUser>;

  get formValid(): boolean {
    const login = trimToOptional(this.login);
    const password = trimToOptional(this.password);
    return login.isPresent() && password.isPresent();
  }

  onLogin(event: Event): void {
    this.errorMessage = "";
    const login = trimToOptional(this.login);
    const password = trimToOptional(this.password);
    if (login.isPresent() && password.isPresent()) {
      this.doLogin(login.get(),password.get())
    }
  }

  private doLogin(login: string, password: string) {
    this.performAuthentication({login, password, rememberMe: this.rememberMe})
        .then(user => {
          this.$router.push("/dashboard")
        })
        .catch(e => {
          this.errorMessage = this.$t("login.failed", "Login Failed");
        });
  }

}
</script>

<style scoped>


</style>
