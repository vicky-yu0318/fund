<template>
<!-- https://github.com/zakaria-29-dev/Vuejs-Vuetify-UI-Design-Music-Player-App-Dashboard-Javascript-HTML-CSS-vue-chartjs/blob/main/src/components/Stream.vue -->
<!-- https://github.com/zakaria-29-dev/Vuejs-Vuetify-UI-Design-Music-Player-App-Dashboard-Javascript-HTML-CSS-vue-chartjs/blob/main/src/chart/LineChart.js -->
  <!-- // <div>
//     <line-chart
//         :chart-id="chartId"
//         :width="width"
//         :height="height"
//         :css-classes="cssClasses"
//         :styles="styles"
//         :plugins="plugins"
//       />
//   </div> -->
  <Line :chart-data="chartData"></Line>
</template>

<script>
import Line from '@/components/Line.vue'

export default {
  components: {
    Line
  }
}
// import LineChart from '@/components/Chart'

// export default {
//   name: 'Home',
//   data: () => ({}),
//   components: {
//     LineChart
//   },
//   props: {
//     chartId: {
//       type: String,
//       default: 'line-chart'
//     },
//     width: {
//       type: Number,
//       default: 400
//     },
//     height: {
//       type: Number,
//       default: 230
//     },
//     cssClasses: {
//       default: '',
//       type: String
//     },
//     styles: {
//       type: Object,
//       default: () => {}
//     },
//     plugins: {
//       type: Array,
//       default: () => {}
//     }
//   }
// }
</script>
