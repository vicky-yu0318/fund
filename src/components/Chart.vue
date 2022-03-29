<script>
// https://syj0905.github.io/vue/20201201/1205289835/
/* Line 為引入的圖表種類（可以參考官方文件) */
import { Line, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  data () {
    return {
      options: { /* 圖表選項，各類圖表的 options 可能不盡相圖，可參照官方文件 */
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        }
      }
    }
  },
  async mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: { /* 只要 chartData 改變，就要重新渲染圖表 */
    chartData () {
      this.$data._chart.destroy() /* 官方文件 api 提供的 destroy() 方法 */
      this.renderChart(this.chartData, this.options) /* 重新渲染圖表的 function */
    },
    deep: true
  }
}
</script>
