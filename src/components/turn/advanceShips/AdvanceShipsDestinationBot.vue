<template>
  <ActionBox :instructionTitle="t('rules.advanceShips.destination.title')">
    <template #action>
      <AppIcon type="turn" name="destination-bot" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t('rules.bot.advanceShips.destination.placeUpgradeToken')"></li>
        <li v-html="t('rules.bot.advanceShips.destination.payAdsForGuests')"></li>
      </ul>
      <p class="fst-italic small" v-html="t('rules.bot.advanceShips.destination.fourthToken')"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'AdvanceShipsDestinationBot',
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
