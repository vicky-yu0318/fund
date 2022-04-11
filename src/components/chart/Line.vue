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
        // this.chartdata.datasets[0].label = this.compareLabel1
        // this.chartdata.datasets[1].label = this.compareLabel2
        // this.chartdata.datasets[2].label = this.compareLabel3
        // console.log('圖監聽開啟')
        // this.render()
      },
      deep: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
    // console.log('程式於chart')
    emitter.on('rerenderChart', (data) => {
      // console.log('rerenderChart被觸發')
      // console.log(this.chartData)
      // console.log(data)
      // this.renderChart(this.chartData, this.chartOptions)
    })
  }
})
</script>
