<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)" :modalSizeLg="true">
    <template #action>
      <AppIcon type="action" :name="`${action.action}-${action.shipSize}`" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.bot.action.launch-ship.shipSelection', {shipSize:action.shipSize})"></p>
      <ol>
        <li v-html="t('rules.bot.action.launch-ship.shipSelectionPriority1')"></li>
        <li v-html="t('rules.bot.action.launch-ship.shipSelectionPriority2')"></li>
        <li v-html="t('rules.bot.action.launch-ship.shipSelectionPriority3')"></li>
      </ol>
      <hr/>
      <h5 v-html="t('rules.bot.action.launch-ship.step5Title')"></h5>
      <div class="float-end ms-3">
        <AgendaCardSelection :position="cruisePos"/>
      </div>
      <ul>
        <li v-html="t('rules.bot.action.launch-ship.step5Cruise')"></li>
        <li v-html="t('rules.bot.action.launch-ship.step5Guests')"></li>
        <li v-html="t('rules.bot.action.launch-ship.step5Overflow')"></li>
      <button class="btn btn-outline-secondary btn-sm mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#advertiseCruiseRulesCollapse" aria-expanded="false" aria-controls="advertiseCruiseRulesCollapse">
        {{t('rules.bot.action.advertise-cruise.title')}}
      </button>
      <div class="collapse" id="advertiseCruiseRulesCollapse">
        <div class="card card-body">
          <ul>
            <li v-html="t('rules.bot.action.advertise-cruise.addGuestsFromBottom')"></li>
            <ol>
              <li v-html="t('rules.bot.action.advertise-cruise.firstDestination')"></li>
              <li v-html="t('rules.bot.action.advertise-cruise.secondDestination')"></li>
              <li v-html="t('rules.bot.action.advertise-cruise.thirdDestination')"></li>
              <li v-html="t('rules.bot.action.advertise-cruise.repeatSteps')"></li>
            </ol>
            <li v-html="t('rules.bot.action.advertise-cruise.addFromMiddle')"></li>
            <li v-html="t('rules.bot.action.advertise-cruise.addFromTop')"></li>
            <li v-html="t('rules.bot.action.advertise-cruise.addFromSupply')"></li>
          </ul>
        </div>
      </div>
      </ul>
      <h5 v-html="t('rules.bot.action.launch-ship.step4Title')"></h5>
      <ul>
        <li v-html="t('rules.bot.action.launch-ship.step4Cube')"></li>
      </ul>
      <h5 v-html="t('rules.bot.action.launch-ship.step3Title')"></h5>
      <ul>
        <li v-html="t('rules.bot.action.launch-ship.step3Compare')"></li>
        <li v-html="t('rules.bot.action.launch-ship.step3Reputation')"></li>
        <li v-html="t('rules.bot.action.launch-ship.step3ZeroReputation')"></li>
      </ul>
      <h5 v-html="t('rules.bot.action.launch-ship.step2Title')"></h5>
      <ul>
        <li v-html="t('rules.bot.action.launch-ship.step2Score')"></li>
        <li v-html="t('rules.bot.action.launch-ship.step2FirstTime')"></li>
      </ul>
      <h5 v-html="t('rules.bot.action.launch-ship.step1Title')"></h5>
      <ul>
        <li v-html="t('rules.bot.action.launch-ship.step1Upgrade')"></li>
        <li v-html="t('rules.bot.action.launch-ship.step1Order')"></li>
      </ul>
      <h5 v-html="t('rules.bot.action.launch-ship.step0Title')"></h5>
      <ul>
        <li v-html="t('rules.bot.action.launch-ship.step0Action')"></li>
        <li v-html="t('rules.bot.action.launch-ship.step0SecondAction')"></li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import { CardAction } from '@/services/Card'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import getCardNumber from '@/util/getCardNumber'
import AgendaCardSelection from '@/components/structure/AgendaCardSelection.vue'

export default defineComponent({
  name: 'ActionLaunchShip',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    AgendaCardSelection
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    action: {
      type: Object as PropType<CardAction>,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    cruisePos() : number {
      return getCardNumber(this.navigationState.cardDeck.supportCard, 4)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3em;
}
</style>
