<template>
<Navbar :currentPage="currentPage"></Navbar>
<Breadcrumb :currentPage="currentPage"></Breadcrumb>
  <section class="section-compare section" id="section-compare">
        <div class="container">
            <div class="block-main-title">
                <i class="fa-solid fa-copy"></i>
                <h2 class="main-title">基金比較 </h2>
            </div>
            <!-- 沒有基金 -->
            <div class="block-empty-compare"  v-if="compareGroup.length === 0">
              <div class="empty-remark">
                <i class="fa-solid fa-magnifying-glass-plus icon-search"></i>
                <div class="content">
                  <p class="txt">您目前無比較中的基金</p>
                  <p class="tip">請至<router-link to="/search" class="link-search">基金搜尋</router-link>
                  點選「<button class="btn-compare"><i class="fas fa-plus"></i>比較</button>」
                  加入想比較的基金。</p>
                </div>
              </div>
            </div>
            <!-- 1種比較基金 -->
            <div class="block-compare-items block_one_items" v-if="compareGroup.length === 1">
                <ul class="compare-items">
                    <li v-for="item in compareGroup" :key="item">
                        <h3>{{ item.fund }}</h3>
                        <div class="btn-block">
                            <a href="" class="btn-buy" @click.prevent="updateApply(item)">申購</a>
                        </div>
                        <div class="btn-delete  fas fa-times"
                        @click="updateCompare(item)"></div>
                    </li>
                </ul>
            </div>
            <!-- 2種比較基金 -->
            <div class="block-compare-items block_two_items"
             v-if="compareGroup.length === 2">
                <ul class="compare-items">
                    <li v-for="item in compareGroup" :key="item">
                        <h3>{{ item.fund }}</h3>
                        <div class="btn-block">
                            <a href="" class="btn-buy" @click.prevent="updateApply(item)">申購</a>
                        </div>
                        <div class="btn-delete  fas fa-times"
                        @click="updateCompare(item)"></div>
                    </li>
                </ul>
            </div>
            <!-- 3種比較基金 -->
            <div class="block-compare-items block_three_items"
             :class="{ active: isFixTop}"
             v-if="compareGroup.length === 3">
                <ul class="compare-items">
                    <li v-for="item in compareGroup" :key="item">
                        <h3>{{ item.fund }}</h3>
                        <div class="btn-block">
                            <a href="" class="btn-buy" @click="updateApply(item)">申購</a>
                        </div>
                        <div class="btn-delete  fas fa-times"
                        @click="updateCompare(item)"></div>
                    </li>
                </ul>
            </div>
            <div class="block-btn-more" v-if="compareGroup.length !== 0">
                <router-link class="btn-more-fund"
                to="/search">加入更多基金比較</router-link>
            </div>
            <!-- 績效走勢圖 -->
            <div class="block-accordion block_chart"
             @click="updateOpenAccordionGroup('chart')"
              :class="{active: openAccordionGroup.includes('chart') }"
              v-if="compareGroup.length !== 0">
                <a class="accordion-header">
                    <span>績效走勢圖</span>
                    <!-- 用v-if 比:class佳 -->
                    <i class="fa-solid fa-minus"
                    v-if="openAccordionGroup.includes('chart')"></i>
                    <i class="fa-solid fa-plus" v-else></i>
                </a>
                <div class="accordion-body">
                  <div class="linechart-labels">
                    <div class="label">
                      <div class="block-linechart">
                        <LineChart v-bind:chartData="state.chartData" />
                        <!-- <MonthlyChart v-bind:chartData="chartdata" v-bind:chartOptions="options" /> -->
                      </div>
                      <p>X軸：月份(近一年)</p>
                      <p>Y軸：平均報酬</p>
                    </div>
                  </div>
                </div>
            </div>
            <!-- 績效表現 -->
            <div class="block-accordion"
              @click="updateOpenAccordionGroup('performance')"
              :class="{active: openAccordionGroup.includes('performance') }"
              v-if="compareGroup.length !== 0">
                <a class="accordion-header">
                    <span>績效表現</span>
                    <i class="fa-solid fa-minus"
                    v-if="openAccordionGroup.includes('performance')"></i>
                    <i class="fa-solid fa-plus" v-else></i>
                </a>
                <!-- 績效表現-1項資料呈現方式 -->
                <div class="accordion-body" v-if="compareGroup.length === 1">
                    <div class="compare-table">
                        <div class="compare-tr" >
                            <div class="compare-th">三個月</div>
                            <div class="compare-td compare-td_one_item"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_month_year < 0}" >
                            {{ $filters.toPercent(item.performance.three_month_year) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">一年</div>
                            <div class="compare-td compare-td_one_item"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.one_year < 0}" >
                            {{ $filters.toPercent(item.performance.one_year) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">三年</div>
                            <div class="compare-td compare-td_one_item"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_year < 0}">
                            {{ $filters.toPercent(item.performance.three_year) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">成立至今</div>
                            <div class="compare-td compare-td_one_item"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.establishToNow < 0}">
                            {{ $filters.toPercent(item.performance.establishToNow) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">30%</div> -->
                        </div>
                    </div>
                </div>
                <!-- 績效表現-2項資料呈現方式 -->
                <div class="accordion-body" v-if="compareGroup.length === 2">
                    <div class="compare-table">
                        <div class="compare-tr" >
                            <div class="compare-th">三個月</div>
                            <div class="compare-td compare-td_two_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_month_year < 0}" >
                            {{ $filters.toPercent(item.performance.three_month_year) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">一年</div>
                            <div class="compare-td compare-td_two_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.one_year < 0}" >
                            {{ $filters.toPercent(item.performance.one_year) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">三年</div>
                            <div class="compare-td compare-td_two_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_year < 0}">
                            {{ $filters.toPercent(item.performance.three_year) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">成立至今</div>
                            <div class="compare-td compare-td_two_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.establishToNow < 0}">
                            {{ $filters.toPercent(item.performance.establishToNow) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">30%</div> -->
                        </div>
                    </div>
                </div>
                <!-- 績效表現-3項資料呈現方式 -->
                <div class="accordion-body" v-if="compareGroup.length === 3">
                    <div class="compare-table">
                        <div class="compare-tr" >
                            <div class="compare-th">三個月</div>
                            <div class="compare-td compare-td_three_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_month_year < 0}">
                            {{ $filters.toPercent(item.performance.three_month_year)}}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">一年</div>
                            <div class="compare-td compare-td_three_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.one_year < 0}">
                            {{ $filters.toPercent(item.performance.one_year) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">三年</div>
                            <div class="compare-td compare-td_three_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_year < 0}"
                            >
                            {{ $filters.toPercent(item.performance.three_year) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">37%</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">成立至今</div>
                            <div class="compare-td compare-td_three_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.establishToNow < 0}">
                            {{ $filters.toPercent(item.performance.establishToNow) }}</div>
                            <!-- <div class="compare-td compare-td_two_items">30%</div> -->
                        </div>
                    </div>
                </div>

            </div>
            <!-- 基本資料 -->
            <!--  === 'basic' -->
            <div class="block-accordion"
              @click="updateOpenAccordionGroup('basic')"
              :class="{active: openAccordionGroup.includes('basic') }"
              v-if="compareGroup.length !== 0">
                <a class="accordion-header">
                    <span>基本資料</span>
                     <i class="fa-solid fa-minus"
                    v-if="openAccordionGroup.includes('basic')"></i>
                    <i class="fa-solid fa-plus" v-else></i>
                </a>
                <!-- 基本資料- 1種比較基金 -->
                <div class="accordion-body" v-if="compareGroup.length === 1">
                    <div class="compare-table">
                        <div class="compare-tr">
                            <div class="compare-th">成立時間</div>
                            <div class="compare-td compare-td_one_item
"
                             v-for="item in compareGroup" :key="item">
                              {{ $filters.toFormalDate(item.established) }}
                            </div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">基金類型</div>
                            <div class="compare-td compare-td_one_item"
                              v-for="item in compareGroup" :key="item">
                              <template v-for="(category, key) in item.asset">{{ key }}</template>
                            </div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">風險屬性</div>
                            <div class="compare-td compare-td_one_item"
                            v-for="item in compareGroup" :key="item">
                            {{ item.risk }}</div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">基金規模</div>
                            <div class="compare-td compare-td_one_item"
                              v-for="item in compareGroup" :key="item">
                               {{ item.scaleMillion }} 百萬</div>
                        </div>
                    </div>
                </div>
                <!-- 基本資料- 2種比較基金 -->
                <div class="accordion-body" v-if="compareGroup.length === 2">
                    <div class="compare-table">
                        <div class="compare-tr">
                            <div class="compare-th">成立時間</div>
                            <div class="compare-td compare-td_two_items"
                             v-for="item in compareGroup" :key="item">
                              {{ $filters.toFormalDate(item.established) }}
                            </div>
                            <!-- <div class="compare-td compare-td_two_items">2010/01/06</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">基金類型</div>
                            <div class="compare-td compare-td_two_items"
                              v-for="item in compareGroup" :key="item">
                              <template v-for="(category, key) in item.asset">{{ key }}</template>
                            </div>
                            <!-- <div class="compare-td compare-td_two_items">巴西股票</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">風險屬性</div>
                            <div class="compare-td compare-td_two_items"
                            v-for="item in compareGroup" :key="item">
                            {{ item.risk }}</div>
                            <!-- <div class="compare-td compare-td_two_items">risk</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">基金規模</div>
                            <div class="compare-td compare-td_two_items"
                              v-for="item in compareGroup" :key="item">
                               {{ item.scaleMillion }} 百萬</div>
                            <!-- <div class="compare-td compare-td_two_items">930百萬</div> -->
                        </div>
                    </div>
                </div>
                <!-- 基本資料- 3種比較基金 -->
                <div class="accordion-body" v-if="compareGroup.length === 3">
                    <div class="compare-table">
                        <div class="compare-tr">
                            <div class="compare-th">成立時間</div>
                            <div class="compare-td compare-td_three_items"
                             v-for="item in compareGroup" :key="item">
                              {{ $filters.toFormalDate(item.established) }}
                            </div>
                            <!-- <div class="compare-td compare-td_two_items">2010/01/06</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">基金類型</div>
                            <div class="compare-td compare-td_three_items"
                              v-for="item in compareGroup" :key="item">
                              <template v-for="(category, key) in item.asset">{{ key }}</template>
                            </div>
                            <!-- <div class="compare-td compare-td_two_items">巴西股票</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">風險屬性</div>
                            <div class="compare-td compare-td_three_items"
                            v-for="item in compareGroup" :key="item">
                            {{ item.risk }}</div>
                            <!-- <div class="compare-td compare-td_two_items">risk</div> -->
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">基金規模</div>
                            <div class="compare-td compare-td_three_items"
                              v-for="item in compareGroup" :key="item">
                               {{ item.scaleMillion }} 百萬</div>
                            <!-- <div class="compare-td compare-td_two_items">930百萬</div> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import goTop from '@/methods/goTop.js'
import emitter from '@/methods/eventBus'
import Compare from '@/methods/localStorage-compare.js'
import localStorageApply from '@/methods/localStorage-apply.js'
// 匯入圖表
import { defineComponent } from 'vue'
import LineChart from '@/components/chart/Line.vue'

export default defineComponent({
  components: {
    Navbar,
    Breadcrumb,
    LineChart
  },
  data () {
    return {
      currentPage: this.$route.name,
      compareGroup: this.getCompare() || [],
      openAccordionGroup: [],
      isFixTop: '',
      state: {
        chartData: {},
        chartOptions: {
          responsive: true
        }
      }
    }
  },
  // beforeMount updated 子元件mounted 缺一不可
  beforeMount () {
    this.fillData()
  },
  // options: {
  //       title: {
  //         display: true,
  //         text: '近一年每月平均報酬'
  //       },
  //       scales: {
  //         y: {
  //           suggestedMin: 20,
  //           suggestedMax: 20
  //         }
  //       }
  //     }
  mixins: [Compare, localStorageApply],
  //   compareGroup: [
  //     {
  //       fund: '富蘭克林基金',
  //       company: '富邦投顧',
  //       code: '00400000',
  //       asset: { 大宗商品: ['天然資源股票'] },
  //       currency: '台幣',
  //       rating: '4',
  //       established: 667785600000,
  //       risk: '保守型',
  //       scaleMillion: 2000,
  //       performance: {
  //         three_month_year: -0.3,
  //         one_year: 0.12,
  //         three_year: 0.5,
  //         establishToNow: 0.2
  //       }
  //     },
  //     {
  //       fund: '摩根新興35基金',
  //       company: '富邦投顧',
  //       code: '00200000',
  //       asset: { 大宗商品: ['天然資源股票'] },
  //       currency: '台幣',
  //       rating: '4',
  //       established: 667785600000,
  //       risk: '保守型',
  //       scaleMillion: 2000,
  //       performance: {
  //         three_month_year: 0.3,
  //         one_year: 0.12,
  //         three_year: 0.5,
  //         establishToNow: 0.2
  //       }
  //     }
  //   ]
  mounted () {
    goTop()
    window.addEventListener('scroll', this.scroll)
    emitter.on('updateComareGroup', () => {
      this.fillData()
    })
    this.openAccordionGroup.push('chart')
  },
  methods: {
    updateOpenAccordionGroup (category) {
      // 打開 => 關閉,  -變+
      if (this.openAccordionGroup.includes(category)) {
        const index = this.openAccordionGroup.indexOf(category)
        this.openAccordionGroup.splice(index, 1)
      } else {
        // 關閉 => 打開, +變-
        this.openAccordionGroup.push(category)
      }
    },
    scroll () {
      if (window.scrollY > 100) {
        this.isFixTop = true
      } else {
        this.isFixTop = false
      }
    },
    fillData () {
      // console.log('被觸發了')
      this.state.chartData = {}
      // console.log(this.state.chartData)沒東西
      // console.log(this.compareGroup)
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
      if (this.compareGroup.length === 2) {
        this.state.chartData = {
          labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
          datasets: [
            {
              label: this.compareGroup[0].fund,
              backgroundColor: 'rgba(170, 170, 170, .3)',
              data: Object.values(this.compareGroup[0].average_rate_of_return)
            },
            {
              label: this.compareGroup[1].fund,
              backgroundColor: 'rgba(153, 102, 255, .4)',
              data: Object.values(this.compareGroup[1].average_rate_of_return)
            }
          ]
        }
      }
      if (this.compareGroup.length === 1) {
        this.state.chartData = {
          labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
          datasets: [
            {
              label: this.compareGroup[0].fund,
              backgroundColor: 'rgba(153, 102, 255, .4)',
              data: Object.values(this.compareGroup[0].average_rate_of_return)
            }
          ]
        }
      }
    }
    // arrangeLineData () {
    //   // 全部清掉不管剛是刪除哪個，待會全部加回
    //   console.log('do it')
    //   this.chartdata.datasets = []
    //   const detail = {
    //     label: '',
    //     data: [],
    //     backgroundColor: '',
    //     borderColor: '',
    //     borderWidth: ''
    //   }
    //   if (this.compareGroup.length > 0) {
    //     this.chartdata.labels = ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月']
    //     this.chartdata.datasets.push(detail)
    //     const obj = this.compareGroup[0].average_rate_of_return
    //     const compareLabel1 = this.compareGroup[0].fund
    //     const compareData1 = Object.values(obj)
    //     this.chartdata.datasets[0].label = compareLabel1
    //     this.chartdata.datasets[0].data = compareData1
    //     this.chartdata.datasets[0].backgroundColor = 'rgba(153, 102, 255, .4)'
    //     this.chartdata.datasets[0].borderColor = '#914DA0'
    //     this.chartdata.datasets[0].borderWidth = '1'
    //   }
    //   const detail2 = {
    //     label: '',
    //     data: [],
    //     backgroundColor: '',
    //     borderColor: '',
    //     borderWidth: ''
    //   }
    //   if (this.compareGroup.length >= 2) {
    //     this.chartdata.datasets.push(detail2)
    //     const obj = this.compareGroup[1].average_rate_of_return
    //     const compareData2 = Object.values(obj)
    //     const compareLabel2 = this.compareGroup[1].fund
    //     this.chartdata.datasets[1].label = compareLabel2
    //     this.chartdata.datasets[1].data = compareData2
    //     this.chartdata.datasets[1].backgroundColor = 'rgba(170, 170, 170, .3)'
    //     this.chartdata.datasets[1].borderColor = '#aaa'
    //     this.chartdata.datasets[1].borderWidth = '1'
    //   }
    //   const detail3 = {
    //     label: '',
    //     data: [],
    //     backgroundColor: '',
    //     borderColor: '',
    //     borderWidth: ''
    //   }
    //   if (this.compareGroup.length === 3) {
    //     this.chartdata.datasets.push(detail3)
    //     const obj = this.compareGroup[2].average_rate_of_return
    //     const compareData3 = Object.values(obj)
    //     const compareLabel3 = this.compareGroup[2].fund
    //     this.chartdata.datasets[2].label = compareLabel3
    //     this.chartdata.datasets[2].data = compareData3
    //     this.chartdata.datasets[2].backgroundColor = 'rgba(255, 170, 0, .8)'
    //     this.chartdata.datasets[2].borderColor = 'rgb(255, 170, 0)'
    //     this.chartdata.datasets[2].borderWidth = '1'
    //   }
    // }
  }
})
</script>
<style>
  .block-linechart {
    margin: auto;
    width: 700px;
    padding-bottom: 50px;
  }
  .linechart-labels p {
    margin: auto;
    width: 700px;
    text-align: right;
  }

  @media (max-width: 767px) {
    .block-linechart {
      width: 100%;
  }
  .linechart-labels p {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 15px;
  }
}
</style>
