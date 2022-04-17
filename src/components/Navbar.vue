<template>
  <header class="header">
    <div class="container">
      <a href="" class="logo fa-solid fa-filter-circle-dollar">
        Fund
        <h1 class="sr-only">playfund</h1>
      </a>
      <nav class="navbar" :class="{ active: isFixTop, activeList: isActiveList}"
        ref="refNav">
        <div class="container">
          <router-link to="/search"> <i class="fas fa-search"></i> 基金搜尋</router-link>
          <router-link to="/compare">
            <i class="fa-solid fa-arrow-up-wide-short"></i> 基金比較表</router-link>
          >
          <router-link to="/favorite"> <i class="fas fa-heart"></i> 基金觀察清單</router-link>
        </div>
      </nav>

      <template v-if="currentPage === 'favorite'">
        <router-link to="/login" class="btn-login btn" >登入網銀</router-link>
      </template>
      <template v-if="currentPage === 'memberFavorite'">
        <div class="btn-login btn" @click="logout">登出</div>
      </template>

      <div class="fas fa-bars btn-hamburger" @click="switchList"></div>
    </div>
    <div class="assistant" v-if="currentPage !== '/'">
      <div class="remark" > 安心基金智能客服，有問題可以隨時找我 </div>
      <i class="btn-assistant fa-solid fa-person-dots-from-line">?</i>
    </div>
  </header>
</template>

<script>

export default {
  data () {
    return {
      isFixTop: false,
      isActiveList: false
    }
  },
  props: {
    currentPage: {
      required: true
    }
  },
  methods: {
    hasClass (element, cls) {
      return (element.className).indexOf(cls) > -1
    },
    switchList () {
      if (!this.isActiveList) {
        this.isActiveList = true
      } else {
        this.isActiveList = false
      }
    //   if (!this.hasClass(this.$refs.refNav, 'activeList')) {
    //     // 如果沒有+上
    //     // this.isActiveList = true
    //     this.$refs.refNav.classList.add('activeList')
    //   } else {
    //     // this.isActiveList = false
    //     // 以hasClass來判斷收闔的，因此不能用狀態。
    //     this.$refs.refNav.classList.remove('activeList')
    //   }
    },
    isShowWindow () {
      const currentbreakpoint = window.matchMedia('(max-width: 575px)')
      if (currentbreakpoint.matches) {
        // this.$refs.refNav.classList.remove('activeList')
        this.isActiveList = false
      }
    },
    scrollActive () {
      this.isShowWindow()
      // this.$refs.refNav.classList.remove('active')
      // if (this.hasClass(this.$refs.refNav, 'activeList')) {
      //   this.$refs.refNav.classList.remove('activeList')
      // }
      this.fixTop()
    },
    fixTop () {
      if (window.scrollY > 100) {
        this.isFixTop = true
      } else {
        this.isFixTop = false
      }
      this.notFix()
    },
    notFix () {
      // https://www.w3schools.com/howto/howto_js_media_queries.asp
      const currentbreakpoint = window.matchMedia('(max-width: 575px)')
      if (currentbreakpoint.matches) { // If media query matches
        this.isFixTop = false
      }
    },
    sweetAlert (message) {
      this.$swal(message)
    },
    logout () {
      const message = { title: '登出成功', icon: 'success' }
      this.sweetAlert(message)
      this.$router.push('/favorite')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollActive)
  }
}
</script>
