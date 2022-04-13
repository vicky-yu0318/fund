<template>
  <LineChart v-bind:chartData="state.chartData" />
  <!-- <button v-on:click="fillData">Randomize</button> -->
  <div
    class="block-compare-items block_one_items"
    v-if="compareGroup.length === 1"
  >
    <ul class="compare-items">
      <li v-for="item in compareGroup" :key="item">
        <h3>{{ item.fund }}</h3>
        <div class="btn-block">
          <a href="" class="btn-buy">申購</a>
        </div>
        <div class="btn-delete fas fa-times" @click="updateCompare(item)"></div>
      </li>
    </ul>
  </div>
  <!-- 2種比較基金 -->
  <div
    class="block-compare-items block_two_items"
    v-if="compareGroup.length === 2"
  >
    <ul class="compare-items">
      <li v-for="item in compareGroup" :key="item">
        <h3>{{ item.fund }}</h3>
        <div class="btn-block">
          <a href="" class="btn-buy">申購</a>
        </div>
        <div class="btn-delete fas fa-times" @click="updateCompare(item)"></div>
      </li>
    </ul>
  </div>
  <!-- 3種比較基金 -->
  <div
    class="block-compare-items block_three_items"
    :class="{ active: isFixTop }"
    v-if="compareGroup.length === 3"
  >
    <ul class="compare-items">
      <li v-for="item in compareGroup" :key="item">
        <h3>{{ item.fund }}</h3>
        <div class="btn-block">
          <a href="" class="btn-buy">申購</a>
        </div>
        <div class="btn-delete fas fa-times" @click="updateCompare(item)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LineChart from '@/components/Card.vue'
import Compare from '@/methods/localStorage-compare.js'
import emitter from '@/methods/eventBus'

export default defineComponent({
  name: 'App',
  data () {
    return {
      compareGroup: this.getCompare() || [],
      state: {
        chartData: {},
        chartOptions: {
          responsive: true
        }
      },
      isFirst: true
    }
  },
  beforeMount () {
    this.fillData()
  },
  // unmounted () {
  //   this.state.chartData = {}
  // },
  mixins: [Compare],
  components: {
    LineChart
  },
  methods: {
    fillData () {
      console.log('被觸發了')
      if (this.isFirst) {
        this.compareGroup.reverse()
      }
      console.log(this.compareGroup)
      if (this.compareGroup.length === 1) {
        // console.log(this.compareGroup[0])
        // console.log(this.compareGroup[1])
        const obj = { ...this.compareGroup[0].average_rate_of_return }
        const compareData1 = Object.values(obj)
        this.state.chartData = {
          labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
          datasets: [
            {
              label: this.compareGroup[0].fund,
              backgroundColor: 'rgba(153, 102, 255, .4)',
              data: compareData1
            }
          ]
        }
        // console.log(this.compareGroup[0])
      }
      if (this.compareGroup.length === 2) {
        // console.log(this.compareGroup[0])
        // console.log(this.compareGroup[1])
        // console.log(this.compareGroup[2])
        const obj = { ...this.compareGroup[0].average_rate_of_return }
        const compareData1 = Object.values(obj)
        const obj2 = { ...this.compareGroup[1].average_rate_of_return }
        const compareData2 = Object.values(obj2)
        this.state.chartData = {
          labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
          datasets: [
            {
              label: this.compareGroup[0].fund,
              backgroundColor: 'rgba(170, 170, 170, .3)',
              data: compareData1
            },
            {
              label: this.compareGroup[1].fund,
              backgroundColor: 'rgba(153, 102, 255, .4)',
              data: compareData2
            }
          ]
        }
        console.log(this.state.chartData)
      }
      if (this.compareGroup.length === 3) {
        const obj = { ...this.compareGroup[0].average_rate_of_return }
        const compareData1 = Object.values(obj)
        const obj2 = { ...this.compareGroup[1].average_rate_of_return }
        const compareData2 = Object.values(obj2)
        const obj3 = { ...this.compareGroup[2].average_rate_of_return }
        const compareData3 = Object.values(obj3)
        this.state.chartData = {
          labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
          datasets: [
            {
              label: this.compareGroup[0].fund,
              backgroundColor: 'rgba(255, 170, 0, .8)',
              data: compareData1
            },
            {
              label: this.compareGroup[1].fund,
              backgroundColor: 'rgba(170, 170, 170, .3)',
              data: compareData2
            },
            {
              label: this.compareGroup[2].fund,
              backgroundColor: 'rgba(153, 102, 255, .4)',
              data: compareData3
            }
          ]
        }
      }
      this.isFirst = false
    }
  },
  // watch: {
  //   state () {
  //     this.fillData()
  //   }
  // },
  mounted () {
    emitter.on('updateComareGroup', () => {
      this.fillData()
    })
  }
})
</script>
