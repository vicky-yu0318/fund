<script>
// https://github.com/apertureless/vue-chartjs/issues/488
// MonthlyChart.vue
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'

export default defineComponent({
  name: 'MonthlyChart',
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: false
    }
  },
  // watch: {
  //   chartData: {
  //     handler () {
  //       // this.arrangeLineData()
  //       // console.log('圖監聽開啟')
  //       this._data._chart.destroy()
  //       this.renderChart(this.chartData, this.chartOptions)
  //       // this.renderChart(this.chartData, this.chartOptions)
  //     },
  //     deep: true
  //   }
  // },
  updated(){
    console.log(this.chartData)
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
})
</script>
