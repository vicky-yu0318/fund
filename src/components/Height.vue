<template>
  <!-- 輸入富邦之後改"富" 觸發後要再更新一次 所以要清空 -->
  <div v-if= "changeText">
    <span v-for="item in highlightList" :key="item"
    :class="item.deep ? 'searchMark': ''">{{ item.val }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      highlightList: [] // processed data
    }
  },
  props: {
    innertext: {
      type: String
    },
    innersearch: {
      type: String
    }
  },
  mounted () {
    // console.log(this.innertext) 富邦投顧 國泰投信
    // console.log(this.innertext.indexOf('顧')) 有幾個item 救回傳幾次
    // console.log(this.innertext.indexOf('顧')) 富邦投顧 => 3; 沒有則回傳-1
    this.filterHighlight(this.innertext, this.innersearch)
  },
  methods: {
    filterHighlight (text, search) {
      // 第一步: 處理list
      const textList = text.split('')
      //   ['投', '顧']
      const list = []
      //   把字拆開放物件
      for (let i = 0; i < textList.length; i++) {
        const obj = {
          deep: false,
          val: textList[i]
        }
        list.push(obj)
      }
      //   console.log(list)
      //     0: {deep: false, val: '富'}
      //     1: {deep: false, val: '邦'}
      //     2: {deep: false, val: '投'}
      //     3: {deep: false, val: '顧'}
      //     0: {deep: false, val: '國'}
      //     1: {deep: false, val: '太'}
      //     2: {deep: false, val: '投'}
      //     3: {deep: false, val: '信'}
      // 第二步: 處理search的資料
      const searchList = search.split('')
      for (let k = 0; k < searchList.length; k++) {
        // console.log(searchList) 我搜尋的資料['顧']
        list.forEach((item) => {
          if (item.val === searchList[k]) {
            // 代表要高亮 判定只有3: {deep: true, val: '顧'}高亮
            item.deep = true
          }
        })
      }
      this.highlightList = list
      // console.log(this.highlightList)
      // 0: {deep: false, val: '富'}
      // 1: {deep: false, val: '邦'}
      // 2: {deep: false, val: '投'}
      // 3: {deep: true, val: '顧'}
    }
  },
  computed: {
    changeText () {
      // 觸發此值後
      // 如果搜尋欄有東西 和 我們提供的公司資料有他搜尋的東西 => 跑函式並回傳
      if (this.innersearch.length > 0 && this.innertext.indexOf(this.innersearch) > -1) {
        this.filterHighlight(this.innertext, this.innersearch)
      }
      return this.innertext
    }
  }
}
</script>
<style>
.searchMark {
  color: var(--third-color);
  font-weight: 600;
}
</style>
