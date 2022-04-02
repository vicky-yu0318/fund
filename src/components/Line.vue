<script>
// import { Line, mixins } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import { h } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale)

// export default {
//   extends: Line,
//   mixins: [mixins.reactiveProp],
//   props: ['chartData', 'options'],
//   mounted () {
//     this.renderChart(this.chartData, this.options)
//   }
// }
export default ({
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    }
  },
  setup (props) {
    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Line, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
</script>
