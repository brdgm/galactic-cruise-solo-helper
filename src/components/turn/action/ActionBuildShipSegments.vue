<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)" :checked="checked" :modalSizeLg="true">
    <template #action>
      <div class="iconContainer">
        <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
        <div class="cardSelection">
          <BlueprintSelection :positions="blueprintPositions"/>
        </div>
      </div>
    </template>
    <template #instruction>
      <div class="float-end ms-3">
        <BlueprintSelection :positions="blueprintPositions"/>
      </div>
      <ul>
        <li v-html="t(`rules.bot.action.${action.action}.takeBlueprints`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.freeBlueprints`)"></li>
      </ul>
      <div class="float-end ms-3">
        <AgendaCardSelection :position="cockpitPosition"/>
      </div>
      <ul>
        <li v-html="t(`rules.bot.action.${action.action}.maxSegments`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.shipLimit`)"></li>
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
import BlueprintSelection from '@/components/structure/BlueprintSelection.vue'
import getCardNumber from '@/util/getCardNumber'
import AgendaCardSelection from '@/components/structure/AgendaCardSelection.vue'

export default defineComponent({
  name: 'ActionBuildShipSegments',
  components: {
    ActionBox,
    AppIcon,
    BlueprintSelection,
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
    },
    checked: {
      type: Boolean,
      required: false
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    blueprintPositions() : number[] {
      const firstPos = getCardNumber(this.supportCard, 5)
      let secondPos = firstPos + 1
      if (secondPos > 5) {
        secondPos = 1
      }
      return [firstPos, secondPos]
    },
    cockpitPosition() : number {
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
  zoom: 0.6;
}
</style>
