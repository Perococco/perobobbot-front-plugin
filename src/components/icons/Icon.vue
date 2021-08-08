<template>
  <font-awesome-icon :icon="icon" :class="style"/>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {computeStyle, IconMode, IconType} from "@/components/icons/types";
import {IconSize, IconStyles} from "@/components/icons/types";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlus, faQuestionCircle, faTrashAlt, faSyncAlt} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt,faSyncAlt,faPlus,faQuestionCircle)



@Options({
  props: {
    type: {
      type: String,
      default: IconType.UNKNOWN,
      enum: IconType
    },
    mode: String,
    disabled: Boolean,
    size: {
      type:String,
      default: "SIZE_5",
      enum: IconSize
    }
  }
})
export default class Icon extends Vue {

  get style() {
    let mode;
    if (!this.disabled) {
      mode = computeEffectiveMode(this.type, this.mode);
    } else {
      mode = IconMode.NEUTRAL;
    }
    return computeStyle(this.size, mode);
  }

  get icon() {
    if (this.type != undefined) {
      switch (this.type) {
        case IconType.TRASH :
          return "trash-alt";
        case IconType.REFRESH :
          return "sync-alt";
        case IconType.PLUS :
          return "plus";
      }
    }
    return "question-circle";
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

</script>


<style scoped>
</style>
