<template>
  <!-- 搜尋區 -->
  <div class="search_box">
    <input type="text" class="search" @input="searchValue"
    v-model="keyword" />
  </div>
  <!-- 搜尋list -->
  <div class="list_li" @click="pitchOn"
    v-for="(item, i) in filterList" :key="item" :data-index="i">
    <!-- 裡面再放 -->
    <Highlight :innertext="item.company" :innersearch="keyword"></Highlight>
  </div>
</template>

<script>
import Highlight from '@/components/Highlight.vue'
export default {
  data () {
    return {
      keyword: '',
      fundData: [
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
          company: '國泰投信',
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
      ],
      filterList: []
    }
  },
  methods: {
    searchValue (e) {
      // this.keyword = e.target.value
      if (this.keyword.length > 0) {
        // 若有輸入內容觸發 (出現類似(過濾)內容的陣列)
        this.filterList = []
        const arr = []
        for (let i = 0; i < this.fundData.length; i++) {
          if (this.fundData[i].company.indexOf(this.keyword) > -1) {
            arr.push(this.fundData[i])
          }
        }
        this.filterList = arr
        // {fund: '富蘭克林基金', company: '富邦投顧', code: '00400000', asset: {…}, currency: '台幣', …}
      } else {
        // 沒輸入資料 => 清空
        this.filterList = []
      }
    },
    pitchOn (e) {
      const index = e.currentTarget.dataset.index
      // const index = e.target.dataset.index 我按的是highlight list的原件，
      // 我要拿到父層綁定的資料，用currentTarget 否則 e.target
      // Cannot read properties of undefined 他沒有綁定dataset
      console.log({ title: `Selected: ${this.filterList[index].company}`, icon: 'none' })
      // {title: 'Selected: 富邦投顧', icon: 'none'}
    }
  },
  components: {
    Highlight
  }
}
</script>

<style>
.searchMark {
  color: green;
}
</style>
