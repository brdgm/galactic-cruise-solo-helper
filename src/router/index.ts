import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupApp from '@/views/SetupApp.vue'
import SetupGame from '@/views/SetupGame.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'
import EndOfRound from '@/views/EndOfRound.vue'
import TurnBot from '@/views/TurnBot.vue'
import EndOfGame from '@/views/EndOfGame.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  { 
    path: '/setup',
    name: 'SetupApp',
    component: SetupApp
  },
  { 
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/turn/:turn/player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/turn/:turn/player/endOfRound',
    name: 'TurnPlayerEndOfRound',
    component: EndOfRound
  },
  {
    path: '/turn/:turn/bot',
    name: 'TurnBot',
    component: TurnBot
  },
  {
    path: '/turn/:turn/bot/endOfRound',
    name: 'TurnBotEndOfRound',
    component: EndOfRound
  },
  {
    path: '/turn/:turn/endOfGame',
    name: 'GameEnd',
    component: EndOfGame
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')