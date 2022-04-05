<template>
  <!-- <Navbar></Navbar> -->
  <router-view></router-view>
  <Footer></Footer>
</template>

<style lang="scss">
@import '../assets/stylesheets/fund.css';
</style>

<script>
// import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    // Navbar
    Footer
  }
}
</script>
