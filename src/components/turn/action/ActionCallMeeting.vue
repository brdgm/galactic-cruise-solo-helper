<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.call-meeting.title`)">
    <template #action>
      <AppIcon name="call-meeting" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <p v-html="t(`rules.bot.action.call-meeting.returnWorkers`)"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionCallMeeting',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon
  },
  props: {
    navigationState: {
      type: NavigationState,
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
  height: 3em;
}
</style>
