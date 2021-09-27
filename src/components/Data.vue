<template>
  <div class="data">
    <h2 class="text-center" v-if="category=='oro'">
      <img alt="LEB Oro" src="../assets/leboro.jpg" width="64px" />  
      Datos LEB Oro 2021/2022
    </h2>
    <h2 class="text-center" v-if="category=='plata'">
      <img alt="LEB Plata" src="../assets/lebplata.jpg" width="64px" />  
      Datos LEB Plata 2021/2022
    </h2>
    <h3 class="text-center">Equipos </h3>
    <ul class="container-data">
      <li>Más veterano: {{ this.oldestTeam.team }} ({{this.oldestTeam.avgYearsOld.toFixed(1)}} años)</li>
      <li>Más joven: {{ this.youngestTeam.team }} ({{this.youngestTeam.avgYearsOld.toFixed(1)}} años)</li>
      <li>Más alto: {{ this.tallestTeam.team }} ({{this.tallestTeam.avgHeight.toFixed(2)}} m)</li>
      <li>Más bajo: {{ this.shortestTeam.team }} ({{this.shortestTeam.avgHeight.toFixed(2)}} m)</li>
      <li>Número de equipos con al menos un jugador sin equipo en la 20/21: {{numTeamsPlayersNoTeam}}</li>
    </ul>
    <h3 class="text-center">Jugadores </h3>
    <ul class="container-data">
      <li>Más veterano: <span v-for="(player, index) in oldestPlayer.players" :key="player.id">
        {{ player.name }} ({{ player.team }})<span v-if="index === oldestPlayer.players.length - 2"> y </span></span>: {{ Math.trunc(oldestPlayer.age)}} años y {{getDaysOldFromLastBirthday(oldestPlayer.bornDate)}} días
      </li>
      <li>Más joven: <span v-for="(player, index) in youngestPlayer.players" :key="player.id">
        {{ player.name }} ({{ player.team }})<span v-if="index === youngestPlayer.players.length - 2"> y </span></span>: {{ Math.trunc(youngestPlayer.age)}} años y {{getDaysOldFromLastBirthday(youngestPlayer.bornDate)}} días
        </li>
      <li>Más alto: <span v-for="(player, index) in tallestPlayer.players" :key="player.id">
        {{ player.name }} ({{ player.team }})<span v-if="index === tallestPlayer.players.length - 2"> y </span></span>: {{ tallestPlayer.height}} m
      </li>
      <li>Más bajo: <span v-for="(player, index) in shortestPlayer.players" :key="player.id">
       {{ player.name }} ({{ player.team }})<span v-if="index === shortestPlayer.players.length - 2"> y </span></span>: {{shortestPlayer.height}} m
      </li>
      <li>Número de jugadores sin equipo en la 20/21: {{numPlayersNoTeam}} ({{getPercentage(numPlayersNoTeam, numTotalPlayers) }}%)</li>
      <li>Número de jugadores procedentes de LEB {{ this.capitalizeFirstLetter(this.category) }} en la 20/21: {{numPlayersSameCategory}} ({{getPercentage(numPlayersSameCategory, numTotalPlayers) }}%)</li>
      <li>Número de jugadores procedentes del extranjero en la 20/21: {{numPlayersAbroad}} ({{getPercentage(numPlayersAbroad, numTotalPlayers) }}%)</li>
    </ul>
    <h3 class="text-center">Nacionalidades </h3>
    <ul class="container-data">
      <li>Número de nacionalidades diferentes: {{ this.nationalities.length }}</li>
      <li>Nacionalidades más representadas: 
        <ul>
          <li v-for="nationality in this.nationalities.slice(0, 5)" :key="nationality.abr">
            <img class="flag-small" :src="getFlag(nationality.abr)" :alt="nationality.abr"/>
            {{getNameNationality(nationality.abr)}} ({{getPercentage(nationality.count,numTotalPlayers) }} %)
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Util from '@/components/util.js'
import PlayerService from '@/components/PlayerService.js'

