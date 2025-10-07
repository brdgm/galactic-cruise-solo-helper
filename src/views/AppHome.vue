<template>

  <div class="float-end m-2 w-25">
    <a href="https://boardgamegeek.com/boardgame/391137/galactic-cruise" target="_blank" rel="noopener">
      <img src="../assets/game-galactic-cruise.webp" class="rounded shadow w-100 mb-3" alt=""/>
    </a>
  </div>

  <h1>{{t('home.title')}}</h1>

  <p v-html="t('home.play1')"></p>
  <p v-html="t('home.play2')"></p>
<!--
  <p class="text-muted fst-italic">
    {{t('home.feedback')}}
    <a href="https://boardgamegeek.com/thread/3579650/XXX" target="_blank" rel="noopener">Board Game Geek Thread</a> |
    <a href="https://github.com/brdgm/galactic-cruise-solo-helper" target="_blank" rel="noopener">GitHub</a>
  </p>
-->
  <router-link to="/setup" class="btn btn-primary btn-lg mt-3">{{t('action.playGame')}}</router-link>

  <p class="disclaimer">
    This is not an official Kinsom Key Games product and has no affiliation with <a href="https://www.kinsonkeygames.com/" target="_blank" rel="noopener">Kinsom Key Games</a>.
    All art in this app is from <a href="https://boardgamegeek.com/boardgame/391137/galactic-cruise" target="_blank" rel="noopener">Galactic Cruise</a>.
    See <a href="#" data-bs-toggle="modal" data-bs-target="#creditsModal">{{t('footer.credits')}}</a>.
    <a href="https://ko-fi.com/brdgm_me" target="_blank" rel="noopener"><img class="kofi-button" src="@/assets/kofi_button_dark.png" alt="Support me on Ko-fi"/></a>
  </p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppHome',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
.disclaimer {
  clear: both;
  margin-top: 4rem;
  font-size: smaller;
}
.kofi-button {
  height: 1.4rem;
}
</style>
