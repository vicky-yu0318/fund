<script>
// https://syj0905.github.io/vue/20201201/1205289835/
// https://github.com/apertureless/vue-chartjs/issues/488
// https://github.com/apertureless/vue-chartjs/issues/355
// https://stackoverflow.com/questions/63409376/cannot-read-property-reactiveprop-of-undefined-in-vue-chartjs
/* Line 為引入的圖表種類（可以參考官方文件) */
import { Line, mixins } from 'vue-chartjs'
// import { Line } from 'vue-chartjs'

const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    options: {
      type: Object
    }
  },
  mounted () {
    // 陣列
    const funds = this.chartData.map(d => d.fund).reverse()
    const companys = this.chartData.map(d => d.company).reverse()
    this.renderChart({
      lebels: funds,
      datasets: [{
        label: ' Commits',
        data: companys
      }]
    },
    this.options)
  }
  // mixins: [reactiveProp]
  // data () {
  //   return {
  //     options: { /* 圖表選項，各類圖表的 options 可能不盡相圖，可參照官方文件 */
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       scales: {
  //         yAxes: [
  //           {
  //             ticks: {
  //               beginAtZero: true
  //             },
  //             gridLines: {
  //               display: true
  //             }
  //           }
  //         ],
  //         xAxes: [{
  //           gridLines: {
  //             display: true
  //           }
  //         }]
  //       }
  //     }
  //   }
  // },
  // async mounted () {
  //   this.renderChart(this.chartData, this.options)
  // },
  // watch: { /* 只要 chartData 改變，就要重新渲染圖表 */
  //   chartData () {
  //     this.$data._chart.destroy() /* 官方文件 api 提供的 destroy() 方法 */
  //     this.renderChart(this.chartData, this.options) /* 重新渲染圖表的 function */
  //   },
  //   deep: true
  // }
}
</script>
