<template>
  <div v-for="(action,index) in currentCard?.actions" :key="index">
    <component :is="`action-${action.action}`" :navigationState="navigationState" :action="action"/>
  </div>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next(false)">
    {{t('action.next')}}
  </button>
  <EndRoundButton :round="navigationState.round" @endRound="next(true)"/>

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

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: (_endRound: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
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
    ActionRefreshBlueprints
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()

    const { currentCard, supportCard } = props.navigationState.cardDeck

    return { t, currentCard, supportCard }
  },
  data() {
    return {
    }
  },
  methods: {
    next(endRound: boolean) : void {
      this.$emit('next', endRound)
    }
  }
})
</script>
