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
                            <a href="" class="btn-buy" @click.prevent="updateApply(item)">申購</a>
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
                    <i class="fa-solid fa-minus"
                    v-if="openAccordionGroup.includes('chart')"></i>
                    <i class="fa-solid fa-plus" v-else></i>
                </a>
                <div class="accordion-body">
                  <div class="linechart-labels">
                    <div class="label">
                      <div class="block-linechart">
                        <LineChart v-bind:chartData="state.chartData" />
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
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">一年</div>
                            <div class="compare-td compare-td_one_item"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.one_year < 0}" >
                            {{ $filters.toPercent(item.performance.one_year) }}</div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">三年</div>
                            <div class="compare-td compare-td_one_item"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_year < 0}">
                            {{ $filters.toPercent(item.performance.three_year) }}</div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">成立至今</div>
                            <div class="compare-td compare-td_one_item"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.establishToNow < 0}">
                            {{ $filters.toPercent(item.performance.establishToNow) }}</div>
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
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">一年</div>
                            <div class="compare-td compare-td_two_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.one_year < 0}" >
                            {{ $filters.toPercent(item.performance.one_year) }}</div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">三年</div>
                            <div class="compare-td compare-td_two_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_year < 0}">
                            {{ $filters.toPercent(item.performance.three_year) }}</div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">成立至今</div>
                            <div class="compare-td compare-td_two_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.establishToNow < 0}">
                            {{ $filters.toPercent(item.performance.establishToNow) }}</div>
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
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">一年</div>
                            <div class="compare-td compare-td_three_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.one_year < 0}">
                            {{ $filters.toPercent(item.performance.one_year) }}</div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">三年</div>
                            <div class="compare-td compare-td_three_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.three_year < 0}">
                            {{ $filters.toPercent(item.performance.three_year) }}</div>
                        </div>
                        <div class="compare-tr">
                            <div class="compare-th">成立至今</div>
                            <div class="compare-td compare-td_three_items"
                            v-for="item in compareGroup" :key="item"
                            :class="{mark: item.performance.establishToNow < 0}">
                            {{ $filters.toPercent(item.performance.establishToNow) }}</div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- 基本資料 -->
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
                            <div class="compare-td compare-td_one_item"
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
      openAccordionGroup: ['chart'],
      isFixTop: '',
      state: {
        chartData: {},
        chartOptions: {
          responsive: true
        }
      }
    }
  },
  beforeMount () {
    this.fillData()
  },
  mixins: [Compare, localStorageApply],
  mounted () {
    goTop()
    window.addEventListener('scroll', this.scroll)
    emitter.on('updateComareGroup', () => {
      this.fillData()
    })
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
      this.state.chartData = {}
      if (this.compareGroup.length === 3) {
        this.state.chartData = {
          labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
          datasets: [
            {
              label: this.compareGroup[0].fund,
              backgroundColor: 'rgba(255, 170, 0, .8)',
              data: Object.values(this.compareGroup[0].average_rate_of_return)
            },
            {
              label: this.compareGroup[1].fund,
              backgroundColor: 'rgba(170, 170, 170, .3)',
              data: Object.values(this.compareGroup[1].average_rate_of_return)
            },
            {
              label: this.compareGroup[2].fund,
              backgroundColor: 'rgba(153, 102, 255, .4)',
              data: Object.values(this.compareGroup[2].average_rate_of_return)
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
