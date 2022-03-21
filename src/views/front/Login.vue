<template>
  <h1>登入頁面</h1>
  <div class="form-input">
    <label for="">帳號</label>
    <input type="text" id="username" v-model="user.username">
  </div>
  <div class="form-input">
    <label for="">密碼</label>
    <input type="password" id="password" v-model="user.password">
  </div>
  <input type="submit" @click="login">
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // console.log(this.user)
      // [API]: /admin/signin //
      //  document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            alert('登入成功')
            const { token, expired } = res.data
            document.cookie = `hexLogin=${token}; expires=${new Date(expired)}`
            this.$router.push('/admin/products')
          } else {
            alert('請重新登入')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
