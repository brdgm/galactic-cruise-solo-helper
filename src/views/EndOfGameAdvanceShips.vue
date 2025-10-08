<template>
  <h1>
    {{t('endOfGameAdvanceShips.title')}}
    <AppIcon type="turn" name="advance-ships-end-of-game" extension="svg" class="icon"/>
  </h1>

  <div class="row">
    <div class="col">
      <p class="alert alert-info">
        <span v-html="t('endOfGameAdvanceShips.lastMovement')"></span><br/>
        <span v-html="t('endOfGameAdvanceShips.botDestination')"></span>
      </p>
    </div>
  </div>

  <div class="advancement">
    <div>
      <h4>{{t('turnPlayer.title')}}</h4>
      <AdvanceShipsDestination/>
      <AdvanceShipsDayInSpace/>
      <AdvanceShipsReturningToEarth/>
    </div>
    <div>
      <h4>{{t('turnBot.title')}}</h4>
      <AdvanceShipsDestinationBot/>
      <AdvanceShipsDayInSpaceBot/>
      <AdvanceShipsReturningToEarth/>
    </div>
  </div>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import AdvanceShipsDestination from '@/components/turn/advanceShips/AdvanceShipsDestination.vue'
import AdvanceShipsDayInSpace from '@/components/turn/advanceShips/AdvanceShipsDayInSpace.vue'
import AdvanceShipsReturningToEarth from '@/components/turn/advanceShips/AdvanceShipsReturningToEarth.vue'
import AdvanceShipsDestinationBot from '@/components/turn/advanceShips/AdvanceShipsDestinationBot.vue'
import AdvanceShipsDayInSpaceBot from '@/components/turn/advanceShips/AdvanceShipsDayInSpaceBot.vue'

export default defineComponent({
  name: 'EndOfGameAdvanceShips',
  components: {
    FooterButtons,
    AppIcon,
    AdvanceShipsDestination,
    AdvanceShipsDayInSpace,
    AdvanceShipsReturningToEarth,
    AdvanceShipsDestinationBot,
    AdvanceShipsDayInSpaceBot
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { routeCalculator } = navigationState

    return { t, router, state, navigationState, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    }
  },
  methods: {
    next() : void {
      this.router.push(`/turn/${this.navigationState.turn}/endOfGame`)
    }
  }
})
</script>

<style lang="scss" scoped>
h1 .icon {
  height: 2em;
}
.advancement {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
