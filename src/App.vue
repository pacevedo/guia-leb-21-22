<template>
  <v-app>
    <div id="app" :style="{background: $vuetify.theme.themes[theme].background}">
      <div id="menuToggle">
        <input type="checkbox" id="check-menu"/>
        <span></span>
        <span></span>
        <span></span>
        <div id="nav">
          <div class="title">LEB Oro</div>
          <router-link to="/oro/teams" @click.native="closeMenu()">Equipos</router-link>
          <router-link to="/oro/players" @click.native="closeMenu()">Jugadores</router-link>
          <router-link to="/oro/comparator" @click.native="closeMenu()">Comparador</router-link>
          <router-link to="/oro/data" @click.native="closeMenu()">Datos</router-link>
          <div class="title">LEB Plata</div>
          <router-link to="/plata/teams" @click.native="closeMenu()">Equipos</router-link>
          <router-link to="/plata/players" @click.native="closeMenu()">Jugadores</router-link>
          <router-link to="/plata/comparator" @click.native="closeMenu()">Comparador</router-link>
          <router-link to="/plata/data" @click.native="closeMenu()">Datos</router-link>
        </div>
      </div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  methods: {
    closeMenu () {
      document.getElementById('check-menu').checked = false;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // a {
  //   color: #2c3e50 !important;
  // }
}
.logo {
  text-align: center;
  margin: 5px;
}
#nav {
  font-size: 14px;
  a {
    font-weight: bold;
    color: #2c3e50;
    display: block;
    margin-left: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.title {
  font-size: 16px;
}
</style>
