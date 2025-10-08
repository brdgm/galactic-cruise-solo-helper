<template>
  <ActionBox :instructionTitle="t('rules.advanceShips.dayInSpace.title')">
    <template #action>
      <AppIcon type="turn" name="day-in-space-bot" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t('rules.bot.advanceShips.dayInSpace.gainGuestBonuses')"></li>
      </ul>
      <p class="fst-italic" v-if="hasAccommodationsExpansion" v-html="t('rules.bot.advanceShips.dayInSpace.accommodationsIgnoreSpecialBlueprints')"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'AdvanceShipsDayInSpaceBot',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasAccommodationsExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.ACCOMMODATIONS)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2.5em;
}
</style>
