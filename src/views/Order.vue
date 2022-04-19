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
            <div class="apply-td">{{orderData.project}}</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">基金名</div>
            <div class="apply-td">{{orderData.code}} {{orderData.fund}}</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">基金申購幣別</div>
            <div class="apply-td">{{orderData.currency}}</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">日期</div>
            <div class="apply-td">{{orderData.date}}</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">扣款帳號</div>
            <div class="apply-td">
              {{orderData.account}}
              <span class="remark">目前餘額： {{ orderData.curency === '台幣' ?
                `$NT ${$filters.toCurrency(orderData.availableCash)}` :
                `USD ${$filters.toCurrency(orderData.availableCash)}`}}</span>
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">申購金額</div>
            <div class="apply-td">
              {{ orderData.curency === '台幣' ? `$NT ${$filters.toCurrency(orderData.amountNt)}` :
               `USD ${$filters.toCurrency(orderData.amountUsd)}` }}
            </div>
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
import localStorageOrder from '@/methods/localStorage-order.js'

export default {
  data () {
    return {
      currentProgress: this.$route.name,
      orderData: this.getOrder()
    }
  },
  components: {
    Progress
  },
  mounted () {
    console.log(this.orderData)
  },
  mixins: [localStorageOrder],
  methods: {
    confirmOrder () {
      setTimeout(() => {
        this.isLoading = true
      }, 1500)
      setTimeout(() => {
        this.$router.push('/')
      }, 2500)
    }
  }
}
</script>
