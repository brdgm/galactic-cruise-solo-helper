<template>
  <template v-if="isNoWorkers">
    <ActionCallMeeting/>
  </template>
  <template v-else-if="!isFirstActionLaunchShip">
    <ActionPlaceWorker :supportCard="supportCard"/>
  </template>

  <template v-if="firstAction && firstActionSupportCard">
    <BotActionBox :supportCard="firstActionSupportCard" :cardAction="firstAction" :checked="true"/>
  </template>

  <template v-if="cardAction && !noActionPossible">
    <BotActionBox :supportCard="supportCard" :cardAction="cardAction" :checked="cardActionExecuted"/>
  </template>

  <template v-if="cardActionExecuted || noActionPossible || !cardAction">
    <div clasS="mt-3">
      <button class="btn btn-outline-secondary" data-bs-toggle="modal" href="#companyGoalsModal">{{t('turnBot.checkCompanyGoals')}}</button>
    </div>
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next(false)">
      {{t('action.next')}}
    </button>
    <EndRoundButton :round="navigationState.round" @endRound="next(true)"/>
  </template>
  <template v-else>
    <template v-if="action > 1 || !matchingAction || isNoWorkers">
      <button class="btn btn-success btn-lg mt-4 me-2" @click="actionExecuted(false)">
        {{t('turnBot.actionExecuted')}}<br/>
      </button>
    </template>
    <template v-else>
      <button class="btn btn-success btn-lg mt-4 me-2" @click="actionExecuted(true)" v-if="matchingAction">
        {{t('turnBot.actionExecuted')}}<br/>
        <AppIcon :name="workerSameActionIcon" extension="svg" class="workerIcon"/>
        <AppIcon type="action" :name="matchingAction" extension="svg" class="icon"/>
      </button>
      <button class="btn btn-outline-success btn-lg mt-4 me-2" @click="actionExecuted(false)">
        {{t('turnBot.actionExecuted')}}<br/>
        <AppIcon name="action-other" extension="svg" class="actionOtherIcon"/>
      </button>
    </template>
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
import EndRoundButton from './EndRoundButton.vue'
import ActionCallMeeting from './action/ActionCallMeeting.vue'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ActionPlaceWorker from './action/ActionPlaceWorker.vue'
import Card, { CardAction } from '@/services/Card'
import Action from '@/services/enum/Action'
import getMatchingAction from '@/util/getMatchingAction'
import BotActionBox from './BotActionBox.vue'
import BotAction from '@/services/enum/BotAction'

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: (_endRound: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon,
    EndRoundButton,
    BotActionBox,
    ActionCallMeeting,
    ActionPlaceWorker
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      action: 0,
      cardActionExecuted: false,
      noActionPossible: false,
      firstActionSupportCard: undefined as Card|undefined,
      firstAction: undefined as CardAction|undefined
    }
  },
  computed: {
    currentCard() : Card|undefined {
      return this.navigationState.cardDeck.currentCard
    },
    supportCard() : Card {
      return this.navigationState.cardDeck.supportCard
    },
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
      return this.currentCard?.actions[this.action % 2]
    },
    isFirstActionLaunchShip() : boolean {
      return this.firstAction == undefined && this.cardAction?.action == BotAction.LAUNCH_SHIP
    },
    matchingAction() : Action|undefined {
      return this.cardAction ? getMatchingAction(this.cardAction.action) : undefined
    },
    workerSameActionIcon() : string {
      if (this.state.setup.difficultyLevel == DifficultyLevel.EASY) {
        return 'worker-same-action'
      }
      else {
        return 'worker-same-action-connected'
      }
    }
  },
  methods: {
    next(endRound: boolean) : void {
      this.$emit('next', endRound)
    },
    actionExecuted(anotherAction: boolean) : void {
      if (anotherAction) {
        this.firstActionSupportCard = this.supportCard
        this.firstAction = this.cardAction
        this.navigationState.cardDeck.draw()
        this.action = 2
      }
      else {
        this.cardActionExecuted = true
      }
    },
    actionNotPossible() : void {
      if (this.action % 2 == 1) {
        this.noActionPossible = true
      }
      else {
        this.action++
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.btn {
  .workerIcon {
    height: 2.75rem;
    margin-right: 0.5rem;
  }
  .icon {
    height: 3rem;
    width: 3rem;
    object-fit: contain;
  }
  .actionOtherIcon {
    height: 2.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }
}
</style>
