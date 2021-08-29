<template>
  <teleport to="#modals">
    <transition name="fade">
      <div
          class="flex flex-row justify-center items-center  absolute top-0 left-0 h-screen w-full bg-gray-500 bg-opacity-50"
          v-if="showModal">
        <div class="flex flex-col p-3 space-y-1  absolute bg-gray-50 shadow-2xl rounded">
          <form class="flex flex-col space-y-2 " @submit.prevent="doChangePassword">
            <label for="currentPassword">
              <input id="currentPassword" required="required"
                     class="rounded border-2 outline-none p-1 focus:border-blue-100"
                     name="currentPassword" type="password"
                     :placeholder="$t('user-home.placeholder.current-password')" v-model.trim="currentPassword"/>
            </label>

            <label for="newPassword">
              <input id="newPassword" required="required" :minlength="MINIMAL_PASSWORD_LENGTH"
                     class="rounded border-2 outline-none p-1 focus:border-blue-100"
                     name="newPassword" type="password"
                     :placeholder="$t('user-home.placeholder.new-password')"
                     v-model.trim="newPassword"/>
            </label>

            <label for="newPasswordRepeat">
              <input id="newPasswordRepeat" required="required" :minlength="MINIMAL_PASSWORD_LENGTH"
                     class="rounded border-2 outline-none p-1 focus:border-blue-100"
                     name="newPasswordRepeat" type="password"
                     :placeholder="$t('user-home.placeholder.new-password-repeat')"
                     v-model.trim="newPasswordRepeat"/>
            </label>

            <div class="flex flex-row justify-end space-x-2">
              <button
                  type="button"
                  :className="buttonStyle"
                  @click="closeModal">{{ $t("_lit.Cancel") }}
              </button>
              <button
                  id="submit"
                  type="submit"
                  :className="buttonStyle"
                  :class="{'text-gray-900 font-bold': !formValid, 'text-blue-500 hover:text-blue-700  font-bold': formValid}"
                  :disabled="!formValid"
              >{{ $t("_lit.Validate") }}
              </button>
            </div>
          </form>

        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">

import {SecurityController} from "@/api/rest-controller";

const securityController = new SecurityController();

import {createDecorator, Options, Vue} from "vue-class-component";
import {ChangePasswordParameters, SimpleUser} from "@/api/security-com";
import {UserGetters} from "@/store/modules/user/type";
import {namespace} from "s-vuex-class";
import {Namespaces} from "@/store/namespaces";
import Watch from "@/utils/watch-decorator";
import {clearAllAuthenticationInformation} from "@/auth";
import router, {Routes} from "@/router";


const UserNamespace = namespace(Namespaces.USER);


@Options({
  props: {
    showModal: Boolean
  },
})
export default class ChangePasswordModal extends Vue {

  MINIMAL_PASSWORD_LENGTH = 7;

  @UserNamespace.Getter(UserGetters.USER) user: SimpleUser | undefined;


  currentPassword: string = "";
  newPassword: string = "";
  newPasswordRepeat: string = "";

  buttonStyle: string = "pl-2 pr-2 rounded" +
      " font-bold bg-gray-50 text-blue-500 " +
      " border-0 focus:outline-none hover:text-blue-700"

  get formValid(): boolean {
    return this.currentPassword.length > 0 && this.newPassword.length > this.MINIMAL_PASSWORD_LENGTH && this.newPassword === this.newPasswordRepeat
  }

  public closeModal(): void {
    this.$emit('update:showModal', false)
  }

  public doChangePassword(): void {
    console.log("Do Change Password", this.user)
    const login = this.user?.login;
    if (login === undefined || !this.formValid) {
      return;
    }
    securityController.changePassword({password: this.currentPassword, new_password: this.newPassword})
        .then((r) => {
          clearAllAuthenticationInformation();
          router.push(Routes.HOME)
        })
        .catch((e) => console.error(e))
  }

  public handleKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape") {
      this.closeModal()
    }
  }

  @Watch("showModal")
  public onModalVisibilityChange(isVisible, wasVisible) {
    if (isVisible) {
      document.addEventListener("keydown", this.handleKeyDown);
    } else {
      document.removeEventListener("keydown", this.handleKeyDown)
    }
  }


}


</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>