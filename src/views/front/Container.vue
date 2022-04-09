<template>
  <div class="container">
    <MonthlyChart v-bind:chartData="data" v-bind:chartOptions="options"
    />
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
        labels: ['1月', '2月', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [40, 19, 60, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          },
          {
            label: '# of Votes',
            data: [10, 3, 100, 110, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              '#faa',
              '#faa',
              '#faa',
              '#faa',
              '#faa',
              '#faa'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Chart Title'
          }
        }
      }
    }
  }
})
</script>
