<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('turnPlayer.title')}}
    <AppIcon type="turn" name="advance-ships" extension="svg" class="icon"/>
  </h1>

  <div class="mt-3">
    <ActionBox :instructionTitle="t('rules.advanceShips.destination.title')">
      <template #action>
        <AppIcon type="turn" name="destination" extension="svg" class="icon"/>
      </template>
      <template #instruction>
        <ul>
          <li v-html="t('rules.player.advanceShips.destination.placeUpgradeToken')"></li>
          <li v-html="t('rules.player.advanceShips.destination.payAdsForGuests')"></li>
        </ul>
      </template>
    </ActionBox>

    <ActionBox :instructionTitle="t('rules.advanceShips.dayInSpace.title')">
      <template #action>
        <AppIcon type="turn" name="day-in-space" extension="svg" class="icon"/>
      </template>
      <template #instruction>
        <ul>
          <li v-html="t('rules.player.advanceShips.dayInSpace.gainGuestBonuses')"></li>
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
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'TurnPlayer',
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
.icon {
  height: 2.5em;
}
</style>
