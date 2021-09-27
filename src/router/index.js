import Vue from 'vue'
import VueRouter from 'vue-router'

import Comparator from '../components/Comparator.vue'
import Data from '../components/Data.vue'
import Home from '../views/Home.vue'
import Player from '../components/Player.vue'
import Players from '../components/Players.vue'
import Team from '../components/Team.vue'
import Teams from '../components/Teams.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/oro/teams',
    name: 'OroTeams',
    component: Teams,
    props: {
      category: 'oro'
    }
  },
  {
    path: '/plata/teams',
    name: 'PlataTeams',
    component: Teams,
    props: {
      category: 'plata'
    }
  },
  {
    path: '/oro/players',
    name: 'OroPlayers',
    component: Players,
    props: {
      category: 'oro'
    }
  },
  {
    path: '/plata/players',
    name: 'PlataPlayers',
    component: Players,
    props: {
      category: 'plata'
    }
  },
  {
    path: '/oro/team/:team',
    name: 'OroTeam',
    component: Team,
    props: {
      category: 'oro'
    }
  },
  {
    path: '/plata/team/:team',
    name: 'PlataTeam',
    component: Team,
    props: {
      category: 'plata'
    }
  },
  {
    path: '/oro/player/:team/:player',
    name: 'OroPlayer',
    component: Player,
    props: {
      category: 'oro'
    }
  },
  {
    path: '/plata/player/:team/:player',
    name: 'PlataPlayer',
    component: Player,
    props: {
      category: 'plata'
    }
  }, 
  {
    path: '/oro/comparator',
    name: 'OroComparator',
    component: Comparator,
    props: {
      category: 'oro'
    }
  },
  {
    path: '/plata/comparator',
    name: 'PlataComparator',
    component: Comparator,
    props: {
      category: 'plata'
    }
  }, 
  {
    path: '/oro/data',
    name: 'OroData',
    component: Data,
    props: {
      category: 'oro'
    }
  },
  {
    path: '/plata/data',
    name: 'PlataData',
    component: Data,
    props: {
      category: 'plata'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
