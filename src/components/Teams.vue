 <template>
  <div class="teams">
    <h2 class="text-center" v-if="category=='oro'">
      <img alt="LEB Oro" src="../assets/leboro.jpg" width="64px" />  
      Equipos LEB Oro 2021/2022
    </h2>
    <h2 class="text-center" v-if="category=='plata'">
      <img alt="LEB Plata" src="../assets/lebplata.jpg" width="64px" />  
      Equipos LEB Plata 2021/2022
    </h2>
    <v-container class="ma-1 pa-1">
      <v-row v-if="category=='plata'" >
        <v-col cols="12" sm="6" md="6">
          <Group conference="Oeste" category="plata"/>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <Group conference="Este" category="plata"/>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="category=='oro'">
        <v-col cols="12" sm="6" md="6">
          <Group conference="" category="oro" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Group from '@/components/Group.vue'

export default {
  name: 'Teams',
  components: {
    Group
  },
  props: {
    category: String
  }
}
</script>
<style lang="scss">
  .container {
    display: flex;
    align-items: flex-start;
    margin: 10px;
    flex-wrap: wrap
  }
  .teams {
    margin-top: 60px;
    min-height: 720px;
  }
</style>