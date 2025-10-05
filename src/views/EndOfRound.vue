<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t(`endOfRound.title.${round}`)}}</h1>

  <div class="instructions mt-4">
    <ol class="mt-3">
      <li>Execute the progress scoring for Section {{round}} for Rachel and yourself.</li>
      <li>
        <span>Build NPC developments:</span><br/>
        <div>
          <TechnologySelection :position="npcDevelopment.developmentPos" />
          <NetworkLocationDisplay :networkLocations="npcDevelopment.networkLocations"/>
        </div>
        <span>If there is already a Development of that color in the depicted area, skip that placement.</span>
      </li>
      <li>Hire NPC Expert</li>
      <ul v-if="round == 1">
        <li>Replace one NPC Worker with one NPC Expert Worker.</li>
        <li>Choose the NPC Worker closest to the top middle location going clockwise.</li>
      </ul>
      <ul v-if="round == 2">
        <li>Replace the other NPC Worker with an NPC Expert Worker.</li>
      </ul>
    </ol>
  </div>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { DevelopmentSetup, useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/turn/SideBar.vue'
import DevelopmentTile from '@/services/DevelopmentTile'
import getDevelopmentSetup from '@/util/getDevelopmentSetup'
import TechnologySelection from '@/components/structure/TechnologySelection.vue'
import NetworkLocationDisplay from '@/components/structure/NetworkLocationDisplay.vue'

export default defineComponent({
  name: 'EndOfRound',
  components: {
    FooterButtons,
    SideBar,
    TechnologySelection,
    NetworkLocationDisplay
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, routeCalculator } = navigationState

    return { t, router, state, round, turn, navigationState, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    },
    developmentSetup() : DevelopmentSetup {
      return this.state.setup.developmentSetup ?? getDevelopmentSetup()
    },
    npcDevelopment() : DevelopmentTile {
      return this.developmentSetup.npc[this.round]
    }
  },
  methods: {
    next() : void {
      this.state.storeTurn({
        turn: this.turn,
        round: this.navigationState.round,
        player: this.routeCalculator.currentPlayer,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence()
        },
        endOfRound: true
      })
      this.router.push(this.routeCalculator.getNextRouteTo())
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 1rem;
  }
}
</style>
