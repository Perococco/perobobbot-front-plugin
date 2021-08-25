<template xmlns="http://www.w3.org/1999/html">
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col space-y-2 bg-white shadow-xl p-9 rounded border-2 border-gray-100 ">

      <div>
        <button class="p-2 pl-4 pr-4 outline-none rounded font-bold twitch-button text-white w-full"
                @click.prevent="useTwitch">
          <span>
            <font-awesome-icon :icon="['fab','twitch']" class="mr-3"/>
            {{$t("login.openid.twitch-msg")}}
          </span>
        </button>

      </div>

      <div class="flex flex-row space-x-2">
        <hr class="w-full self-center"/>
        <span>{{ $t('_lit.or') }}</span>
        <hr class="w-full self-center"/>
      </div>
      <form class="flex flex-col space-y-2 " @submit.prevent="onLogin">
        <span v-if='errorMessage!=""' class="text-red-300">{{ errorMessage }}</span>

        <label for="login">
          <input id="login" required="required" class="rounded border-2 outline-none p-1 focus:border-blue-100"
                 name="login" type="text"
                 :placeholder="$t('login.username.placeholder')" v-model.trim="login"/>
        </label>

        <label for="password">
          <input id="password" required="required" class="rounded border-2 outline-none p-1 focus:border-blue-100"
                 name="password" type="password"
                 :placeholder="$t('login.password.placeholder')"
                 v-model.trim="password"/>
        </label>


        <div class="flex flex-row justify-between">
          <label class="self-center">
            <input class="self-center" type="checkbox" value="Remember me" v-model="rememberMe"/>
            {{ $t('login.Remember_me') }}
          </label>
          <button id="submit"
                  class="p-2 pl-4 pr-4 rounded font-bold"
                  :class="{'bg-blue-400 text-white': formValid, 'bg-gray-100 text-black': !formValid}">
            {{$t('login.button.login')}}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {Namespaces} from "@/store/namespaces";
import {SimpleUser} from "@/api/security-com";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faTwitch} from "@fortawesome/free-brands-svg-icons";

import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import {AuthenticationParameters, UserActions} from "@/store/modules/user/type";

import {trimToOptional} from "@/utils/strings";
import {Platform} from "@/api/perobobbot-lang";

const UserNamespace = namespace(Namespaces.USER)

library.add(faTwitch)

@Options({})
export default class Login extends Vue {
  login: string = "";
  password: string = "";
  rememberMe: boolean = false;
  errorMessage: string = "";

  @UserNamespace.Action(UserActions.PERFORM_AUTHENTICATION_WITH_PASSWORD) signInWithPassword!: (parameter: AuthenticationParameters) => Promise<SimpleUser>;
  @UserNamespace.Action(UserActions.PERFORM_AUTHENTICATION_WITH_OPENID) signInWithOpenId!: (parameter: Platform) => Promise<SimpleUser>;

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
      this.doLogin(login.get(), password.get())
    }
  }

  useTwitch(event: Event): void {
    this.signInWithOpenId(Platform.TWITCH)
        .then(this.handleSucceededSignIn, this.handleFailedSignIn);
  }

  private doLogin(login: string, password: string) {
    this.signInWithPassword({login, password, rememberMe: this.rememberMe})
        .then(this.handleSucceededSignIn, this.handleFailedSignIn);
  }

  private handleSucceededSignIn(user:SimpleUser) {
    this.$router.push("/dashboard")
  }

  private handleFailedSignIn(err:any) {
    this.errorMessage = this.$t("login.failed", "Login Failed");
  }

}
</script>

<style scoped>
.twitch-button {
  background-color: #9147ff;
}

.twitch-button:hover {
  background-color: #781aff;
}

</style>
