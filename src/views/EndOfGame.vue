<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <table class="table table-bordered table-striped">
    <thead>
      <tr class="table-secondary">
        <th>{{t('endOfGame.condition')}}</th>
        <th>{{t('turnPlayer.title')}}</th>
        <th>{{t('turnBot.title')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{t('endOfGame.scoreTrack')}}</td>
        <td><NumberInput v-model="scoreTrackVP[0]" class="number"/></td>
        <td><NumberInput v-model="scoreTrackVP[1]" class="number"/></td>
      </tr>
      <tr>
        <td>
          <div>{{t('endOfGame.cockpit')}}</div>
          <div class="small fst-italic" v-html="t('endOfGame.botCockpitScoring')"></div>
        </td>
        <td><NumberInput v-model="cockpitVP[0]" class="number"/></td>
        <td><NumberInput v-model="cockpitVP[1]" class="number"/></td>
      </tr>
      <tr>
        <td>{{t('endOfGame.developments')}}</td>
        <td><NumberInput v-model="developmentsVP[0]" class="number"/></td>
        <td><NumberInput v-model="developmentsVP[1]" class="number"/></td>
      </tr>
      <tr>
        <td>{{t('endOfGame.reputation')}}</td>
        <td><NumberInput v-model="reputationVP[0]" class="number"/></td>
        <td><NumberInput v-model="reputationVP[1]" class="number"/></td>
      </tr>
      <tr>
        <td>{{t('endOfGame.shipSegments')}}</td>
        <td><NumberInput v-model="shipSegmentsVP[0]" class="number"/></td>
        <td><NumberInput v-model="shipSegmentsVP[1]" class="number"/></td>
      </tr>
      <tr>
        <td>{{t('endOfGame.progressSection3')}}</td>
        <td><NumberInput v-model="progressSection3VP[0]" class="number"/></td>
        <td><NumberInput v-model="progressSection3VP[1]" class="number"/></td>
      </tr>
      <tr>
        <td>{{t('endOfGame.supplies')}}</td>
        <td></td>
        <td><NumberInput v-model="suppliesVP[1]" class="number"/></td>
      </tr>
      <tr>
        <td class="fw-bold">{{t('endOfGame.total')}}</td>
        <td class="fw-bold">{{totalVP[0]}}</td>
        <td class="fw-bold">{{totalVP[1]}}</td>
      </tr>
    </tbody>
  </table>

  <p class="small">{{t('setup.difficultyLevel.title')}}: <b>{{t(`difficultyLevel.${state.setup.difficultyLevel}`)}}</b></p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    NumberInput
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
      scoreTrackVP: [] as number[],
      cockpitVP: [] as number[],
      developmentsVP: [] as number[],
      reputationVP: [] as number[],
      shipSegmentsVP: [] as number[],
      progressSection3VP: [] as number[],
      suppliesVP: [] as number[]
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    },
    totalVP() : number[] {
      const result = [] as number[]
      for (const player of [0,1]) {
        result[player] = toNumber(this.scoreTrackVP[player])
          + toNumber(this.cockpitVP[player])
          + toNumber(this.developmentsVP[player])
          + toNumber(this.reputationVP[player])
          + toNumber(this.shipSegmentsVP[player])
          + toNumber(this.progressSection3VP[player])
          + toNumber(this.suppliesVP[player])
      }
      return result
    }
  }
})
</script>

<style lang="scss" scoped>
.number {
  width: 5rem;
}
</style>