<template xmlns="http://www.w3.org/1999/html">
  <div class="">
    <form class="flex flex-col space-y-2">
      <input class="border-2" name="login" type="text" :placeholder="$t('login.username.placeholder')" v-model="login"/>
      <input class="border-2" name="password" type="password" :placeholder="$t('login.password.placeholder')"
             v-model="password"/>
      <input class="self-end" type="checkbox" value="Remember me" v-model="rememberMe">
      <input class="self-end" type="button" value="Click Me" @click.prevent="onLogin($event)">
    </form>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import {Namespaces} from "../store";
import {AuthenticationParameters, UserActions} from "../store/modules/user/type";
import {SimpleUser} from "../api/security-com";

const UserNamespace = namespace(Namespaces.USER)

@Options({})
export default class Login extends Vue {
  login: string = "";
  password: string = "";
  rememberMe: boolean = false;

  @UserNamespace.Action(UserActions.PERFORM_AUTHENTICATION) performAuthentication!: (parameter: AuthenticationParameters) => Promise<SimpleUser>;

  onLogin(event: Event): void {
    this.performAuthentication({login: this.login, password: this.password, rememberMe: this.rememberMe});
  }

}
</script>

<style scoped>


</style>
