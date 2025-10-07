<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)">
    <template #action>
      <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t(`rules.bot.action.${action.action}.selection`)"></li>
        <li v-html="t(`rules.bot.action.${action.action}.refill`)"></li>
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

export default defineComponent({
  name: 'ActionRefillStorageSilo',
  components: {
    ActionBox,
    AppIcon
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
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 4.5em;
}
</style>
