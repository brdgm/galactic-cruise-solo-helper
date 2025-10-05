<template>
  <ActionBox :instructionTitle="t('rules.advanceShips.returningToEarth.title')">
    <template #action>
      <AppIcon type="turn" name="returning-to-earth" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t('rules.advanceShips.returningToEarth.returnWorker')"></li>
        <li v-html="t('rules.advanceShips.returningToEarth.discardCruiseAndGuests')"></li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'AdvanceShipsReturningToEarth',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2.5em;
}
</style>
