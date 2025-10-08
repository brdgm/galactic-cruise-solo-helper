<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)" :checked="checked">
    <template #action>
      <div class="iconContainer">
        <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
        <div class="selectionIcon">
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
import Card, { CardAction } from '@/services/Card'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import getCardNumber from '@/util/getCardNumber'
import TechnologySelection from '@/components/structure/TechnologySelection.vue'

export default defineComponent({
  name: 'ActionBuildDevelopmentTechnology',
  components: {
    ActionBox,
    AppIcon,
    TechnologySelection
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
    technologyPosition() : number {
      return getCardNumber(this.supportCard, 4)
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
