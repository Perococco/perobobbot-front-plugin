<template>
  <teleport to="#modals">
    <transition name="fade">
      <div class="absolute top-0 left-0 h-screen w-full bg-gray-500 bg-opacity-50" v-if="showModal">
        <div class="flex flex-col p-3 left-1/3 top-1/3 absolute w-1/3 h-1/3 bg-gray-50 shadow-2xl rounded">
          <span>Select Platform (Twitch Discord)</span>
          <span>List scopes to select depending on selected Platform</span>
          <button>Create</button>
          <button @click="closeModal">Cancel</button>
        </div>
    </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  props: {
    showModal: Boolean
  }
})
export default class CreateTokenModal extends Vue {

  closeModal(): void {
    this.$emit('update:showModal', false)
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

</style>
