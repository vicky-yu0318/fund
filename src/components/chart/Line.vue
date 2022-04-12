<script>
// https://github.com/apertureless/vue-chartjs/issues/488
// MonthlyChart.vue
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'
import emitter from '@/methods/eventBus'

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
  watch: {
    chartData: {
      handler () {
        // this.arrangeLineData()
        // console.log('圖監聽開啟')
        // this.renderChart(this.chartData, this.chartOptions)
      },
      deep: true
    }
  },
  mounted () {
    // console.log('觸發mounted')
    this.renderChart(this.chartData, this.chartOptions)
    emitter.on('rerenderChart', () => {
      // console.log('line.vue 的rerenderChart被觸發')
      // 傳進來是最新的沒錯
      // console.log(this.chartData)
      // this.myChart.destroy()
      // this.renderChart(this.chartData)
    })
    // console.log(this.chartData)
  }
})
</script>
