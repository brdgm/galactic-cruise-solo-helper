<template>
  <template v-if="isNoWorkers">
    <ActionCallMeeting :navigationState="navigationState"/>
  </template>
  <template v-else>
    <ActionPlaceWorker :navigationState="navigationState"/>
  </template>

  <template v-if="cardAction">
    <component :is="`action-${cardAction.action}`" :navigationState="navigationState" :action="cardAction"/>
  </template>

  <template v-if="cardActionExecuted">
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next(false)">
      {{t('action.next')}}
    </button>
    <EndRoundButton :round="navigationState.round" @endRound="next(true)"/>
  </template>
  <template v-else>
    <button class="btn btn-success btn-lg mt-4 me-2" @click="actionExecuted">
      {{t('turnBot.actionExecuted')}}
    </button>
    <button class="btn btn-danger btn-lg mt-4 me-2" @click="actionNotPossible">
      {{t('turnBot.notPossible')}}
    </button>
  </template>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import ActionDrawAgendaCards from './action/ActionDrawAgendaCards.vue'
import ActionAdvertiseCruise from './action/ActionAdvertiseCruise.vue'
import ActionBuildDevelopmentNetwork from './action/ActionBuildDevelopmentNetwork.vue'
import ActionBuildDevelopmentTechnology from './action/ActionBuildDevelopmentTechnology.vue'
import ActionBuildShipSegments from './action/ActionBuildShipSegments.vue'
import ActionGainResources from './action/ActionGainResources.vue'
import ActionHireExpertWorkerBot from './action/ActionHireExpertWorkerBot.vue'
import ActionLaunchShip from './action/ActionLaunchShip.vue'
import ActionRefillAgendaCards from './action/ActionRefillAgendaCards.vue'
import ActionRefillStorageSilo from './action/ActionRefillStorageSilo.vue'
import ActionRefreshBlueprints from './action/ActionRefreshBlueprints.vue'
import EndRoundButton from './EndRoundButton.vue'
import ActionCallMeeting from './action/ActionCallMeeting.vue'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ActionPlaceWorker from './action/ActionPlaceWorker.vue'
import { CardAction } from '@/services/Card'

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: (_endRound: boolean) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars
    actionNotPossible: () => true
  },
  components: {
    AppIcon,
    EndRoundButton,
    ActionAdvertiseCruise,
    ActionBuildDevelopmentNetwork,
    ActionBuildDevelopmentTechnology,
    ActionBuildShipSegments,
    ActionDrawAgendaCards,
    ActionGainResources,
    ActionHireExpertWorkerBot,
    ActionLaunchShip,
    ActionRefillAgendaCards,
    ActionRefillStorageSilo,
    ActionRefreshBlueprints,
    ActionCallMeeting,
    ActionPlaceWorker
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const state = useStateStore()

    const { currentCard, supportCard } = props.navigationState.cardDeck

    return { t, state, currentCard, supportCard }
  },
  data() {
    return {
      cardActionExecuted: false
    }
  },
  computed: {
    isNoWorkers() : boolean {
      return this.navigationState.noWorkers
    },
    isHardDifficultyMode() : boolean {
      return this.state.setup.difficultyLevel == DifficultyLevel.HARD
    },
    cardAction() : CardAction|undefined {
      if (this.isNoWorkers && !this.isHardDifficultyMode) {
        return undefined
      }
      return this.currentCard?.actions[this.navigationState.action % 2]
    }
  },
  methods: {
    next(endRound: boolean) : void {
      this.$emit('next', endRound)
    },
    actionExecuted() : void {
      this.cardActionExecuted = true
    },
    actionNotPossible() : void {
      this.$emit('actionNotPossible')
    }
  }
})
</script>
