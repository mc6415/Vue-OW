import {Bar} from 'vue-chartjs'

export default({
  name: 'testchart',
  extend: Bar,
  mounted(){
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'News reports',
          backgroundColor: '#3c8dbc',
          data: [12, 20, 12, 18, 10, 6, 9, 32, 29, 19, 12, 11]
        }
      ]
    },)
  }
})
