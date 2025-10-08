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
import NetworkLocation from '@/services/enum/NetworkLocation'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'NetworkLocationDisplay',
  components: {
    AppIcon
  },
  props: {
    networkLocation: {
      type: Number as PropType<NetworkLocation>,
      required: false
    },
    networkLocations: {
      type: Array as PropType<NetworkLocation[]>,
      required: false
    }
  },
  computed: {
    allLocations() : NetworkLocation[] {
      return getAllEnumValues(NetworkLocation)
    }
  },
  methods: {
    hasLocation(location: NetworkLocation) : boolean {
      return (this.networkLocation == location) || (this.networkLocations?.includes(location) ?? false)
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
    &.pos1 { transform: translate(35px, 10px) rotate(0deg); }
    &.pos2 { transform: translate(86px, 10px) rotate(0deg); }
    &.pos3 { transform: translate(106px, 44px) rotate(90deg); }
    &.pos4 { transform: translate(75px, 66px) rotate(180deg); }
    &.pos5 { transform: translate(24px, 66px) rotate(180deg); }
    &.pos6 { transform: translate(5px, 32px) rotate(270deg); }
  }
}
</style>
