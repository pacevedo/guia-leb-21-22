<template>
  <div class="comparator">
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col cols="6" sm="6" md="6">
          <h2>Jugador 1</h2>
          <div class="select-team">
            <v-select
            v-model="team1"
            :items="teams"
            item-text="team"
            item-value="id"
            label="Equipo"
            dense
          ></v-select>
          </div>
          <div class="select-player">
            <v-select
              v-model="player1"
              :items="players1"
              item-text="name"
              item-value="id"
              label="Jugador"
              dense
            ></v-select>
          </div>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <h2>Jugador 2</h2>
          <div class="select-team">
            <v-select
            v-model="team2"
            :items="teams"
            item-text="team"
            item-value="id"
            label="Equipo"
            dense
          ></v-select>
          </div>
          <div class="select-player">
            <v-select
              v-model="player2"
              :items="players2"
              item-text="name"
              item-value="id"
              label="Jugador"
              dense
            ></v-select>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div>
      <Comparison :idPlayer1="player1" :idPlayer2="player2" :idTeam1="team1" :idTeam2="team2" :category="category" />
    </div>
  </div>
</template>

<script>
import Comparison from '@/components/Comparison.vue'

export default {
  name: 'Comparator',
  components: {
    Comparison
  },
  props: {
    category: String
  },
  data () {
    return {
      allTeams: require('../assets/players.json'),
      teams: [],
      team1: "",
      team2: "",
      players1: [],
      players2: [],
      player1: "",
      player2: ""
    }
  },
  methods: {
    init() {
      this.teams = this.allTeams.filter(team => team.category === this.category)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    $route(to, from) {
      if (to.name !== from.name) {
        this.init()
      }
    },
    team1: function() {
      this.players1 = []
      if (this.team1 !== undefined) {
        const team = this.teams.filter(team => team.id === this.team1 && team.category === this.category)
        if (team.length === 1){
          this.players1 = team[0].players
        }
      } 
    },
    team2: function() {
      this.players2 = []
      if (this.team2 !== undefined) {
        const team = this.teams.filter(team => team.id === this.team2  && team.category === this.category)
        if (team.length === 1){
          this.players2 = team[0].players
        }
      } 
    },
  }
}
</script>
