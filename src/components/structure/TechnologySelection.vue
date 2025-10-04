<template>
  <div class="network">
    <AppIcon name="developments" extension="svg" class="background" />
    <template v-for="pos of 4" :key="pos">
      <img src="@/assets/icons/red-circle-arrow.svg" alt="" class="position" :class="{[`pos${pos}`]:true}" v-if="pos == position"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'TechnologySelection',
  components: {
    AppIcon
  },
  props: {
    position: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.network {
  position: relative;
  width: 180px;
  aspect-ratio: 129/24;
  margin: 5px;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0.15rem 0.15rem 0.15rem #aaa);
  }
  .position {
    position: absolute;
    width: 30px;
    &.pos1 { transform: translate(8px, 5px) rotate(0deg); }
    &.pos2 { transform: translate(53px, 5px) rotate(0deg); }
    &.pos3 { transform: translate(98px, 5px) rotate(0deg); }
    &.pos4 { transform: translate(143px, 5px) rotate(0deg); }
  }
}
</style>
