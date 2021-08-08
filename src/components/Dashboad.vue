<template>
  <div class="float-left flex flex-col justify-between bg-blue-500 h-screen p-4">
    <div class="flex flex-col">  <!-- TOP -->
      <router-link class="font-bold text-3xl mb-5" :to="userHomeRoute()">{{ user?.login }}</router-link>
      <router-link :to="tokenRoute()">Tokens</router-link>
      <router-link :to="botRoute()">Bots</router-link>
    </div>

    <div> <!-- Bottom (Je ne sais pas si la div casse le style mais l'idee est d'avoir deux sections) -->
      <button @click.prevent="logout"
              class="self-start outline-none focus:outline-none border-2 border-transparent focus:border-blue-600">
        {{ $t('_lit.Logout') }}
      </button>
    </div>
  </div>
  <router-view/>
</template>

<script lang="ts">
import {Namespaces} from "@/store/namespaces";
import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import {UserGetters} from "@/store/modules/user/type";
import {SimpleUser} from "@/api/security-com";
import {clearAllAuthenticationInformation} from "@/auth"
import router, {dashboardRoute, DashboardRoutes, Routes} from "@/router"

const UserNamespace = namespace(Namespaces.USER);


@Options({})
export default class Secured extends Vue {

  userHomeRoute(): string {
    return dashboardRoute(DashboardRoutes.WELCOME)
  }

  tokenRoute(): string {
    return dashboardRoute(DashboardRoutes.TOKEN_MANAGER)
  }

  botRoute(): string {
    return dashboardRoute(DashboardRoutes.BOT_MANAGER)
  }

  @UserNamespace.Getter(UserGetters.USER) user: SimpleUser | undefined;

  logout() {
    clearAllAuthenticationInformation()
    router.push(Routes.HOME)
  }

}
</script>

<style scoped>
.logout_button {
  align-self: flex-end;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border: 1px solid #111111;
}

.logout_button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border: 1px solid #FFFFFF;
}
</style>
