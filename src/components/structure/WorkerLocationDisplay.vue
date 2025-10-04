<template>
  <div class="network">
    <AppIcon name="network" class="background" />
    <template v-for="location of allLocations" :key="location">
      <img src="@/assets/icons/red-circle-arrow.svg" alt="" class="position" :class="{[`pos${location}`]:true}" v-if="hasLocation(location)"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from './AppIcon.vue'
import WorkerLocation from '@/services/enum/WorkerLocation'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'WorkerLocationDisplay',
  components: {
    AppIcon
  },
  props: {
    workerLocation: {
      type: Number as PropType<WorkerLocation>,
      required: false
    },
    workerLocations: {
      type: Array as PropType<WorkerLocation[]>,
      required: false
    }
  },
  computed: {
    allLocations() : WorkerLocation[] {
      return getAllEnumValues(WorkerLocation)
    }
  },
  methods: {
    hasLocation(location: WorkerLocation) : boolean {
      return ((this.workerLocation == location) || (this.workerLocations?.includes(location) ?? false))
    }
  }
})
</script>

<style lang="scss" scoped>
.network {
  position: relative;
  width: 140px;
  aspect-ratio: 168/128;
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
    &.pos1 { transform: translate(61px, 10px) rotate(0deg); }
    &.pos2 { transform: translate(106px, 16px) rotate(90deg); }
    &.pos3 { transform: translate(100px, 64px) rotate(180deg); }
    &.pos4 { transform: translate(50px, 64px) rotate(180deg); }
    &.pos5 { transform: translate(4px, 59px) rotate(270deg); }
    &.pos6 { transform: translate(10px, 10px) rotate(0deg); }
  }
}
</style>
