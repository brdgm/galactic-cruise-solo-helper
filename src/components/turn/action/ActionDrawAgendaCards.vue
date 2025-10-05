<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)" :modalSizeLg="true">
    <template #action>
      <div class="drawAgendaCardsContainer">
        <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
        <div class="agendaCards">
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
import NavigationState from '@/util/NavigationState'
import { CardAction } from '@/services/Card'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import AgendaCardSelection from '@/components/structure/AgendaCardSelection.vue'
import getCardNumber from '@/util/getCardNumber'

export default defineComponent({
  name: 'ActionDrawAgendaCards',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    AgendaCardSelection
  },
  props: {
    navigationState: {
      type: NavigationState,
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
    cardPositions() : number[] {
      const firstPos = getCardNumber(this.navigationState.cardDeck.supportCard, 4)
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
.drawAgendaCardsContainer {
  display: flex;
  align-items: center;
  gap: 1em;
}
.agendaCards {
  zoom: 0.5;
}
</style>
