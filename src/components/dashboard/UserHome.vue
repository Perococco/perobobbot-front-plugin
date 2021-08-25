<template>
  <ChangePasswordModal v-model:showModal="changePasswordInProgress"/>
<div>{{$t("user-home.title")}}</div>
<div>
  <button @click="doChangePassword">Change password</button>
</div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal.vue";

@Options({
  components: {ChangePasswordModal}
})
export default class UserHome extends Vue {

  changePasswordInProgress:boolean = false

  public doChangePassword() {
    this.changePasswordInProgress =true
  }

}

</script>

<style scoped>

</style>
