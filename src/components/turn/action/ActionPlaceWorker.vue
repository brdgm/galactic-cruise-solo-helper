<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.place-worker.title`)">
    <template #action>
      <div class="iconContainer">
        <AppIcon name="place-worker" extension="svg" class="icon"/>
        <div class="selectionIcon">
          <WorkerLocationDisplay :workerLocation="workerLocation"/>
        </div>
      </div>
    </template>
    <template #instruction>
      <div class="float-end ms-3">
        <WorkerLocationDisplay :workerLocation="workerLocation"/>
      </div>
      <ul>
        <li v-html="t(`rules.bot.action.place-worker.placeWorker`)"></li> 
        <li v-html="t(`rules.bot.action.place-worker.nextLocation`)"></li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import WorkerLocationDisplay from '@/components/structure/WorkerLocationDisplay.vue'
import Card from '@/services/Card'

export default defineComponent({
  name: 'ActionPlaceWorker',
  components: {
    ActionBox,
    AppIcon,
    WorkerLocationDisplay
  },
  props: {
    supportCard: {
      type: Object as PropType<Card>,
      required: true
    },
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    workerLocation() : number {
      return this.supportCard.workerLocation
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3em;
}
.iconContainer {
  display: flex;
  align-items: center;
  gap: 1em;
}
.selectionIcon {
  zoom: 0.6;
}
</style>
