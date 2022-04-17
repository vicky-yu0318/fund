<template>
  <router-view />
  <!--測試(前後台都看得到) <button type="button" class="btn btn-primary">按鈕</button> -->
</template>

<style lang="scss">
// @import 'bootstrap';
// @import './assets/stylesheets/all'
@import './assets/stylesheets/fund.css';
</style>
<script>

export default {
  data () {
    return {
      name: process.env.VUE_APP_NAME
    }
  }
}
</script>
