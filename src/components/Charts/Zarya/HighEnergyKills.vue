<script>
    import fb from '../../../firebase';
    require('firebase/firestore');
    import VueCharts from 'vue-chartjs';

    export default {
        name: "high-energy-kills",
        extends: VueCharts.Doughnut,
        data(){
          return{
            highEnergyKills: 0,
            elims: 0,
            data: {}
          }
        },
        watch:{
          stats: function(newVal, oldVal){
            this.elims = newVal.general_stats.eliminations;
            this.highEnergyKills = newVal.hero_stats.high_energy_kills;
            this.data = {
              datasets:[{
                data: [newVal.general_stats.eliminations, newVal.hero_stats.high_energy_kills]
              }],
              labels: ['Eliminations', 'High Energy Kills']
            }
          }
        },
        mounted(){
          console.log(this.stats);
          this.data = {
            datasets:[{
              data:[this.stats.general_stats.eliminations - this.stats.hero_stats.high_energy_kills,this.stats.hero_stats.high_energy_kills]
            }],
            labels: ['Non-High Energy Kills', 'High Energy Kills']
          }

          this.renderChart(this.data, {});
        },
        props: ['stats']
    }
</script>
