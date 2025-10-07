<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)" :modalSizeLg="true">
    <template #action>
      <div class="iconContainer">
        <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
        <div class="cardSelection">
          <AgendaCardSelection :position="cruisePos"/>
        </div>
      </div>
    </template>
    <template #instruction>
      <div class="float-end ms-3">
        <AgendaCardSelection :position="cruisePos"/>
      </div>
      <ul>
        <li v-html="t(`rules.bot.action.${action.action}.select`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.nextCruise`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.addGuestsFromBottom`)"></li>
        <ol>
          <li v-html="t(`rules.bot.action.${action.action}.firstDestination`)"></li>
          <li v-html="t(`rules.bot.action.${action.action}.secondDestination`)"></li>
          <li v-html="t(`rules.bot.action.${action.action}.thirdDestination`)"></li>
          <li v-html="t(`rules.bot.action.${action.action}.repeatSteps`)"></li>
        </ol>
        <li v-html="t(`rules.bot.action.${action.action}.addFromMiddle`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.addFromTop`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.addFromSupply`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.gainReputation`)"></li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Card, { CardAction } from '@/services/Card'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import getCardNumber from '@/util/getCardNumber'
import AgendaCardSelection from '@/components/structure/AgendaCardSelection.vue'

export default defineComponent({
  name: 'ActionAdvertiseCruise',
  components: {
    ActionBox,
    AppIcon,
    AgendaCardSelection
  },
  props: {
    supportCard: {
      type: Object as PropType<Card>,
      required: true
    },
    action: {
      type: Object as PropType<CardAction>,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    cruisePos() : number {
      return getCardNumber(this.supportCard, 4)
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
.cardSelection {
  zoom: 0.5;
}
</style>
