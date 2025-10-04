<template>
  <div class="network">
    <AppIcon name="agenda-cards" extension="svg" class="background" />
    <template v-for="pos of 4" :key="pos">
      <img src="@/assets/icons/red-circle-arrow.svg" alt="" class="position" :class="{[`pos${pos}`]:true}" v-if="hasPosition(pos)"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'BlueprintSelection',
  components: {
    AppIcon
  },
  props: {
    position: {
      type: Number,
      required: false
    },
    positions: {
      type: Array as PropType<number[]>,
      required: false
    }
  },
  methods: {
    hasPosition(position: number) : boolean {
      return ((this.position == position) || (this.positions?.includes(position) ?? false))
    }
  }
})
</script>

<style lang="scss" scoped>
.network {
  position: relative;
  width: 60px;
  aspect-ratio: 27/64;
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
    width: 25px;
    &.pos1 { transform: translate(16px, 18px) rotate(90deg); }
    &.pos2 { transform: translate(16px, 50px) rotate(90deg); }
    &.pos3 { transform: translate(16px, 82px) rotate(90deg); }
    &.pos4 { transform: translate(16px, 113px) rotate(90deg); }
  }
}
</style>
