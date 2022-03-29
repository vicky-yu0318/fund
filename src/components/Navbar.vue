<template>
  <header class="header">
    <div class="container">
      <a href="" class="logo fa-solid fa-filter-circle-dollar">
        Fund
        <h1 class="sr-only">playfund</h1>
      </a>

      <nav class="navbar" :class="{active: isFixTop}">
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

export default {
  data () {
    return {
      isFixTop: false
    }
  },
  methods: {
    fixTop () {
      if (window.scrollY > 100) {
        this.isFixTop = true
      } else {
        this.isFixTop = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.fixTop)
  }
}
</script>
