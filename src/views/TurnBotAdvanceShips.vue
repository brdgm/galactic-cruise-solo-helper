<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('turnBot.title')}}
    <AppIcon type="turn" name="advance-ships" extension="svg" class="icon"/>
  </h1>

  <div class="mt-3">
    <ActionBox :instructionTitle="t('rules.advanceShips.destination.title')">
      <template #action>
        <AppIcon type="turn" name="destination-bot" extension="svg" class="icon"/>
      </template>
      <template #instruction>
        <ul>
          <li v-html="t('rules.bot.advanceShips.destination.placeUpgradeToken')"></li>
          <li v-html="t('rules.bot.advanceShips.destination.payAdsForGuests')"></li>
        </ul>
        <p class="fst-italic small" v-html="t('rules.bot.advanceShips.destination.fourthToken')"></p>
      </template>
    </ActionBox>

    <ActionBox :instructionTitle="t('rules.advanceShips.dayInSpace.title')">
      <template #action>
        <AppIcon type="turn" name="day-in-space-bot" extension="svg" class="icon"/>
      </template>
      <template #instruction>
        <ul>
          <li v-html="t('rules.bot.advanceShips.dayInSpace.gainGuestBonuses')"></li>
        </ul>
      </template>
    </ActionBox>

    <ActionBox :instructionTitle="t('rules.advanceShips.returningToEarth.title')">
      <template #action>
        <AppIcon type="turn" name="returning-to-earth" extension="svg" class="icon"/>
      </template>
      <template #instruction>
        <ul>
          <li v-html="t('rules.advanceShips.returningToEarth.returnWorker')"></li>
          <li v-html="t('rules.advanceShips.returningToEarth.discardCruiseAndGuests')"></li>
        </ul>
      </template>
    </ActionBox>
  </div>

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
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    ActionBox,
    AppIcon
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
h1 .icon {
  height: 1.5em;
}
.icon {
  height: 2.5em;
}
</style>
