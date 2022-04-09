<template>
  <div class="container">
    <div class="block-linechart">
      <MonthlyChart v-bind:chartData="data" v-bind:chartOptions="options" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import MonthlyChart from '@/components/chart/Line.vue'

export default defineComponent({
  name: 'App',
  components: {
    MonthlyChart
  },
  data () {
    return {
      data: {
        labels: ['1月', '2月', '3月', 'Green', 'Purple', 'Orange', '1月', '2月', '3月', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '地義肢',
            data: [10, -2, 10, 5, 2, 3],
            backgroundColor: 'rgba(153, 102, 255, .4)',
            borderColor: '#914DA0',
            borderWidth: 1
          },
          {
            label: '# of Votes',
            data: [5, -3, 11, 9, 8, 9],
            backgroundColor: 'rgba(170, 170, 170, .3)',
            borderColor: '#aaa',
            borderWidth: 1
          },
          {
            label: '3',
            data: [2, 4, -2, 9, 6, 5],
            backgroundColor: 'rgba(255, 170, 0, .8)',
            borderColor: 'rgb(255, 170, 0)',
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true
          // text: 'Chart Title'
        },
        scales: {
          y: {
            suggestedMin: 20,
            suggestedMax: 20
          }
        }
      }
    }
  },
  mounted () {
    // this.labels = this.compareGroup.
  }
})
</script>
<style>
  .block-linechart {
    margin: auto;
    width: 700px;
    /* background-color: #faa; */
  }

</style>
