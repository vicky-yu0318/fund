<template>
  <router-link to="/admin/products">後台-產品列表</router-link> /
  <router-link to="/admin/orders">後台-訂單列表</router-link>
  <h1>管理介面</h1>
  <router-view v-if="check"></router-view>
</template>

<style lang="scss">
// 前後台分開引入
@import '@/assets/stylesheets/all';
</style>

<script>
// var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// [API]: /api/user/check
export default {
  data () {
    return {
      // 預設是看不到router-view的
      check: false
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexLogin\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          this.check = true
        } else {
          this.$router.push('/login')
        }
      })
  }
}
</script>
