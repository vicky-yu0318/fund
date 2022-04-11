<template>
  <header class="header">
    <div class="container">
      <a href="" class="logo fa-solid fa-filter-circle-dollar">
        Fund
        <h1 class="sr-only">playfund</h1>
      </a>

      <router-link to="/" class="btn">回首頁</router-link>
    </div>
  </header>

  <section class="section-login" id="section-login">
    <div class="container">
      <h2 class="title">網路銀行</h2>
      <form action="" class="form-login" @submit.prevent="login">
        <div class="input-field">
          <label for="">身分證字號</label>
          <input type="text" v-model="user.userid"/>
        </div>
        <div class="input-field">
          <label for="">用戶代號</label>
          <input type="text" v-model="user.username"/>
        </div>
        <div class="input-field">
          <label for="">網銀密碼</label>
          <div class="input-box">
            <input type="password" class="input-password" v-model="user.password"
             v-if="!showPassword"/>
            <input type="text" class="input-password" v-model="user.password"
             v-else/>
            <div class="btn-eye fas fa-eye"
            v-if="showPassword"
            @click="showPassword = !showPassword"></div>
            <div class="btn-eye fa-solid fa-eye-slash" v-else
            @click="showPassword = !showPassword"></div>
          </div>
        </div>
        <input type="submit" value="登入" class="btn-login"/>
      </form>
    </div>
  </section>
</template>

<style lang="scss">
@import '../assets/stylesheets/fund.css';
</style>

<script>
export default {
  data () {
    return {
      user: {
        userid: 'F123456789',
        username: 'aa888999',
        password: 'aa123456789'
      },
      showPassword: false
    }
  },
  methods: {
    login () {
      const correctData = {
        userid: 'F123456789',
        username: 'aa888999',
        password: 'aa123456789'
      }
      if (this.user.userid === correctData.userid &&
        this.user.username === correctData.username &&
        this.user.password === correctData.password) {
        const message = { title: '登入成功', icon: 'success' }
        this.sweetAlert(message)
        this.saveLogin(correctData)
        this.$router.push('/memberFavorite')
      } else {
        const message = { title: '身分 / 代號 / 密碼有誤', icon: 'error' }
        this.sweetAlert(message)
      }
    },
    // 存檔save:
    saveLogin (user) {
      const userString = JSON.stringify(user)
      localStorage.setItem('loginUser', userString)
    },
    sweetAlert (message) {
      this.$swal(message)
    }
  }
}
</script>
