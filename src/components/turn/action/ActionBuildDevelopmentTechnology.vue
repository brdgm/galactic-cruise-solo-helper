<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)">
    <template #action>
      <div class="iconContainer">
        <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
        <div class="cardSelection">
          <TechnologySelection :position="technologyPosition"/>
        </div>
      </div>
    </template>
    <template #instruction>
      <div class="float-end ms-3">
        <TechnologySelection :position="technologyPosition"/>
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
import NavigationState from '@/util/NavigationState'
import { CardAction } from '@/services/Card'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import getCardNumber from '@/util/getCardNumber'
import TechnologySelection from '@/components/structure/TechnologySelection.vue'

export default defineComponent({
  name: 'ActionBuildDevelopmentTechnology',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    TechnologySelection
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
    technologyPosition() : number {
      return getCardNumber(this.navigationState.cardDeck.supportCard, 4)
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
.cardSelection {
  zoom: 0.6;
}
</style>
