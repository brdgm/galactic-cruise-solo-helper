<template>
  <AppIcon type="difficulty-level" :name="iconName" extension="svg" class="icon"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateStore } from '@/store/state'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'DifficultyLevel',
  components: {
    AppIcon
  },
  setup() {
    const state = useStateStore()
    return { state }
  },
  computed: {
    iconName(): string {
      return `${this.state.setup.difficultyLevel}${this.state.setup.difficultyLevelPlus ? '-plus' : ''}`
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2rem;
}
</style>
