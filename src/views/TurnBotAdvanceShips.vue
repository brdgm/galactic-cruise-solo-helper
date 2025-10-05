<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('turnBot.title')}}</h1>

  <h3>
    <AppIcon type="turn" name="advance-ships" extension="svg" class="icon"/>
    <span>Advance Ships</span>
  </h3>

  <p>...</p>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next(false)">
    {{t('action.next')}}
  </button>

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

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo
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

<style lang="scss" scoped>
h3 {
  display: flex;
  align-items: center;
  gap: 0.25em;
  .icon {
    height: 1.5em;
  }
}
.icon {
  height: 2.5em;
}
</style>
