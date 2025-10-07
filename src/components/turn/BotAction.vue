<template>
  <component :is="`action-${cardAction.action}`" :supportCard="supportCard" :action="cardAction" :checked="checked"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card, { CardAction } from '@/services/Card'
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

export default defineComponent({
  name: 'BotAction',
  components: {
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
    supportCard: {
      type: Object as PropType<Card>,
      required: true
    },
    cardAction: {
      type: Object as PropType<CardAction>,
      required: true
    },
    checked: {
      type: Boolean,
      required: false
    }
  }
})
</script>
