<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('turnBot.title')}}</h1>

  <BotActions :navigationState="navigationState" @next="next"/>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/turn/SideBar.vue'
import Player from '@/services/enum/Player'
import DebugInfo from '@/components/turn/DebugInfo.vue'
import BotActions from '@/components/turn/BotActions.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    BotActions
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { turn, routeCalculator } = navigationState

    return { t, router, state, turn, navigationState, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    }
  },
  methods: {
    next(endOfRound: boolean) : void {
      this.state.storeTurn({
        turn: this.turn,
        round: this.navigationState.round,
        player: Player.BOT,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence()
        }
      })
      if (endOfRound) {
        this.router.push(this.routeCalculator.getNextRouteToEndOfRound())
      }
      else {
        this.router.push(this.routeCalculator.getNextRouteTo())
      }
    }
  }
})
</script>
