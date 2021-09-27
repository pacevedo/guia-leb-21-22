<template>
  <div class="home">
    <h2 class="text-center">Guía LEB 2021-2022</h2>
    <v-container class="ma-1 pa-1">
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <div @click="goTeams('oro')" class="logo-big"><img alt="LEB Oro" src="../assets/leboro.jpg"></div>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <div @click="goTeams('plata')" class="logo-big"><img alt="LEB Plata" src="../assets/lebplata.jpg"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script> 
export default {
  name: 'Home',
  methods: {
    goTeams (category){
      this.$router.push("/"+category+"/teams")
      document.getElementById('check-menu').checked = false;
    }
  }
}
</script>
<style lang="scss">
  .home {
    min-height: 720px;
  }
  .container {
    display: flex;
    align-items: flex-start;
    margin: 10px;
    flex-wrap: wrap
  }
  .logo-big {
    text-align: center;
    margin: 40px;
    cursor: pointer;
  }
  .logo-big img {
    width: 128px;
  }
</style>