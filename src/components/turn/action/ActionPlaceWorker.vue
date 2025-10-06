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
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import WorkerLocationDisplay from '@/components/structure/WorkerLocationDisplay.vue'
import getCardNumber from '@/util/getCardNumber'

export default defineComponent({
  name: 'ActionPlaceWorker',
  components: {
    ActionBox,
    AppIcon,
    WorkerLocationDisplay
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    workerLocation() : number {
      return getCardNumber(this.navigationState.cardDeck.supportCard, 6)
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
