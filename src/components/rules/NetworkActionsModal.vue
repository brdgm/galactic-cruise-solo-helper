<template>
  <ModalDialog id="networkActionsModal" :size-lg="true" :scrollable="true" :title="t('rules.networkActions.title')">
    <template #body>

      <div class="actionExecutedRules">
        <h5>{{t('rules.networkActions.actionExecutionSelection.title')}}</h5>
        <p v-if="isEasyDifficultyLevel">
          <button class="btn btn-success float-end ms-3" disabled>
            <AppIcon name="worker-same-action" extension="svg" class="workerIcon"/>
            <AppIcon name="action" extension="svg" class="actionIcon"/>
          </button>
          <span v-html="t('rules.networkActions.actionExecutionSelection.workerSameAction')"></span>
        </p>
        <p v-else>
          <button class="btn btn-success float-end ms-3" disabled>
            <AppIcon name="worker-same-action-connected" extension="svg" class="workerIcon"/>
            <AppIcon name="action" extension="svg" class="actionIcon"/>
          </button>
          <span v-html="t('rules.networkActions.actionExecutionSelection.workerSameActionConnected')"></span>
        </p>
        <p>
          <button class="btn btn-outline-success float-end ms-3" disabled>
            <AppIcon name="action-other" extension="svg" class="actionOtherIcon"/>
          </button>
          <span v-html="t('rules.networkActions.actionExecutionSelection.otherLocation')"></span>
        </p>
      </div>

      <h5>{{t('rules.networkActions.otherDevelopments.title')}}</h5>
      <p v-html="t('rules.networkActions.otherDevelopments.useOtherDevelopments')"></p>

      <h5>{{t('rules.networkActions.npcWorkerBumping.title')}}</h5>
      <p>{{t('rules.networkActions.npcWorkerBumping.placingWorker')}}</p>
      <ul>
        <li v-html="t('rules.networkActions.npcWorkerBumping.locationEmpty')"></li>
        <li v-html="t('rules.networkActions.npcWorkerBumping.locationOccupiedByOpponent')"></li>
        <li v-html="t('rules.networkActions.npcWorkerBumping.locationOccupiedByNPC')"></li>
        <li v-html="t('rules.networkActions.npcWorkerBumping.locationOccupiedByYourself')"></li>
      </ul>
      <p>{{t('rules.networkActions.npcWorkerBumping.expertWorkers')}}</p>

      <div v-if="hasAdvancementsExpansion" class="alert alert-info mt-4">
        <h5>{{t('rules.networkActions.advancementsExpansion.title')}}</h5>
        <ul>
          <li v-html="t('rules.networkActions.advancementsExpansion.locationBonus')"></li>
          <li v-html="t('rules.networkActions.advancementsExpansion.progressCube')"></li>
        </ul>
      </div>

    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import { useStateStore } from '@/store/state'
import AppIcon from '../structure/AppIcon.vue'
import DifficultyLevel from '../setup/DifficultyLevel.vue'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'NetworkActionsModal',
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
    isEasyDifficultyLevel() : boolean {
      return (this.state.setup.difficultyLevel == DifficultyLevel.EASY)
    },
    hasAdvancementsExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.ADVANCEMENTS)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionExecutedRules {
  .workerIcon {
    height: 2.75rem;
    margin-right: 0.5rem;
  }
  .actionIcon {
    height: 1.75rem;
    margin-top: 0.5rem;
  }
  .actionOtherIcon {
    height: 2.25rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
}
</style>
