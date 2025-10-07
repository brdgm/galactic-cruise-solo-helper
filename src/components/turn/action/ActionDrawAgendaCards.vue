<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)" :checked="checked">
    <template #action>
      <div class="iconContainer">
        <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
        <div class="cardSelection">
          <AgendaCardSelection :positions="cardPositions"/>
        </div>
      </div>
    </template>
    <template #instruction>
      <div class="float-end ms-3">
        <AgendaCardSelection :positions="cardPositions"/>
      </div>
      <ul>
        <li v-html="t(`rules.bot.action.${action.action}.selection`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.minCards`)"></li>
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
import AgendaCardSelection from '@/components/structure/AgendaCardSelection.vue'
import getCardNumber from '@/util/getCardNumber'

export default defineComponent({
  name: 'ActionDrawAgendaCards',
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
    cardPositions() : number[] {
      const firstPos = getCardNumber(this.supportCard, 4)
      let secondPos = firstPos + 1
      if (secondPos > 4) {
        secondPos = 1
      }
      return [firstPos, secondPos]
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
