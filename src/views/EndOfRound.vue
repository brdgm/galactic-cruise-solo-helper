<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t(`endOfRound.title.${round}`)}}</h1>

  <div class="instructions mt-4">
    <ol class="mt-3">
      <li v-html="t('endOfRound.instructions.progressScoring', { round })"></li>
      <li>
        <span v-html="t('endOfRound.instructions.buildNpcDevelopments')"></span><br/>
        <div>
          <TechnologySelection :position="npcDevelopment.developmentPos" />
          <NetworkLocationDisplay :networkLocations="npcDevelopment.networkLocations"/>
        </div>
        <span v-html="t('endOfRound.instructions.skipIfColorExists')"></span>
      </li>
      <li v-html="t('endOfRound.instructions.hireNpcExpert')"></li>
      <ul v-if="round == 1">
        <li v-html="t('endOfRound.instructions.replaceFirstWorker')"></li>
        <li v-html="t('endOfRound.instructions.chooseClosestWorker')"></li>
      </ul>
      <ul v-if="round == 2">
        <li v-html="t('endOfRound.instructions.replaceSecondWorker')"></li>
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
