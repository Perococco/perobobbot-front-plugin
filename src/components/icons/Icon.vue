<template>
  <component :is="dynamicComponent" :class="style"></component>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {PlusIcon, QuestionMarkCircleIcon, RefreshIcon, TrashIcon} from "@heroicons/vue/outline"
import {IconMode, IconType} from "@/components/icons/types";


@Options({
  components: {TrashIcon, PlusIcon, RefreshIcon, QuestionMarkCircleIcon},
  props: {
    type: {
      type: String,
      default: IconType.UNKNOWN,
      enum: IconType
    },
    mode: String,
    disabled: Boolean,
    size: Number,
  }
})
export default class Trash extends Vue {

  get style() {
    let color = "grey";
    if (!this.disabled) {
      const mode = computeEffectiveMode(this.type, this.mode);
      color = getTxtColor(mode);
    }
    let s = computeStyle(this.size, color);
    console.log(s)
    return s;
  }

  get dynamicComponent() {
    if (this.type != undefined) {
      switch (this.type) {
        case IconType.TRASH :
          return TrashIcon;
        case IconType.REFRESH :
          return RefreshIcon;
        case IconType.PLUS :
          return PlusIcon;
      }
    }
    return QuestionMarkCircleIcon;
  }


}

function getTxtColor(mode: IconMode): string {
  switch (mode) {
    case IconMode.WARNING :
      return "yellow";
    case IconMode.DANGER :
      return "red";
    case IconMode.NEUTRAL :
      return "grey";
    case IconMode.DEFAULT :
      return "grey";
  }
}


function computeEffectiveMode(type: IconType, mode: IconMode | undefined): IconMode {
  if (type == undefined) {
    return IconMode.WARNING;
  }
  if (mode == undefined) {
    mode = IconMode.DEFAULT;
  }
  if (mode != IconMode.DEFAULT) {
    return mode;
  }
  switch (type) {
    case IconType.PLUS:
      return IconMode.NEUTRAL;
    case IconType.REFRESH:
      return IconMode.NEUTRAL;
    case IconType.TRASH:
      return IconMode.DANGER;
  }
  return IconMode.WARNING;
}

function computeStyle(size: number, color: string): string {
  let s = size??5;
  return `h-${s} w-${s} text-${color}-400 hover:text-${color}-600`
}


</script>


<style scoped>

</style>
