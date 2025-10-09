<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.call-meeting.title`)">
    <template #action>
      <AppIcon name="call-meeting" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <p v-html="t(`rules.bot.action.call-meeting.returnWorkers`)"></p>
      <template v-if="state.setup.difficultyLevelPlus">
        <DifficultyLevelIcon class="difficultyLevelIcon"/>
        <p v-html="t(`rules.bot.action.call-meeting.expertWorkersPlus`)"></p>
      </template>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import DifficultyLevelIcon from '@/components/structure/DifficultyLevelIcon.vue'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'ActionCallMeeting',
  components: {
    ActionBox,
    AppIcon,
    DifficultyLevelIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3em;
}
.difficultyLevelIcon {
  float:right;
  margin-left: 0.5rem;
  height: 2rem;
}

</style>
