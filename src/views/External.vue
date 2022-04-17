<template>
  <section class="section-error">
    <div class="container">
      <div class="content">
        <div class="title">
            <p>親，頁尾連結都是像我一樣的畫面喔 !</p>
            <p>別擔心，我正帶你返回主頁的路上 </p>
        </div>
        <img src="/src/assets/Magnify.svg" alt="" width="200" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => {
      this.$router.push('/')
    }, 3500)
  }
}
</script>
