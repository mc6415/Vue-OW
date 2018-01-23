<script>
  import {Line} from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default ({
    extends: Line,
    props: ['data'],
    data () {
      return {
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      console.log(this.data);
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.data, this.options)
    }
  })
</script>
