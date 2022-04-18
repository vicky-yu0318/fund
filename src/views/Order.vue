<template>
  <section class="section-bannerOrder">
    <div class="container">
      <div class="content">
        <p>投資需遵守紀律，持之以恆獲得豐厚的報酬果實</p>
      </div>
    </div>
  </section>
  <Progress :currentProgress="currentProgress"></Progress>
  <section class="section-order">
    <div class="container">
      <div class="block-order">
        <div class="content">
          <div class="apply-tr">
            <div class="apply-th">專案優惠</div>
            <div class="apply-td">線上享6折</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">基金名</div>
            <div class="apply-td">5326 安聯收益成長月收美元</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">基金申購幣別</div>
            <div class="apply-td">美金</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">日期</div>
            <div class="apply-td">2018/01/01</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">扣款帳號</div>
            <div class="apply-td">
              669168133333
              <span class="remark">目前餘額： $5000</span>
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">申購金額</div>
            <div class="apply-td"></div>
          </div>
          <div class="block-btn">
            <div class="btn">回首頁</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Progress from '@/components/Progress.vue'
export default {
  data () {
    return {
      currentProgress: this.$route.name
    }
  },
  components: {
    Progress
  },
  methods: {
    sweetAlert (message) {
      this.$swal(message)
    }
  }
}
</script>
