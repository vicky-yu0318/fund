<template>
  <div class="breadcrumb">
    <div class="container">
      <ul class="breadcrumb-list">
        <li><a href="">首頁</a></li>
        <li v-if="currentPage === 'search'"><a href="" class="active" >基金搜尋</a></li>
        <li v-if="currentPage === 'compare'"><a href="" class="active" >基金比較表</a></li>
        <li v-if="currentPage === 'favorite'"><a href="" class="active" >基金觀察清單</a></li>
        <li v-if="currentPage === 'memberFavorite'"><a href="" class="active" >基金觀察清單</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    currentPage: {
      required: true
    }
  },
  mounted () {
    // console.log(this.currentPage)
  }
}
</script>
