<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <p>...</p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
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
  data() {
    return {
      botInfluenceMakerVP: undefined as number|undefined,
      playerQuestCount: undefined as number|undefined,
      playerShipUpgrades: undefined as number|undefined,
      botExplorerStepsAhead: undefined as number|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    }
  }
})
</script>

<style lang="scss" scoped>
.number {
  width: 5rem;
}
.finalScore {
  font-size: 1.25rem;
}
</style>