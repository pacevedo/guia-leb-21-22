<template>
  <div class="standings">
    <v-data-table 
    :headers="headerStandings"
    :items="standings"
    :mobile-breakpoint="0"
    :expanded.sync="expanded"
    :items-per-page="itemsPerPage"
    hide-default-footer
    show-expand
    hide-actions
    item-key="team"
    :item-class="rowClass"
    dense
    >
    <template v-slot:item="{ item, expand, isExpanded }">
      <tr>
        <td class="td-expand">
          <button type="button" @click="expand(!isExpanded)" class="v-icon notranslate v-data-table__expand-icon v-icon--link mdi mdi-chevron-down theme--light"></button>
        </td>
        <td class="td-position">{{item.position}}</td>
        <td class="td-team">{{item.team}}</td>
        <td class="td-matches">{{item.numMatches}}</td>
        <td class="td-matches">{{item.wins}}</td>
        <td class="td-matches">{{item.losses}}</td>
        <td class="td-points">{{item.pointsFavor}}</td>
        <td class="td-points">{{item.pointsAgainst}}</td>
        <td class="td-points">{{item.difference}}</td>
        <td class="td-points-per-game">{{item.pointsFavorPerGame}}</td>
        <td class="td-points-per-game">{{item.pointsAgainstPerGame}}</td>
      </tr>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <h4>Partidos</h4>
        <Matches :matches="item.matches" :team="item.id" :showTotal="false"/>
      </td>
    </template>
    </v-data-table>
  </div>
</template>

<script>
import MatchService from '@/components/MatchService.js'
import Matches from '@/components/Matches.vue'

export default {
  name: 'Standings',
  components: {
    Matches
  },
  data () {
    return {
      players: require('../assets/players.json'),
      preseason: require ('../assets/preseason.json'),
      standings: [],
      expanded: [],
      itemsPerPage: 19,
      headerStandings: [
        {text: '', value: 'data-table-expand', class: 'td-expand' },
        {text: 'Pos.', value: 'position', sortable: false, class: 'td-position', align: 'center'},
        {text: 'Equipo', value: 'team', sortable: false, class: 'td-team', align: 'center'},
        {text: 'Par.', value: 'numMatches', sortable: false, class: 'td-matches', align: 'center'},
        {text: 'G', value: 'wins', sortable: false, class: 'td-matches', align: 'center'},
        {text: 'P', value: 'losses', sortable: false, class: 'td-matches', align: 'center'},
        {text: 'PF', value: 'pointsFavor', sortable: false, class: 'td-points', align: 'center'},
        {text: 'PC', value: 'pointsAgainst', sortable: false, class: 'td-points', align: 'center'},
        {text: 'Dif', value: 'difference', sortable: false, class: 'td-points', align: 'center'},
        {text: 'PPF', value: 'pointsFavorPerGame', sortable: false, class: 'td-points-per-game', align: 'center'},
        {text: 'PPC', value: 'pointsAgainstPerGame', sortable: false, class: 'td-points-per-game', align: 'center'},
      ]
    }
  },
  methods: {
    setStandings (){
      this.players.forEach( team => {
        const matches = this.preseason.filter(match => (match.local === team.id  || match.visit === team.id))
        const wins = MatchService.getWins(matches, team.id)
        const losses = MatchService.getLosses(matches, team.id)
        const pointsFavor = MatchService.getPoints(matches, team.id, true)
        const pointsAgainst = MatchService.getPoints(matches, team.id, false)
        const pointsFavorPerGame = (pointsFavor / matches.length).toFixed(2)
        const pointsAgainstPerGame = (pointsAgainst / matches.length).toFixed(2)
        const teamStandings = {
          position: 0,
          id: team.id,
          team: team.team,
          matches: matches,
          numMatches: matches.length,
          wins: wins,
          losses: losses,
          pointsFavor: pointsFavor,
          pointsAgainst: pointsAgainst,
          difference: pointsFavor - pointsAgainst,
          pointsFavorPerGame: pointsFavorPerGame,
          pointsAgainstPerGame: pointsAgainstPerGame
        }
        this.standings.push(teamStandings)
        this.standings.sort(this.sortStandings)
        this.standings.forEach((item,index) => {
          item.position = (index + 1) + 'º'
        })
      })
    },
    sortStandings(a, b) {
      if ((b.wins - b.losses) !== (a.wins - a.losses)) {
        return (b.wins - b.losses) - (a.wins - a.losses)
      } else if (b.wins !== a.wins) {
        return (b.wins - a.wins)
      } else if (b.difference !== a.difference) {
        return b.difference - a.difference
      } else {
        return b.pointsFavor - a.pointsFavor
      }
    }
  },
  mounted () {
    this.setStandings()
  }
}
</script>