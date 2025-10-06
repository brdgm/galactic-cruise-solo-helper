<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)">
    <template #action>
      <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t(`rules.bot.action.${action.action}.firstExpert`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.addToBreakRoom`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.secondExpert`)"></li>
      </ul>
      <p v-if="isEasyDifficultyLevel" class="fw-bold" v-html="t(`rules.bot.action.${action.action}.easyDifficulty`)"></p>
      <p v-else class="fw-bold" v-html="t(`rules.bot.action.${action.action}.normalDifficulty`)"></p>
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
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'ActionHireExpertWorkerBot',
  components: {
    ActionBox,
    AppIcon
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
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    isEasyDifficultyLevel() : boolean {
      return this.state.setup.difficultyLevel == DifficultyLevel.EASY
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3em;
}
</style>
