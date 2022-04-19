<script>
// https://github.com/apertureless/vue-chartjs/issues/488
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
  // 加watch圖就空了
  // watch: {
  //   chartData: {
  //     handler () {
  //       this.renderChart(this.chartData, this.chartOptions)
  //     },
  //     deep: true
  //   }
  // },
  updated () {
    this.renderChart(this.chartData, this.chartOptions)
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
})
</script>
