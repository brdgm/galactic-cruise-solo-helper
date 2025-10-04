<template>
  <ol>
    <li v-html="t('setupGame.twoPlayerGame')"></li>
    <li v-html="t('setupGame.playerBoard')"></li>
    <li v-html="t('setupGame.reputation')"></li>
    <li v-html="t('setupGame.soloTokens.title')"></li>
    <ul class="soloTokens">
      <li>
        <AppIcon type="solo-token" name="development" class="icon"/>
        <span v-html="t(`setupGame.soloTokens.development.${difficultyLevelSettings.developmentsBuildGoal}`)"></span>
      </li>
      <li>
        <AppIcon type="solo-token" name="segment" class="icon"/>
        <span v-html="t('setupGame.soloTokens.segment', {segment:difficultyLevelSettings.segmentsBuildGoal})"></span>
      </li>
      <li>
        <AppIcon type="solo-token" name="ship" class="icon"/>
        <span v-html="t('setupGame.soloTokens.ship', {ship:difficultyLevelSettings.differentShipsLaunchedGoal})"></span>
      </li>
    </ul>
    <li v-html="t('setupGame.soloWorkerCard')"></li>
    <li>
      <span v-html="t('setupGame.firstDevelopment')"></span><br/>
      <NetworkLocationDisplay :networkLocation="supportCard.number6" />
    </li>
    <li v-html="t('setupGame.discardBlueprint', {blueprint:supportCard.number4})"></li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import { useRouter } from 'vue-router'
import Card from '@/services/Card'
import CardDeck from '@/services/CardDeck'
import NetworkLocationDisplay from '../structure/NetworkLocationDisplay.vue'
import AppIcon from '../structure/AppIcon.vue'
import getDifficultyLevelSettings, { DifficultyLevelSettings } from '@/util/getDifficultyLevelSettings'

export default defineComponent({
  name: 'GameSetup',
  components: {
    NetworkLocationDisplay,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  computed: {
    supportCard() : Card {
      const cardDeck = this.state.setup.initialCardDeck ? CardDeck.fromPersistence(this.state.setup.initialCardDeck) : CardDeck.new()
      return cardDeck.supportCard
    },
    difficultyLevelSettings() : DifficultyLevelSettings {
      return getDifficultyLevelSettings(this.state.setup.difficultyLevel)
    }
  }
})
</script>

<style lang="scss" scoped>
.soloTokens {
  li {
    margin-bottom: 3px;
  }
  .icon {
    width: 40px;
    margin-right: 8px;
    filter: drop-shadow(0.15rem 0.15rem 0.15rem #aaa);
  }
}
</style>
