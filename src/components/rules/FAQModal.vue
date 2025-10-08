<template>
  <ModalDialog id="faqModal" :title="t('rules.faq.title')">
    <template #body>
      <ul>
        <li><a href="https://boardgamegeek.com/thread/3442520/galactic-cruise-faq-living-document" target="_blank" rel="noopener">Galactic Cruise FAQ (Living Document)</a></li>
        <li><a href="https://boardgamegeek.com/thread/3509177/easily-overlooked-rules-and-other-clarifications" target="_blank" rel="noopener">Easily Overlooked Rules and Other Clarifications</a></li>
      </ul>
      <h6>{{t('rules.faq.botRuleModifications')}}</h6>
      <ul>
        <li><a href="https://boardgamegeek.com/thread/3501010/official-rules-modification-for-solo-games" target="_blank" rel="noopener">OFFICIAL Rules Modification for SOLO Games</a></li>
        <li><a href="https://boardgamegeek.com/thread/3473683/solo-automa-segments-built-company-goal-question" target="_blank" rel="noopener">Solo automa segments built company goal question</a></li>
      </ul>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'FAQModal',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
