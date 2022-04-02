<template>
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<style lang="scss">
@import '../assets/stylesheets/fund.css';
</style>

<script>
import Navbar from '@/components/Navbar.vue'

export default {

  components: {
    Navbar
  }
}
</script>
