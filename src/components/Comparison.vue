<template>
  <div class="comparison">
    <v-simple-table dense>
        <template v-slot:default>
          <tbody>
            <tr v-for="info in elements" :key="info.text">
              <td class="text-center">{{getElement(info.player1)}}</td>
              <td class="text-center">{{info.text}}</td>
              <td class="text-center">{{getElement(info.player2)}}</td>
            </tr>
            <tr v-if="player1.id !== undefined && player2.id !== undefined">
              <td class="text-center">
                {{lastSeason1.category}}
                <img class="flag-xsmall" :src="getFlag(lastSeason1.country)" :alt="lastSeason1.country"/>
              </td>
              <td class="text-center">Categoría 20/21</td>
              <td class="text-center">
                {{lastSeason2.category}}
                <img class="flag-xsmall" :src="getFlag(lastSeason2.country)" :alt="lastSeason2.country"/>
              </td>
            </tr>
            <tr v-for="stat in stats" :key="stat.text">
              <td :class="getClass(stat.player1, stat.player2, stat.inverse)">{{getElement(stat.player1, stat.isPercentage)}}</td>
              <td class="text-center">{{stat.text}}</td>
              <td :class="getClass(stat.player2, stat.player1, stat.inverse)">{{getElement(stat.player2, stat.isPercentage)}}</td>
            </tr>
          </tbody>
        </template>
    </v-simple-table>
  </div>
</template>

<script>
import Util from '@/components/util.js'
import PlayerService from '@/components/PlayerService.js'

