<template>
<!-- <div id="app">
    父元件切換資料內容，並重新渲染圖表
    <select
      v-model="chartdataloaded"
    >
      <option
        v-for="(item, index) in test"
        :key="index"
        :value="item"
      >
        測試 {{ index }}
      </option>
    </select>
      Chart.vue 模組
      chart_loaded 是當圖表資料為 API 非同步行為時，增加的"讀取後顯示判斷"
    <div id="Chart">
      <Chart
        v-if="chart_loaded"
        :chart-data="chartdataloaded"
      />
    </div>
  </div> -->
  <section class="section-compare section" id="section-compare">
        <div class="container">
            <div class="block-main-title">
                <i class="fa-solid fa-copy"></i>
                <h2 class="main-title">基金比較</h2>
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
                        <div class="btn-delete  fas fa-times"></div>
                    </li>
                </ul>
            </div>
            <!-- 3種比較基金 -->
            <div class="block-compare-items block_three_items"
             v-if="compareGroup.length === 3">
                <ul class="compare-items">
                    <li v-for="item in compareGroup" :key="item">
                        <h3>{{ item.fund }}</h3>
                        <div class="btn-block">
                            <a href="" class="btn-buy">申購</a>
                        </div>
                        <div class="btn-delete  fas fa-times"></div>
                    </li>
                </ul>
            </div>
            <div class="block-btn-more">
                <a class="btn-more">加入更多基金比較</a>
            </div>
            <!-- 績效走勢圖 -->
            <div class="block-accordion block_chart active"
             @click=" currentAccordion = 'chart',  updateOpenAccordionGroup('chart')"
              :class="{active: currentAccordion === 'chart' && openAccordionGroup.includes('chart')}">
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
                    chart.js
                </div>
            </div>
            <!-- 績效表現 -->
            <div class="block-accordion"
              @click=" currentAccordion = 'performance', updateOpenAccordionGroup('performance') "
              :class="{active: currentAccordion === 'performance' && openAccordionGroup.includes('performance')}">
                <a class="accordion-header">
                    <span>績效表現</span>
                    <i class="fa-solid fa-minus"
                      v-if="currentAccordion === 'performance' && openAccordionGroup.includes('performance')">
                    </i>
                    <i class="fa-solid fa-plus" v-else></i>
                </a>
                <!-- 2項資料呈現方式 -->
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
                <!-- 3項資料呈現方式 -->
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
              :class="{active: currentAccordion === 'basic' && openAccordionGroup.includes('basic')}">
                <a class="accordion-header">
                    <span>基本資料</span>
                    <i class="fa-solid fa-minus"
                      v-if="currentAccordion === 'basic' && openAccordionGroup.includes('basic')">
                    </i>
                    <i class="fa-solid fa-plus" v-else></i>
                </a>
                <div class="accordion-body">
                    <div class="compare-table">
                        <div class="compare-tr">
                            <div class="compare-th">成立時間</div>
                            <div class="compare-td compare-td_two_items">2010/01/06</div>
                            <div class="compare-td compare-td_two_items">2010/01/06</div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">基金類型</div>
                            <div class="compare-td compare-td_two_items">巴西股票</div>
                            <div class="compare-td compare-td_two_items">巴西股票</div>
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
                            <div class="compare-td compare-td_two_items">930百萬</div>
                            <div class="compare-td compare-td_two_items">930百萬</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>
<script>
import goTop from '@/methods/goTop.js'
// import Chart from '@/components/Chart.vue'
import emitter from '@/methods/eventBus'

export default {
  data () {
    return {
    //   compareGroup: []
    //   currentBreadCrumb: this.$route.name
    //   <breadCrumb  :currentBreadCrumb="currentBreadCrumb"></breadCrumb>
      compareGroup: [
        {
          fund: '富蘭克林基金',
          company: '富邦投顧',
          code: '00400000',
          asset: { 大宗商品: ['天然資源股票'] },
          currency: '台幣',
          rating: '4',
          established: 667785600000,
          risk: '保守型',
          scaleMillion: 2000,
          performance: {
            three_month_year: -0.3,
            one_year: 0.12,
            three_year: 0.5,
            establishToNow: 0.2
          }
        },
        {
          fund: '摩根新興35基金',
          company: '富邦投顧',
          code: '00200000',
          asset: { 大宗商品: ['天然資源股票'] },
          currency: '台幣',
          rating: '4',
          established: 667785600000,
          risk: '保守型',
          scaleMillion: 2000,
          performance: {
            three_month_year: 0.3,
            one_year: 0.12,
            three_year: 0.5,
            establishToNow: 0.2
          }
        }
        // {
        //   fund: '33',
        //   company: '富邦投顧',
        //   code: '00200000',
        //   asset: { 大宗商品: ['天然資源股票'] },
        //   currency: '台幣',
        //   rating: '4',
        //   established: 667785600000,
        //   risk: '保守型',
        //   scaleMillion: 2000,
        //   performance: {
        //     three_month_year: 0.3,
        //     one_year: 0.12,
        //     three_year: 0.5,
        //     establishToNow: 0.2
        //   }
        // }
      ],
      currentAccordion: '',
      openAccordionGroup: [],
      chart_loaded: true, /* 圖表讀取 */
      chartdataloaded: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: '測試1',
            borderColor: 'red',
            pointBackgroundColor: 'red',
            borderWidth: 1,
            pointBorderColor: 'white',
            data: [40, 35, 10, 40, 39, 80, 40]
          }
        ]
      },
      test: [
        {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: '測試1',
              borderColor: 'red',
              pointBackgroundColor: 'red',
              borderWidth: 1,
              pointBorderColor: 'white',
              data: [40, 35, 10, 40, 39, 80, 40]
            }
          ]
        },
        {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: '測試2',
              borderColor: 'skyblue',
              pointBackgroundColor: 'skyblue',
              borderWidth: 1,
              pointBorderColor: 'white',
              data: [50, 45, 20, 50, 35, 70, 50]
            }
          ]
        }
      ]
    }
  },
  components: {
    // Chart
    //   breadCrumb
  },
  mounted () {
    goTop()
    emitter.on('getSearchData', (compareGroup) => {
      //  this.compareGroup = compareGroup
      //  console.log(this.compareGroup)
      this.getSearchData()
    })
  },
  methods: {
    getSearchData () {
    //   console.log('yy')
    },
    updateOpenAccordionGroup (category) {
      // 打開 => 關閉,  -變+
      if (this.openAccordionGroup.includes(category)) {
        const index = this.openAccordionGroup.indexOf(category)
        this.openAccordionGroup.splice(index, 1)
      } else {
        // 關閉 => 打開, +變-
        this.openAccordionGroup.push(category)
      }
    }
  }
}
</script>
