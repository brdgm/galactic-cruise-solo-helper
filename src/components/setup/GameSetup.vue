<template>
  <h3>{{t('setupGame.gameBoard.title')}}</h3>
  <ol>
    <li v-html="t('setupGame.gameBoard.twoPlayerGame')"></li>
    <li>
      <span v-html="t('setupGame.gameBoard.neutralDevelopments')"></span><br/>
      <TechnologySelection :position="neutralDevelopment.developmentPos" />
      <NetworkLocationDisplay :networkLocations="neutralDevelopment.networkLocations"/>
    </li>
    <li>
      <span v-html="t('setupGame.gameBoard.npcWorkers')"></span><br/>
      <WorkerLocationDisplay :workerLocations="neutralDevelopment.networkLocations" />
    </li>
  </ol>
  <h3>{{t('setupGame.bot.title')}}</h3>
  <ol>
    <li v-html="t('setupGame.bot.playerBoard')"></li>
    <li v-html="t('setupGame.bot.reputation')"></li>
    <li v-html="t('setupGame.bot.soloTokens.title')"></li>
    <ul class="soloTokens">
      <li>
        <AppIcon type="solo-token" name="development" class="icon"/>
        <span v-html="t(`setupGame.bot.soloTokens.development.${difficultyLevelSettings.developmentsBuildGoal}`)"></span>
      </li>
      <li>
        <AppIcon type="solo-token" name="segment" class="icon"/>
        <span v-html="t('setupGame.bot.soloTokens.segment', {segment:difficultyLevelSettings.segmentsBuildGoal})"></span>
      </li>
      <li>
        <AppIcon type="solo-token" name="ship" class="icon"/>
        <span v-html="t('setupGame.bot.soloTokens.ship', {ship:difficultyLevelSettings.differentShipsLaunchedGoal})"></span>
      </li>
    </ul>
    <li v-html="t('setupGame.bot.soloWorkerCard')"></li>
    <li>
      <span v-html="t('setupGame.bot.firstDevelopment')"></span><br/>
      <NetworkLocationDisplay :networkLocation="botFirstDevelopmentNetworkLocation" />
    </li>
    <li>
      <span v-html="t('setupGame.bot.discardBlueprint')"></span>
      <BlueprintSelection :position="blueprintNumber" />
    </li>
  </ol>

  <div class="row">
    <div class="col">
      <div class="alert alert-success actionExecutedRules">
        <h5>{{t('setupGame.bot.actionExecutionSelection.title')}}</h5>
        <ul>
          <li v-if="isEasyDifficultyLevel">
            <AppIcon name="worker-same-action" extension="svg" class="workerIcon"/>
            <AppIcon name="action" extension="svg" class="actionIcon"/>
            <div v-html="t('setupGame.bot.actionExecutionSelection.workerSameAction')"></div>
          </li>
          <li v-else>
            <AppIcon name="worker-same-action-connected" extension="svg" class="workerIcon"/>
            <AppIcon name="action" extension="svg" class="actionIcon"/>
            <div v-html="t('setupGame.bot.actionExecutionSelection.workerSameActionConnected')"></div>
          </li>
          <li>
            <AppIcon name="action-other" extension="svg" class="actionOtherIcon"/>
            <div v-html="t('setupGame.bot.actionExecutionSelection.otherLocation')"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { DevelopmentSetup, useStateStore } from '@/store/state'
import { useRouter } from 'vue-router'
import Card from '@/services/Card'
import CardDeck from '@/services/CardDeck'
import NetworkLocationDisplay from '../structure/NetworkLocationDisplay.vue'
import AppIcon from '../structure/AppIcon.vue'
import getDifficultyLevelSettings, { DifficultyLevelSettings } from '@/util/getDifficultyLevelSettings'
import DevelopmentTile from '@/services/DevelopmentTile'
import getDevelopmentSetup from '@/util/getDevelopmentSetup'
import TechnologySelection from '../structure/TechnologySelection.vue'
import WorkerLocationDisplay from '../structure/WorkerLocationDisplay.vue'
import BlueprintSelection from '../structure/BlueprintSelection.vue'
import getCardNumber from '@/util/getCardNumber'
import DifficultyLevel from './DifficultyLevel.vue'

export default defineComponent({
  name: 'GameSetup',
  components: {
    TechnologySelection,
    NetworkLocationDisplay,
    WorkerLocationDisplay,
    BlueprintSelection,
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
    },
    developmentSetup() : DevelopmentSetup {
      return this.state.setup.developmentSetup ?? getDevelopmentSetup()
    },
    neutralDevelopment() : DevelopmentTile {
      return this.developmentSetup.neutral
    },
    npcDevelopment() : DevelopmentTile {
      return this.developmentSetup.npc[0]
    },
    botFirstDevelopmentNetworkLocation() : number {
      let location = getCardNumber(this.supportCard, 6)
      while (this.neutralDevelopment.networkLocations.includes(location)) {
        location++
        if (location > 6) {
          location = 1
        }
      }
      return location
    },
    blueprintNumber() : number {
      return getCardNumber(this.supportCard, 5)
    },
    isEasyDifficultyLevel() : boolean {
      return (this.state.setup.difficultyLevel == DifficultyLevel.EASY)
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
.actionExecutedRules {
  ul {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  li {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .workerIcon {
    height: 2.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
  }
  .actionIcon {
    height: 1.75rem;
    margin-top: 0.5rem;
    margin-right: 0.75rem;
    margin-bottom: 0.25rem;
  }
  .actionOtherIcon {
    height: 2.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
    margin-right: 0.75rem;
  }
}
</style>