export default {
  name: 'Comparison',
  props: {
    idPlayer1: String,
    idTeam1: String,
    idPlayer2: String,
    idTeam2: String,
    category: String
  }, 
  data () {
    return {
      players: require('../assets/players.json'),
      countries: require('../assets/countries.json'),
      elements: [],
      stats: [],
      player1: {},
      player2: {},
      lastSeason1: {},
      lastSeason2: {},
      positions: require('../assets/positions.json'),
    }
  },
  methods: {
    getFlag (nationality){
      return PlayerService.getFlag(nationality, this.countries)
    },
    setElements() {
      this.elements = []
      const { position: position1, height: height1, bornDate: bornDate1 } = this.player1
      const { position: position2, height: height2, bornDate: bornDate2 } = this.player2
      const position = this.setElement("Posición", this.getPosition(position1), this.getPosition(position2))
      const height = this.setElement("Altura", height1, height2)
      const age = this.setElement("Edad", this.getYearsOld(bornDate1), this.getYearsOld(bornDate2))
      const team = this.setElement("Equipo 20/21", this.lastSeason1.team, this.lastSeason2.team)
      this.elements.push(position)
      this.elements.push(height)
      this.elements.push(age)
      this.elements.push(team)
    },
    setBasicStats() {
      const { matches: matches1, mins: minutes1 } = this.lastSeason1
      const { matches: matches2, mins: minutes2 } = this.lastSeason2
      const mpg1 = this.getMinutesPerGame(minutes1, matches1)
      const mpg2 = this.getMinutesPerGame(minutes2, matches2)
      const matches = this.setStat("Partidos", matches1, matches2, false)
      const minutes = this.setStat("Minutos p.p.", mpg1, mpg2, false)
      this.stats.push(matches)
      this.stats.push(minutes)
    },
    setStatsPerGame() {
      const {
              points: points1, rebounds: rebounds1, assists: assists1, 
              steals: steals1, turnovers: turnovers1, blocks: blocks1, matches: matches1,
               '2PM' : twoPM1, '3PM' : threePM1, FTM : FTM1
            } = this.lastSeason1
      const {
              points: points2, rebounds: rebounds2, assists: assists2, 
              steals: steals2, turnovers: turnovers2, blocks: blocks2, matches: matches2,
               '2PM' : twoPM2, '3PM' : threePM2, FTM : FTM2
            } = this.lastSeason2
      const ppg1 = this.getPerGame(points1, matches1)
      const ppg2 = this.getPerGame(points2, matches2)
      const rpg1 = this.getPerGame(rebounds1, matches1)
      const rpg2 = this.getPerGame(rebounds2, matches2)
      const apg1 = this.getPerGame(assists1, matches1)
      const apg2 = this.getPerGame(assists2, matches2)
      const spg1 = this.getPerGame(steals1, matches1)
      const spg2 = this.getPerGame(steals2, matches2)
      const tpg1 = this.getPerGame(turnovers1, matches1)
      const tpg2 = this.getPerGame(turnovers2, matches2)
      const bpg1 = this.getPerGame(blocks1, matches1)
      const bpg2 = this.getPerGame(blocks2, matches1)
      const twoPMpg1 = this.getPerGame(twoPM1, matches1)
      const twoPMpg2 = this.getPerGame(twoPM2, matches2)
      const threePMpg1 = this.getPerGame(threePM1, matches1)
      const threePMpg2 = this.getPerGame(threePM2, matches2)
      const FTMpg1 = this.getPerGame(FTM1, matches1)
      const FTMpg2 = this.getPerGame(FTM2, matches2)

      const pointsPerGame = this.setStat("Puntos p.p.", ppg1 , ppg2, false )
      const rebPerGame = this.setStat("Rebotes p.p", rpg1, rpg2, false)
      const assistsPerGame = this.setStat("Asistencias p.p", apg1, apg2, false)
      const stealsPerGame = this.setStat("Robos p.p.", spg1, spg2, false)
      const turnoversPerGame = this.setStat("Pérdidas p.p.", tpg1, tpg2, false, true)
      const blocksPerGame = this.setStat("Tapones p.p.", bpg1, bpg2, false)
      const twoPPerGame = this.setStat("T2A p.p.", twoPMpg1 , twoPMpg2, false )
      const threePPerGame = this.setStat("T3A p.p", threePMpg1, threePMpg2, false)
      const FTPerGame = this.setStat("TLA p.p", FTMpg1, FTMpg2, false)

      this.stats.push(pointsPerGame)
      this.stats.push(rebPerGame)
      this.stats.push(assistsPerGame)
      this.stats.push(stealsPerGame)
      this.stats.push(turnoversPerGame)
      this.stats.push(blocksPerGame)
      this.stats.push(twoPPerGame)
      this.stats.push(threePPerGame)
      this.stats.push(FTPerGame)
    },
    setPercentageStats() {
      const {'2PA': twoPA1, '2PM' : twoPM1, '3PA': threePA1, '3PM' : threePM1, FTA : FTA1, FTM : FTM1} = this.lastSeason1
      const {'2PA': twoPA2, '2PM' : twoPM2, '3PA': threePA2, '3PM' : threePM2, FTA : FTA2, FTM : FTM2} = this.lastSeason2

      const twoPPercentage1 = this.getPercentage(twoPM1, twoPA1)
      const twoPPercentage2 = this.getPercentage(twoPM2, twoPA2)
      const threePPercentage1 = this.getPercentage(threePM1, threePA1)
      const threePPercentage2 = this.getPercentage(threePM2, threePA2)
      const fTPercentage1 = this.getPercentage(FTM1, FTA1)
      const fTPercentage2 = this.getPercentage(FTM2, FTA2)

      const twoPPercentage = this.setStat("% T2", twoPPercentage1, twoPPercentage2, true)
      const threePPercentage = this.setStat("% T3", threePPercentage1, threePPercentage2, true)
      const fTPercentage = this.setStat("% TL", fTPercentage1, fTPercentage2, true)

      this.stats.push(twoPPercentage)
      this.stats.push(threePPercentage)
      this.stats.push(fTPercentage)
    },
    setStatsPer40Min() {
      const {
              points: points1, rebounds: rebounds1, assists: assists1, 
              steals: steals1, turnovers: turnovers1, blocks: blocks1, mins: minutes1,
             '2PM' : twoPM1, '3PM' : threePM1,  FTM : FTM1
            } = this.lastSeason1
      const {
              points: points2, rebounds: rebounds2, assists: assists2, 
              steals: steals2, turnovers: turnovers2, blocks: blocks2, mins: minutes2,
              '2PM' : twoPM2, '3PM' : threePM2, FTM : FTM2
            } = this.lastSeason2
      const pp40min1 = this.getPerMins(points1, minutes1)
      const pp40min2 = this.getPerMins(points2, minutes2)
      const rp40min1 = this.getPerMins(rebounds1, minutes1)
      const rp40min2 = this.getPerMins(rebounds2, minutes2)
      const ap40min1 = this.getPerMins(assists1, minutes1)
      const ap40min2 = this.getPerMins(assists2, minutes2)
      const sp40min1 = this.getPerMins(steals1, minutes1)
      const sp40min2 = this.getPerMins(steals2, minutes2)
      const tp40min1 = this.getPerMins(turnovers1, minutes1)
      const tp40min2 = this.getPerMins(turnovers2, minutes2)
      const bp40min1 = this.getPerMins(blocks1, minutes1)
      const bp40min2 = this.getPerMins(blocks2, minutes2)
      const twoPMade40Min1 = this.getPerMins(twoPM1, minutes1)
      const twoPMade40Min2 = this.getPerMins(twoPM2, minutes2)
      const threePMade40Min1 = this.getPerMins(threePM1, minutes1)
      const threePMade40Min2 = this.getPerMins(threePM2, minutes2)
      const FTMade40Min1 = this.getPerMins(FTM1, minutes1)
      const FTMade40Min2 = this.getPerMins(FTM2, minutes2)

      const pointsPer40Min = this.setStat("Puntos p. 40 min.", pp40min1, pp40min2, false)
      const reboundsPer40Min = this.setStat("Rebotes p. 40 min.", rp40min1, rp40min2, false)
      const assistsPer40Min = this.setStat("Asistencias p. 40 min.", ap40min1, ap40min2, false)
      const stealsPer40Min = this.setStat("Robos p. 40 min.", sp40min1, sp40min2, false)
      const turnoversPer40Min = this.setStat("Pérdidas p. 40 min.", tp40min1, tp40min2, false, true)
      const blocksPer40Min = this.setStat("Tapones p. 40 min.", bp40min1, bp40min2, false)
      const twoPMPer40Min = this.setStat("T2A p. 40 min", twoPMade40Min1, twoPMade40Min2, false)
      const threePMPer40Min = this.setStat("T3A p. 40 min", threePMade40Min1, threePMade40Min2, false)
      const FTMPer40Min = this.setStat("TLA p. 40 min", FTMade40Min1, FTMade40Min2, false)

      this.stats.push(pointsPer40Min)
      this.stats.push(reboundsPer40Min)
      this.stats.push(assistsPer40Min)
      this.stats.push(stealsPer40Min)
      this.stats.push(turnoversPer40Min)
      this.stats.push(blocksPer40Min)
      this.stats.push(twoPMPer40Min)
      this.stats.push(threePMPer40Min)
      this.stats.push(FTMPer40Min)
    },
    setAdvancedStats() {
      const {points: points1, '2PA': twoPA1, '2PM' : twoPM1, '3PA': threePA1, 
        '3PM' : threePM1, FTA : FTA1, assists: assists1, turnovers: turnovers1} = this.lastSeason1
      const {points: points2, '2PA': twoPA2, '2PM' : twoPM2, '3PA': threePA2, 
        '3PM' : threePM2, FTA : FTA2, assists: assists2, turnovers: turnovers2} = this.lastSeason2
      
      const eFG1 = this.getEFG(twoPA1, twoPM1, threePA1, threePM1)
      const eFG2 = this.getEFG(twoPA2, twoPM2, threePA2, threePM2)
      const TS1 = this.getTS(points1, twoPA1, threePA1, FTA1)
      const TS2 = this.getTS(points2, twoPA2, threePA2, FTA2)
      const threePar1 = this.get3Par(twoPA1, threePA1)
      const threePar2 = this.get3Par(twoPA2, threePA2)
      const apt1 = this.getAssistsPerTurnover(assists1, turnovers1)
      const apt2 = this.getAssistsPerTurnover(assists2, turnovers2)

      const eFG = this.setStat("eFG %", eFG1, eFG2, true)
      const TS = this.setStat("TS %", TS1, TS2, true)
      const threePar = this.setStat("3Par", threePar1, threePar2, true)
      const apt = this.setStat("Asistencias/pérdida", apt1, apt2, false)

      this.stats.push(eFG)
      this.stats.push(TS)
      this.stats.push(threePar)
      this.stats.push(apt)
    },
    setStats() {
      this.stats = []
      this.setBasicStats()
      this.setStatsPerGame()
      this.setPercentageStats()
      this.setStatsPer40Min()
      this.setAdvancedStats()
    },
    setElement(text, item1, item2){
      return {
        text: text,
        player1: item1,
        player2: item2
      }
    },
    setStat(text, item1, item2, isPercentage, inverse){
      return {
        text: text,
        player1: item1,
        player2: item2,
        isPercentage: isPercentage,
        inverse: inverse
      }
    },
    getPercentage(made, attempted) {
      if (attempted > 0) {
        return ((made / attempted) * 100).toFixed(1)
      } else {
        return ''
      }
    },
    getPerMins(element, mins) {
      return PlayerService.getElementPer40Minutes(element, mins)
    },
    getEFG (twoPA, twoPM, threePA, threePM) {
      if (twoPA + threePA > 0) {
        return PlayerService.getEFG(twoPM, threePM, twoPA, threePA)
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
    getTS (points, twoPA, threePA, FTA){
      if (twoPA +  threePA + FTA > 0) {
        return PlayerService.getTS(points, twoPA, threePA, FTA)
      } else {
        return ''
      }
    },
    get3Par (twoPA, threePA) {
      if (twoPA +  threePA > 0) {
        return PlayerService.get3Par(twoPA, threePA)
      } else {
        return ''
      }
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
    getYearsOld(bornDate) {
      return (bornDate !== undefined) ? Util.getYearsOld(bornDate) : 0
    },
    getMinutesPerGame (mins, matches) {
      return PlayerService.getMinutesPerGame(mins, matches)
    },
    getPerGame(element, matches) {
      if (matches > 0) {
        return (element/matches).toFixed(1)
      } else {
        return (element !== undefined) ? 0 : ''
      }
    },
    getClass(statA, statB, inverse) {
      if (inverse) {
        return (statA * 1) < (statB * 1) ? "text-center better": "text-center"
      } else {
        return (statA * 1) > (statB * 1) ? "text-center better": "text-center"
      }
    },
    getElement(stat, isPercentage) {
      if (isPercentage && stat !== '') {
        return stat+ ' %'
      } else {
        return stat
      }
    }
  },
  watch: {
    idPlayer1: function() {
      const teams1 = this.players.filter(team => team.id === this.idTeam1 && team.category === this.category)
      if (teams1.length === 1) {
        this.player1 = teams1[0].players.filter(player => player.id === this.idPlayer1)[0]
        this.lastSeason1 = this.player1.lastSeason
        if (this.player2.id !== undefined){
          this.setElements()
          this.setStats()
        }
      }
    },
    idPlayer2: function() {
      const teams2 = this.players.filter(team => team.id === this.idTeam2  && team.category === this.category)
      if (teams2.length === 1) {
        this.player2 = teams2[0].players.filter(player => player.id === this.idPlayer2)[0]
        this.lastSeason2 = this.player2.lastSeason
        if (this.player1.id !== undefined){
          this.setElements()
          this.setStats()
        }
      }
    }
  }
}
</script>
