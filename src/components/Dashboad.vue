<template>
  <div class="float-left flex flex-col justify-between bg-blue-500 h-screen p-4">
    <div class="flex flex-col">  <!-- TOP -->
      <router-link class="font-bold text-3xl mb-5" :to="userHomeRoute()">{{ user?.login }}</router-link>
      <router-link :to="tokenRoute()">{{$t("tokens.dashboard-link")}}</router-link>
      <router-link :to="botRoute()">{{$t("bots.dashboard-link")}}</router-link>
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
import {JWT_TOKEN_KEY} from "@/constants";
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import {Optional} from "@/utils/optional";
import {prepare_url} from "@/api/url-preparator";

const EventSource = NativeEventSource || EventSourcePolyfill;
const UserNamespace = namespace(Namespaces.USER);


@Options({})
export default class Secured extends Vue {

  private eventSource : EventSource;

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

  closeEventSource():void {
    if (this.eventSource != undefined) {
        this.eventSource.close();
        this.eventSource = undefined;
    }
  }

  beforeMount() {
    this.closeEventSource();
    const token = sessionStorage.getItem(JWT_TOKEN_KEY)
    const sseUrl = prepare_url('/events/sse')
    console.log("Token : ",token.length, sseUrl)
    this.eventSource = new EventSourcePolyfill(sseUrl, {
      headers: {
        'Authorization': 'bearer ' + token
      }
    });
    this.eventSource.addEventListener("ping",function(e) {
      console.log("ping : ",e)
    });
    this.eventSource.addEventListener("application-event",function(e) {
      console.log("application-event : ",e)
    });
    this.eventSource.addEventListener("notification",function(e) {
      console.log("notification : ",e)
    });
    this.eventSource.addEventListener("chat-message",function(e) {
      console.log("chat-message : ",e)
    });
    this.eventSource.addEventListener("message",function(e) {
      console.log("message : ",e)
    });
  }

  beforeUnmount() {
    this.closeEventSource();
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
