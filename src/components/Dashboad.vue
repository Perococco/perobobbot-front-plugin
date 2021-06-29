<template>
  <div>Hello "{{user?.login}}"</div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {namespace} from "s-vuex-class";
import {Namespaces} from "../store";
import {UserGetters} from "../store/modules/user/type";
import {SimpleUser} from "../api/security-com";
import {SecurityController} from "../api/rest-controller";

const UserNamespace = namespace(Namespaces.USER);

@Options({})
export default class Secured extends Vue {

  @UserNamespace.Getter(UserGetters.USER) user:SimpleUser | undefined;

}
</script>

<style scoped>

</style>
