<template>
  <div class="player">
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-btn
              color="primary"
              @click="goBack"
              right
              absolute
            >Volver
          </v-btn>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <h2>{{ player.name }}</h2>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <img class="logo-big" :src="getLogo()" :alt="team.team"/>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <div>
            <label>Posición: </label>
            {{ getPosition(player.position) }}
          </div>
          <div>
            <label>Fecha de nacimiento: </label>
            {{ player.bornDate }} ({{ getYearsOld(player.bornDate)}} años)
          </div>
          <div>
            <label>Altura: </label>
            {{ getHeight(player.height) }} m
          </div>
          <div>
            <label>Nacionalidad: </label>
            <img class="flag-small" :src="getFlag(getNationality(player.nationality,1))" :alt="getNationality(player.nationality,1)"/> 
            {{ getNameNationality(getNationality(player.nationality,1))}}
            <span v-if="hasDoubleNationality(player.nationality)"> / 
              <img class="flag-small" :src="getFlag(getNationality(player.nationality,2))" :alt="getNationality(player.nationality,2)"/>
              {{ getNameNationality(getNationality(player.nationality,2))}}
            </span>
          </div>
          <div>
            <a :href="player.url" target="_blank">Más información</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col cols="12" sm="9" md="9">
          <fieldset class="last-season">
            <legend>Temporada 20/21</legend>
            <div>
              <label>Equipo: </label>
              {{lastSeason.team}}
            </div>
            <div v-if="lastSeason.category !== ''">       
              <label> Categoría: </label>
              {{lastSeason.category}}
              <img class="flag-xsmall" :src="getFlag(lastSeason.country)" :alt="lastSeason.country"/>
            </div>
            <v-expansion-panels :value="0">
              <v-expansion-panel>
                <v-expansion-panel-header>Estadísticas básicas</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-simple-table dense class="stats">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="td-description"></th>
                          <th class="td-matches">Part.</th>
                          <th class="td-minutes">Min.</th>
                          <th class="td-stat">Ptos</th>
                          <th class="td-stat">Rebs</th>
                          <th class="td-stat">Asis</th>
                          <th class="td-stat">Robos</th>
                          <th class="td-stat">Perd</th>
                          <th class="td-stat">Taps</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="td-description"><label>Totales</label></td>
                          <td class="td-matches">{{ lastSeason.matches }}</td>
                          <td class="td-minutes">{{ getMinutes(lastSeason.mins) }}</td>
                          <td class="td-stat">{{ lastSeason.points }}</td>
                          <td class="td-stat">{{ lastSeason.rebounds }}</td>
                          <td class="td-stat">{{ lastSeason.assists }}</td>
                          <td class="td-stat">{{ lastSeason.steals }}</td>
                          <td class="td-stat">{{ lastSeason.turnovers }}</td>
                          <td class="td-stat">{{ lastSeason.blocks }}</td>
                        </tr>
                        <tr>
                          <td class="td-description"><label>Por partido</label></td>
                          <td class="td-matches"></td>
                          <td class="td-minutes">{{ getMinutesPerGame(lastSeason.mins, lastSeason.matches) }}</td>
                          <td class="td-stat">{{ getPerGame(lastSeason.points, lastSeason.matches) }}</td>
                          <td class="td-stat">{{ getPerGame(lastSeason.rebounds, lastSeason.matches) }}</td>
                          <td class="td-stat">{{ getPerGame(lastSeason.assists, lastSeason.matches) }}</td>
                          <td class="td-stat">{{ getPerGame(lastSeason.steals, lastSeason.matches) }}</td>
                          <td class="td-stat">{{ getPerGame(lastSeason.turnovers, lastSeason.matches) }}</td>
                          <td class="td-stat">{{ getPerGame(lastSeason.blocks, lastSeason.matches) }}</td>
                        </tr>
                        <tr>
                          <td class="td-description"><label>Por 40 min.</label></td>
                          <td class="td-matches"></td>
                          <td class="td-minutes"></td>
                          <td class="td-stat">{{ getPerMins(lastSeason.points, lastSeason.mins) }}</td>
                          <td class="td-stat">{{ getPerMins(lastSeason.rebounds, lastSeason.mins) }}</td>
                          <td class="td-stat">{{ getPerMins(lastSeason.assists, lastSeason.mins) }}</td>
                          <td class="td-stat">{{ getPerMins(lastSeason.steals, lastSeason.mins) }}</td>
                          <td class="td-stat">{{ getPerMins(lastSeason.turnovers, lastSeason.mins) }}</td>
                          <td class="td-stat">{{ getPerMins(lastSeason.blocks, lastSeason.mins) }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Estadística de tiro</v-expansion-panel-header>
                <v-expansion-panel-content>
                   <v-simple-table dense class="stats">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="td-description"></th>
                          <th class="td-percentage">T2</th>
                          <th class="td-percentage">T3</th>
                          <th class="td-percentage">TL</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="td-description"><label>Totales</label></td>
                          <td class="td-percentage">{{ getRatio(lastSeason['2PM'], lastSeason['2PA']) }}</td>
                          <td class="td-percentage">{{ getRatio(lastSeason['3PM'], lastSeason['3PA']) }}</td>
                          <td class="td-percentage">{{ getRatio(lastSeason.FTM, lastSeason.FTA) }}</td>
                        </tr>
                        <tr>
                          <td class="td-description"><label>Por partido</label></td>
                          <td class="td-percentage">{{ getRatioPerGame(lastSeason['2PM'], lastSeason['2PA'], lastSeason.matches) }}</td>
                          <td class="td-percentage">{{ getRatioPerGame(lastSeason['3PM'], lastSeason['3PA'], lastSeason.matches) }}</td>
                          <td class="td-percentage">{{ getRatioPerGame(lastSeason.FTM, lastSeason.FTA, lastSeason.matches) }}</td>
                        </tr>
                        <tr>
                          <td class="td-description"><label>Por 40 min.</label></td>
                          <td class="td-percentage">{{ getRatioPerMins(lastSeason['2PM'], lastSeason['2PA'], lastSeason.mins, lastSeason.matches) }}</td>
                          <td class="td-percentage">{{ getRatioPerMins(lastSeason['3PM'], lastSeason['3PA'], lastSeason.mins, lastSeason.matches) }}</td>
                          <td class="td-percentage">{{ getRatioPerMins(lastSeason.FTM, lastSeason.FTA, lastSeason.mins, lastSeason.matches) }}</td>
                        </tr>
                        <tr>
                          <td class="td-description"><label>Porcentajes</label></td>
                          <td class="td-percentage">{{ getPercentage(lastSeason['2PM'], lastSeason['2PA']) }}</td>
                          <td class="td-percentage">{{ getPercentage(lastSeason['3PM'], lastSeason['3PA']) }}</td>
                          <td class="td-percentage">{{ getPercentage(lastSeason.FTM, lastSeason.FTA) }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Estadística avanzada</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-simple-table dense class="advanced-stat">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="td-stat">eFG%</th>
                          <th class="td-stat">TS%</th>
                          <th class="td-stat">3PAr</th>
                          <th class="td-stat">Asi/Perd</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="td-stat">{{getEFG(lastSeason)}}</td>
                          <td class="td-stat">{{getTS(lastSeason)}}</td>
                          <td class="td-stat">{{get3Par(lastSeason)}}</td>
                          <td class="td-stat">{{getAssistsPerTurnover(lastSeason.assists, lastSeason.turnovers)}}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </fieldset>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Util from '@/components/util.js'
import PlayerService from '@/components/PlayerService.js'

export default {
  name: 'Team',
  data () {
    return {
      countries: require('../assets/countries.json'),
      players: require('../assets/players.json'),
      positions: require('../assets/positions.json'),
      team: {},
      player: {},
      lastSeason: {}
    }
  },
  props: {
    category: String
  },
  methods: {
    getLogo (){
      if (this.team.logo !== undefined) {
        return require('../assets/logos/'+this.team.logo)
      } else {
        return ''
      }
    },
    getYearsOld (bornDate) {
      return (bornDate !== undefined) ? Util.getYearsOld(bornDate) : ''
    },
    getHeight (height) {
      return height ? height.toFixed(2) : ''
    },
    getPosition (position) {
      if (position != undefined) {
        const aux = this.positions.filter(pos => pos.abr === position)
        if (aux.length > 0) {
          return aux[0].name
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    getElement (element) {
      return (element !== undefined) ? element : '-'
    },
    getFlag (nationality){
      return PlayerService.getFlag(nationality, this.countries)
    },
    getNationality (nationality, index) {
      return PlayerService.getNationality(nationality,index)
    },
    getNameNationality (nationality) {
      if (nationality !== undefined) {
        const countriesAux = this.countries.filter(country => country.abr === nationality)
        if (countriesAux.length > 0){
          return countriesAux[0].name
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    hasDoubleNationality (nationality) {
      return PlayerService.hasDoubleNationality(nationality)
    },
    getMinutes (mins) {
      return PlayerService.getMinutes(mins)
    },
    getMinutesPerGame (mins, matches) {
      return PlayerService.getMinutesPerGame(mins, matches)
    },
    getRatio(made, attempted) {
      return PlayerService.getRatio(made, attempted, false)
    },
    getPerGame(element, matches) {
      if (matches > 0) {
        return (element/matches).toFixed(1)
      } else {
        return (element !== undefined) ? 0 : ''
      }
    },
    getPerMins(element, mins) {
      return PlayerService.getElementPer40Minutes(element, mins)
    },
    getRatioPerGame (made, attempted, matches) {
      return PlayerService.getRatioPerGame(made, attempted, matches, false)
    },
    getRatioPerMins (made, attempted, mins, matches) {
      return PlayerService.getRatioPer40Minutes(made, attempted, mins, matches, false)
    },
    getPercentage (made, attempted) {
      return PlayerService.getPercentage(made, attempted)
    },
    getEFG (stats) {
      if (stats['2PA'] +  stats['3PA'] > 0) {
        return PlayerService.getEFG(stats['2PM'], stats['3PM'], stats['2PA'], stats['3PA']) + ' %'
      } else {
        return ''
      }
    },
    getTS (stats){
      if (stats['2PA'] +  stats['3PA'] + stats['FTA'] > 0) {
        return PlayerService.getTS(stats.points, stats['2PA'], stats['3PA'], stats['FTA']) + ' %'
      } else {
        return ''
      }
    },
    get3Par (stats) {
      if (stats['2PA'] +  stats['3PA'] > 0) {
        return PlayerService.get3Par(stats['2PA'], stats['3PA']) + ' %'
      } else {
        return ''
      }
    },
    getAssistsPerTurnover (assists, turnovers) {
      if (turnovers > 0) {
        return (assists/turnovers).toFixed(1)
      } else if (assists > 0){
        return assists.toFixed(1)
      } else {
        return (assists !== undefined) ? 0 : ''
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted () {
    const teams = this.players.filter(team => team.id === this.$route.params.team && team.category === this.category)
    if (teams.length === 1) {
      this.team = teams[0]
      this.teamPlayers = this.team.players
      this.player = this.team.players.filter(player => player.id === this.$route.params.player)[0]
      this.lastSeason = this.player.lastSeason
    }
  }
}
</script>