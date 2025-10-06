<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)">
    <template #action>
      <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t(`rules.bot.action.${action.action}.reputation`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.refill`)"></li>
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

export default defineComponent({
  name: 'ActionRefillAgendaCards',
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
    return { t }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2.5em;
}
</style>
