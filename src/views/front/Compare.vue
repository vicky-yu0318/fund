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
                            <a href="" class="btn-buy">申購</a>
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
                            <a href="" class="btn-buy">申購</a>
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
                            <a href="" class="btn-buy">申購</a>
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
             @click=" currentAccordion = 'chart',  updateOpenAccordionGroup('chart')"
              :class="{active: currentAccordion === 'chart'}"
              v-if="compareGroup.length !== 0">
                <a class="accordion-header">
                    <span>績效走勢圖</span>
                    <!-- 用v-if 比:class佳 -->
                    <!-- 只有一種情況要顯示- 其他(包含預設)都是+ -->
                    <i class="fa-solid fa-minus"
                      v-if="currentAccordion === 'chart' && openAccordionGroup.includes('chart')">
                    </i>
                    <i class="fa-solid fa-plus" v-else></i>
                </a>
                <div class="accordion-body">
                  <div class="block-linechart">
                    <MonthlyChart v-bind:chartData="chartdata" v-bind:chartOptions="options" />
                  </div>
                </div>
                <!-- <div class="accordion-body" v-for="item in compareGroup" :key="item">
                  {{ item.average_rate_of_return }}
                </div> -->
            </div>
            <!-- 績效表現 -->
            <div class="block-accordion"
              @click=" currentAccordion = 'performance', updateOpenAccordionGroup('performance') "
              :class="{active: currentAccordion === 'performance' && openAccordionGroup.includes('performance')}"
              v-if="compareGroup.length !== 0">
                <a class="accordion-header">
                    <span>績效表現</span>
                    <i class="fa-solid fa-minus"
                      v-if="currentAccordion === 'performance' && openAccordionGroup.includes('performance')">
                    </i>
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
            <div class="block-accordion"
              @click=" currentAccordion = 'basic', updateOpenAccordionGroup('basic') "
              :class="{active: currentAccordion === 'basic' && openAccordionGroup.includes('basic')}"
              v-if="compareGroup.length !== 0">
                <a class="accordion-header">
                    <span>基本資料</span>
                    <i class="fa-solid fa-minus"
                      v-if="currentAccordion === 'basic' && openAccordionGroup.includes('basic')">
                    </i>
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
// import emitter from '@/methods/eventBus'
import Compare from '@/methods/localStorage-compare.js'
// 匯入圖表
import { defineComponent } from 'vue'
import MonthlyChart from '@/components/chart/Line.vue'

export default defineComponent({
  components: {
    Navbar,
    Breadcrumb,
    MonthlyChart
  },
  data () {
    return {
      currentPage: this.$route.name,
      compareGroup: this.getCompare() || [],
      currentAccordion: 'chart',
      openAccordionGroup: [],
      isFixTop: '',
      compareData1: [],
      compareData2: [],
      compareData3: [],
      compareLabel1: '',
      compareLabel2: '',
      compareLabel3: '',
      // this.data.datasets[0].label = this.compareGroup[0].fund
      chartdata: {
        labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
        datasets: [
          {
            label: '123',
            data: [10, -2, 10, 5, 2, 3, 10, -2, 10, 5, 2, 3],
            backgroundColor: 'rgba(153, 102, 255, .4)',
            borderColor: '#914DA0',
            borderWidth: 1
          },
          {
            label: '# of Votes',
            data: [5, -3, 11, 9, 8, 9, 5, -3, 11, 9, 8, 9],
            backgroundColor: 'rgba(170, 170, 170, .3)',
            borderColor: '#aaa',
            borderWidth: 1
          },
          {
            label: '3',
            data: [2, 4, -2, 9, 6, 5, 2, 4, -2, 9, 6, 5],
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
  // render () {
  //   return (
  //     <Fragment>
  //       <MonthlyChart chartData={this.chartData} chartOptions={this.options} />
  //     </Fragment>
  //   )
  // },
  mixins: [Compare],
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
    // emitter.on('getSearchData', (aa) => {
    // })
    window.addEventListener('scroll', this.scroll)
    this.arrangeLineData()
  },
  // watch: {
  //   chartdata: {
  //     handler () {
  //       // this.arrangeLineData()
  //       // this.chartdata.datasets[0].label = this.compareLabel1
  //       // this.chartdata.datasets[1].label = this.compareLabel2
  //       // this.chartdata.datasets[2].label = this.compareLabel3
  //       // console.log('deep')
  //       // this.render()
  //     },
  //     deep: true
  //   }
  // },
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
    arrangeLineData () {
      // 整理平均報酬率
      this.compareData1 = []
      this.compareData2 = []
      this.compareData3 = []
      if (this.compareGroup.length > 0) {
        const obj = this.compareGroup[0].average_rate_of_return
        this.compareData1 = Object.values(obj)
      }
      if (this.compareGroup.length === 2) {
        const obj = this.compareGroup[1].average_rate_of_return
        this.compareData2 = Object.values(obj)
      }
      if (this.compareGroup.length === 3) {
        const obj = this.compareGroup[2].average_rate_of_return
        this.compareData3 = Object.values(obj)
      }
      // 整理基金標的 label
      this.compareLabel1 = ''
      this.compareLabel2 = ''
      this.compareLabel3 = ''
      if (this.compareGroup.length > 0) {
        this.compareLabel1 = this.compareGroup[0].fund
      }
      if (this.compareGroup.length === 2) {
        this.compareLabel2 = this.compareGroup[1].fund
      }
      if (this.compareGroup.length === 3) {
        this.compareLabel3 = this.compareGroup[2].fund
      }
      // 塞資料到 label
      this.chartdata.datasets[0].label = this.compareLabel1
      this.chartdata.datasets[1].label = this.compareLabel2
      this.chartdata.datasets[2].label = this.compareLabel3
      console.log(this.chartdata.datasets[1].label)
    }
  }
})
</script>
<style>
  .block-linechart {
    margin: auto;
    width: 700px;
    padding-bottom: 50px;
  }

  @media (max-width: 767px) {
    .block-linechart {
      width: 100%;
  }
}
</style>
