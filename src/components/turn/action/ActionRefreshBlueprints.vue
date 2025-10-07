<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)" :checked="checked">
    <template #action>
      <AppIcon type="action" :name="action.action" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <p v-html="t(`rules.bot.action.${action.action}.refresh`)"></p>
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
  name: 'ActionRefreshBlueprints',
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
    },
    checked: {
      type: Boolean,
      required: false
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
