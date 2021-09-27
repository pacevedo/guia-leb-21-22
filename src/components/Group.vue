<template>
  <div class="conference">
    <h2 v-if="conference!=''">Grupo {{ conference }}</h2>
    <table>
      <tr class="team-row" v-for="team in getTeams()" :key="team.team">
        <td><img class="logo-small" :src="getLogo(team)" @click="goToTeam(team)"/></td>
        <td><a :href="`/${team.category}/team/${team.id}`">{{team.team}}</a></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Group',
  props: {
    conference: String,
    category: String
  },
  data () {
    return {
      players: require('../assets/players.json')
    }
  },
  methods: {
    getTeams (){
      if (this.conference != '') {
        return this.players.filter(team => team.category === this.category && team.conference === this.conference)
      } else {
        return this.players.filter(team => team.category === this.category)
      }
    },
    getLogo (team){
      return require('../assets/logos/'+team.logo)
    },
    goToTeam (team){
      location.href = '/'+team.category+'/team/'+team.id
    }
  }
}
</script>
