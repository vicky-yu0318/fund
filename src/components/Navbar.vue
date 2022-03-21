<template>
  <header class="header">
    <div class="container">
      <a href="" class="logo fa-solid fa-filter-circle-dollar">
        Fund
        <h1 class="sr-only">playfund</h1>
      </a>

      <nav class="navbar">
        <a href="javascript:;"> <i class="fas fa-search"></i> 基金搜尋</a>
        <a href="javascript:;">
          <i class="fa-solid fa-arrow-up-wide-short"></i> 基金排行榜</a
        >
        <a href="javascript:;"> <i class="fas fa-heart"></i> 基金觀察清單</a>
      </nav>

      <div class="btn-login btn">登入網銀</div>
    </div>
    <div class="assistant">
      <div class="remark">我是智能客服，有問題可以敲我</div>
      <i class="btn-assistant fa-solid fa-person-dots-from-line">?</i>
    </div>
  </header>
</template>

<script>
// 希望讓navbar內的購物車產生數量變化，於navbar.vue去寫
// 只要任何一個畫面如產品，個別產品.vue檔案有用到nav.vue就會執行此mounted

import emitter from '../assets/javascript/emitter.js'

export default {
  data () {
    return {
      cart: {}
    }
  },
  methods: {
    getCart () {
      // [API]: /api/:api_path/cart
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          // 取我們要的主要資料再上一層，因為也會用到
          this.cart = res.data.data
          // console.log(res.data.data)
        }
      })
    }
  },
  mounted () {
    this.getCart()
    // 做監聽，如有觸發再打一次api
    emitter.on('update-cart', () => {
      this.getCart()
    })
  }
}
</script>
