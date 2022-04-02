<template>
  <header class="header">
    <div class="container">
      <a href="" class="logo fa-solid fa-filter-circle-dollar">
        Fund
        <h1 class="sr-only">playfund</h1>
      </a>

      <nav class="navbar" :class="{active: isFixTop}">
        <router-link to="/fundResearch"> <i class="fas fa-search"></i> 基金搜尋</router-link>
        <router-link to="/compare">
          <i class="fa-solid fa-arrow-up-wide-short"></i> 基金比較表</router-link>
        >
        <router-link to="/favorite"> <i class="fas fa-heart"></i> 基金觀察清單</router-link>
      </nav>

      <router-link to="/login" class="btn-login btn" v-if="!loginStatus">登入網銀</router-link>
      <div class="btn-login btn" v-else
       @click="logout">登出</div>
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
  props: {
    loginStatus: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    fixTop () {
      if (window.scrollY > 100) {
        this.isFixTop = true
      } else {
        this.isFixTop = false
      }
    },
    sweetAlert (message) {
      this.$swal(message)
    },
    logout () {
      const message = { title: '登出成功', icon: 'success' }
      this.sweetAlert(message)
      // setTimeout(() => {
      // }, 3000)
      this.$router.push('/favorite')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.fixTop)
  }
}
</script>
