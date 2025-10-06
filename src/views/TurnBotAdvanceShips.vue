<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('turnBot.title')}}
    <AppIcon type="turn" name="advance-ships" extension="svg" class="icon"/>
  </h1>

  <div class="mt-3">
    <AdvanceShipsDestinationBot/>
    <AdvanceShipsDayInSpaceBot/>
    <AdvanceShipsReturningToEarth/>
  </div>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="next(false)">
    {{t('turnBot.placeWorker')}}
  </button>
  <button class="btn btn-danger btn-lg mt-4 me-2" @click="next(true)">
    {{t('turnBot.noWorkers')}}
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
import DebugInfo from '@/components/turn/DebugInfo.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import AdvanceShipsDestinationBot from '@/components/turn/advanceShips/AdvanceShipsDestinationBot.vue'
import AdvanceShipsDayInSpaceBot from '@/components/turn/advanceShips/AdvanceShipsDayInSpaceBot.vue'
import AdvanceShipsReturningToEarth from '@/components/turn/advanceShips/AdvanceShipsReturningToEarth.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    AppIcon,
    AdvanceShipsDestinationBot,
    AdvanceShipsDayInSpaceBot,
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
    next(noWorkers: boolean) : void {
      if (noWorkers) {
        this.router.push(this.routeCalculator.getNextRouteNoWorkers())
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
</style>
