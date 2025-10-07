<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)">
    <template #action>
      <div class="iconContainer">
        <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
        <div class="selectionIcon">
          <NetworkLocationDisplay :networkLocation="networkLocation"/>
        </div>
      </div>
    </template>
    <template #instruction>
      <div class="float-end ms-3">
        <NetworkLocationDisplay :networkLocation="networkLocation"/>
      </div>
      <ul>
        <li v-html="t(`rules.bot.action.${action.action}.startingPosition`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.allAreasFilled`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.buildingOrder`)"></li>
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
import NetworkLocationDisplay from '@/components/structure/NetworkLocationDisplay.vue'
import getCardNumber from '@/util/getCardNumber'

export default defineComponent({
  name: 'ActionBuildDevelopmentNetwork',
  components: {
    ActionBox,
    AppIcon,
    NetworkLocationDisplay
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
    networkLocation() : number {
      return getCardNumber(this.supportCard, 6)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 5em;
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
