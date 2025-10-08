<template>
  <ModalDialog id="companyGoalsModal" :size-lg="true" :scrollable="true" :title="t('rules.companyGoals.title')">
    <template #body>
      <p v-html="t('rules.companyGoals.check')"></p>
      <p v-html="t('rules.companyGoals.rachelGoals')"></p>
      <div class="goals">
        <div class="card text-bg-light">
          <div class="card-header">
            <AppIcon name="goal-wing" extension="svg" class="icon"/>
            {{t('rules.companyGoals.leftGoal')}}
          </div>
          <div class="card-body">
            <p v-html="t('rules.companyGoals.buildDevelopments', { count: difficultyLevelSettings.developmentsBuildGoal })"></p>
          </div>
        </div>
        <div class="card text-bg-light">
          <div class="card-header">
            <AppIcon name="goal-wing" extension="svg" class="icon"/>
            {{t('rules.companyGoals.middleGoal')}}
          </div>
          <div class="card-body">
            <p v-html="t('rules.companyGoals.buildSegments', { count: difficultyLevelSettings.segmentsBuildGoal })"></p>
          </div>
        </div>
        <div class="card text-bg-light">
          <div class="card-header">
            <AppIcon name="goal-wing" extension="svg" class="icon"/>
            {{t('rules.companyGoals.rightGoal')}}
          </div>
          <div class="card-body">
            <p v-html="t('rules.companyGoals.launchShips', { count: difficultyLevelSettings.differentShipsLaunchedGoal })"></p>
          </div>
        </div>
      </div>
      <p v-html="t('rules.companyGoals.goalCompletion')"></p>
      <p class="fst-italic" v-html="t('rules.companyGoals.note')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import { useStateStore } from '@/store/state'
import getDifficultyLevelSettings, { DifficultyLevelSettings } from '@/util/getDifficultyLevelSettings'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'CompanyGoalsModal',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    difficultyLevelSettings() : DifficultyLevelSettings {
      return getDifficultyLevelSettings(this.state.setup.difficultyLevel)
    }
  }
})
</script>

<style lang="scss" scoped>
ul > li {
  margin-top: 0.5rem;
}
.goals {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  .card {
    width: 32%;
    min-width: 180px;
  }
  .icon {
    height: 1rem;
    margin-bottom: 0.4rem;
  }
}
</style>