export default {
  name: 'Data',
  props: {
    category: String
  },
  data () {
    return {
      players: require('../assets/players.json'),
      countries: require('../assets/countries.json'),
      teams: [],
      oldestTeam: {},
      youngestTeam: {},
      tallestTeam: {},
      shortestTeam: {},
      nationalities: [],
      oldestPlayer: {},
      youngestPlayer: {},
      tallestPlayer: {},
      shortestPlayer: {},
      numTotalPlayers: 0,
      numTeamsPlayersNoTeam: 0,
      numPlayersNoTeam: 0,
      numPlayersSameCategory: 0,
      numPlayersAbroad: 0
    }
  },
  methods: {
    init () {
      this.teams = this.players.filter(team => team.category === this.category)
      this.nationalities = []
      this.numTotalPlayers = 0
      this.numTeamsPlayersNoTeam = 0
      this.numPlayersNoTeam = 0
      this.numPlayersSameCategory = 0
      this.numPlayersAbroad = 0
      this.shortestPlayer = {}
      this.tallestPlayer = {}
      this.youngestPlayer = {}
      this.oldestPlayer = {}
      this.iterateTeams()
      this.orderTeams()
      this.nationalities.sort(Util.orderByCount)
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    iterateTeams() {
      this.teams.forEach(team => {
        this.setAverageHeight(team)
        this.setAverageYearsOld(team)
        this.iteratePlayers(team.players, team.team)
        this.setPlayersNoTeam(team)
        this.setPlayersSameCategory(team)
        this.setPlayersAbroad(team)
      })
    },
    iteratePlayers(players, team) {
      players.forEach(player => {
        player.team = team
        this.setNationalities(player)
        this.numTotalPlayers++
        if (player.height !== undefined) {
          this.isTaller(player)
          this.isShorter(player)
        }
        if (player.bornDate !== undefined) {
          const playerAge = Util.getYearsOldDecimal(player.bornDate)
          this.isOlder(player, playerAge)
          this.isYounger(player, playerAge)
        }
      })
    },
    setAverageHeight(team) {
      const playersWithHeight = team.players.filter(player => player.height !== undefined)
      const sum = playersWithHeight.reduce((a, b) => a + b.height, 0)
      team.avgHeight = (sum / playersWithHeight.length) || 0
    },
    setAverageYearsOld(team) {
      const playersWithBornDate = team.players.filter(player => player.bornDate !== undefined)
      const sum = playersWithBornDate.reduce((a, b) => a + Util.getYearsOldDecimal(b.bornDate), 0)
      team.avgYearsOld = (sum / playersWithBornDate.length) || 0;
    },
    orderTeams() {
      var copyTeams = [...this.teams]
      copyTeams.sort(Util.orderByAvgYearsOld)
      this.oldestTeam = copyTeams[0]
      this.youngestTeam = copyTeams[copyTeams.length - 1]
      copyTeams.sort(Util.orderByAvgHeight)
      this.tallestTeam = copyTeams[0]
      this.shortestTeam = copyTeams[copyTeams.length - 1]
    },
    setNationalities(player) {
      const nats = player.nationality.split('/')
      nats.forEach(nat => {
        var items = this.nationalities.filter(el => el.abr === nat)
        if (items.length > 0) {
          items[0].count++
        } else {
          this.nationalities.push({abr: nat, count: 1})
        }
      })
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
    getFlag (nationality){
      return PlayerService.getFlag(nationality, this.countries)
    },
    getPercentage (count, total) {
      return ((count / total) * 100).toFixed(1)
    },
    isTaller(player){
      if (player.height !== undefined) {
        if (this.tallestPlayer.height === undefined) {
          this.tallestPlayer = {height: player.height, players: [player]}
        } else if (this.tallestPlayer.height === player.height) {
          this.tallestPlayer.players.push(player)
        } else if (this.tallestPlayer.height < player.height) {
          this.tallestPlayer = {height: player.height, players: [player]}
        }
      }  
    },
    isShorter(player){
      if (player.height !== undefined) {
        if (this.shortestPlayer.height === undefined) {
          this.shortestPlayer = {height: player.height, players: [player]}
        } else if (this.shortestPlayer.height === player.height) {
          this.shortestPlayer.players.push(player)
        } else if (this.shortestPlayer.height > player.height) {
          this.shortestPlayer = {height: player.height, players: [player]}
        }
      }  
    },
    isOlder(player, playerAge){
      if (this.oldestPlayer.age === undefined) {
        this.oldestPlayer = {age: playerAge, bornDate: player.bornDate, players: [player]}
      } else if (this.oldestPlayer.age === playerAge) {
        this.oldestPlayer.players.push(player)
      } else if (this.oldestPlayer.age < playerAge) {
        this.oldestPlayer = {age: playerAge, bornDate: player.bornDate, players: [player]}
      }
    },
    isYounger(player, playerAge){
      if (this.youngestPlayer.age === undefined) {
        this.youngestPlayer = {age: playerAge, bornDate: player.bornDate, players: [player]}
      } else if (this.youngestPlayer.age === playerAge) {
        this.youngestPlayer.players.push(player)
      } else if (this.youngestPlayer.age > playerAge) {
        this.youngestPlayer = {age: playerAge, bornDate: player.bornDate, players: [player]}
      }  
    },
    setPlayersNoTeam (team) {
      const playersNoTeam = team.players.filter(player => player.lastSeason.team.toLowerCase() === 'sin equipo')
      if (playersNoTeam.length > 0){
        this.numTeamsPlayersNoTeam++
        this.numPlayersNoTeam += playersNoTeam.length
      }
    },
    setPlayersSameCategory (team) {
      const playersSameCategory = team.players.filter(player => player.lastSeason.category !== undefined && player.lastSeason.category.toLowerCase() === 'leb '+this.category)
      this.numPlayersSameCategory += playersSameCategory.length
    },
    setPlayersAbroad (team) {
      const playersAbroad = team.players.filter(player => player.lastSeason.country !== undefined && player.lastSeason.country.toLowerCase() !== 'esp')
      this.numPlayersAbroad += playersAbroad.length
    },
    getDaysOldFromLastBirthday(bornDate) {
      const dateOfBirth = Util.getDateFromString(bornDate)
      const nearestBirthday = Util.getNearestBirthday(dateOfBirth)
      return Util.getDifferenceDays(nearestBirthday, new Date())
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    $route(to, from) {
      if (to.name !== from.name) {
        this.init()
      }
    }
  }
}
</script>