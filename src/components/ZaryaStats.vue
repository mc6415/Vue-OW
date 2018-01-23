<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs4>
        <v-card color="pink lighten-1" light>
          <v-card-title class="title" primary>High Energy Kills</v-card-title>
          <v-divider light></v-divider>
          <v-card-text v-if="showCharts">
            <high-energy-kills :stats="stats" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs4>
        <v-card color="grey" dark>
          <v-card-title class="title" primary>Test</v-card-title>
        </v-card>
      </v-flex>
      <v-flex d-flex xs4>
        <v-card color="blue darken-1">
          Hello
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import fb from '../firebase';
    import HighEnergyKills from '@/components/Charts/Zarya/HighEnergyKills';

    export default {
        name: "zarya-stats",
        data(){
          return{
            player: '',
            stats: {},
            showCharts: false
          }
        },
        components:{
          HighEnergyKills
          },
        mounted(){
          this.player = this.$route.params.player.replace('-','#');
          const playerRef = fb.firestore().collection(this.player).doc("zarya");

          playerRef.get().then(doc => {
            this.stats = doc.data();
            this.showCharts = true;
          })
        }
    }
</script>

<style scoped>

</style>
