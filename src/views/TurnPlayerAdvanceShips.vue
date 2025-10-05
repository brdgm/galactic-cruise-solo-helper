<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('turnPlayer.title')}}
    <AppIcon type="turn" name="advance-ships" extension="svg" class="icon"/>
  </h1>

  <div class="row" v-if="navigationState.lastRound">
    <div class="col">
      <p class="alert alert-info" v-html="t('turnPlayer.lastRoundInfo')"></p>
    </div>
  </div>

  <div class="mt-3">
    <AdvanceShipsDestination/>
    <AdvanceShipsDayInSpace/>
    <AdvanceShipsReturningToEarth/>
  </div>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/turn/SideBar.vue'
import DebugInfo from '@/components/turn/DebugInfo.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import AdvanceShipsDestination from '@/components/turn/advanceShips/AdvanceShipsDestination.vue'
import AdvanceShipsDayInSpace from '@/components/turn/advanceShips/AdvanceShipsDayInSpace.vue'
import AdvanceShipsReturningToEarth from '@/components/turn/advanceShips/AdvanceShipsReturningToEarth.vue'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    AppIcon,
    AdvanceShipsDestination,
    AdvanceShipsDayInSpace,
    AdvanceShipsReturningToEarth
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
    next() : void {
      this.router.push(this.routeCalculator.getNextRouteTo())
    }
  }
})
</script>

<style lang="scss" scoped>
h1 .icon {
  height: 1.5em;
}
</style>
