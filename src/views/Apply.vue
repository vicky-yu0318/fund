<template>
  <section class="section-bannerApply" v-if="Object.keys(applyItem).length > 0">
    <Loading :active="isLoading">
           <!--     樣式包進 loading 元件內     -->
           <div class="loadingio-spinner-magnify-ki0t54cccsf"><div class="ldio-gafo7wcq9r4">
          <div><div><div></div><div></div></div></div>
          </div></div>
          <!--     樣式包進 loading 元件內     -->
    </Loading>
    <div class="container">
      <div class="content">
        <p>每月一點點投資，你會看到積沙成塔的力量</p>
      </div>
    </div>
  </section>
  <Progress :currentProgress="currentProgress"></Progress>
  <section class="section-apply">
    <div class="container">
      <div class="block-apply">
        <form action="" class="form-apply">
          <div class="apply-tr">
            <div class="apply-th">專案優惠</div>
            <div class="apply-td">線上下單享6折</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th apply-caption">基金資訊</div>
            <div class="apply-td apply-caption apply-empty"></div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">基金名</div>
            <div class="apply-td">{{applyItem.code}} - {{applyItem.fund}}</div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">是否已審閱公開說明書</div>
            <div class="apply-td">
              <input type="radio" name="getInfo" class="radioInfo"
               v-model="radioInfo" value="yes"/><span
                class="isInfo"
                >是</span
              >
              <input type="radio" name="getInfo" class="radioInfo"
                v-model="radioInfo" value="no"/><span
                class="isInfo"
                >否</span
              >
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">基金申購幣別</div>
            <div class="apply-td">
              <!-- 僅台幣下單 -->
              <template v-if="applyItem.currency === '台幣'">
                <input type="radio" name="currency" value="nt"
                 v-model="radioCurrency"/>
                <div class="isInfo">直接扣<span>臺幣</span>申購</div>
              </template>
              <!-- 可台幣、美元下單 -->
              <template v-if="applyItem.currency === '美元'">
                <input type="radio" name="currency" value="nt"
                 v-model="radioCurrency"/>
                <div class="isInfo">直接扣<span>臺幣</span>申購</div>
                <input type="radio" name="currency" class="radioCurrency" value="usd"
                  v-model="radioCurrency"/>
                <div class="isInfo">直接扣<span>美金</span>申購</div>
              </template>
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th apply-caption">扣款資訊</div>
            <div class="apply-td apply-caption apply-empty"></div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">日期</div>
            <div class="apply-td">
              <input type="date" class="apply-date" v-model="applyDate"/>
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">扣款帳號</div>
            <div class="apply-td">
              <select name="" id="" v-model="selectAccount">
                <option disabled>請選擇</option>
                <option v-for="user in userData" :key="user"
                :disabled="radioCurrency !== user.currency"
                >{{ user.account }}</option>
              </select>
              <template v-for="user in userData" :key="user">
                <span class="remark" v-if="selectAccount === user.account"
                >可投資餘額： {{user.currency === 'usd' ? '美金' : '台幣'}}
                {{ $filters.toCurrency(user.availableCash) }}</span>
              </template>
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">申購金額</div>
            <div class="apply-td">
              <!-- 選美金 -->
              <template v-if="radioCurrency === 'usd'">
                <img src="https://upload.cc/i1/2022/04/17/xFMocp.png"/>
                <input type="number" class="applyAmount" min="2000"
                v-model="applyUsd" @blur="confirmAmount('usd')"/>
                <span class="remark">(最低申購限額為「美金2,000.00元」)</span>
              </template>
              <!-- 選台幣 -->
              <template v-if="radioCurrency === 'nt'">
                <img src="https://upload.cc/i1/2022/04/17/SR7LAm.png"/>
                <input type="number" class="applyAmount" min="50000"
                 v-model="applyNt" @blur="confirmAmount('nt')"/>
                <span class="remark">(最低申購限額為「臺幣50,000元」)</span>
              </template>
            </div>
          </div>
          <div class="block-btn">
            <div class="btn btn-clear" @click="deleteApply">清除內容</div>
            <div class="btn" @click="confirmApply">確認申購</div>
          </div>
        </form>
        <div class="notice">
          <div class="title">注意事項：</div>
          <p>
            本基金係經金融監督管理委員會核准或申報生效在國內募集及銷售，惟不表示絕無風險。基金經理公司以往之經理績效不保證基金之最低投資收益；投資人申購前應詳閱基金公開說明書。
            公開說明書、投資人須知等資料可至分行臨櫃索取或至境外基金觀測站、總代理人網站、投信事業網站查詢。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Progress from '@/components/Progress.vue'
import localStorageApply from '@/methods/localStorage-apply.js'
import goTop from '@/methods/goTop.js'

export default {
  data () {
    return {
      currentProgress: this.$route.name,
      applyItem: this.getApply(),
      userData: [
        {
          account: '666666666666 (台幣帳戶)',
          availableCash: 120000,
          currency: 'nt'
        },
        {
          account: '999999999999 (美金帳戶)',
          availableCash: 80000,
          currency: 'usd'
        }
      ],
      selectAccount: '請選擇',
      radioCurrency: 'nt',
      radioInfo: 'yes',
      applyDate: '',
      todyStamp: '',
      applyUsd: '',
      applyNt: '',
      isLoading: false
    }
  },
  components: {
    Progress
  },
  mixins: [localStorageApply],
  mounted () {
    goTop()
    // this.todyStamp = new Date().getTime()
    this.applyDate = this.$filters.toFormalDate(new Date().getTime())
  },
  methods: {
    // toResultSection () {
    //   const domTitleResult = this.$refs.titleResult
    //   const titleOffsetTop = domTitleResult.offsetTop
    //   window.scrollTo({
    //     top: titleOffsetTop,
    //     behavior: 'smooth'
    //   })
    // }
    deleteApply () {
      this.selectAccount = '請選擇'
      this.applyNt = ''
    },
    confirmAmount (currency) {
      this.applyUsd = Number(this.applyUsd)
      this.applyNt = Number(this.applyNt)
      if (currency === 'nt') {
        this.userData.forEach((item) => {
          if (item.currency === currency) {
            if (this.applyNt > item.availableCash) {
              const message = { title: '餘額不足', icon: 'info' }
              this.sweetAlert(message)
              // return
              this.applyNt = ''
            }
          }
        })
        if (this.applyNt > 0 && this.applyNt < 50000) {
          const message = { title: '單筆申購金額不得小於台幣5萬元整', icon: 'info' }
          this.sweetAlert(message)
          this.applyNt = ''
        }
      } else if (currency === 'usd') {
        this.userData.forEach((item) => {
          if (item.currency === currency) {
            if (this.applyUsd > item.availableCash) {
              const message = { title: '餘額不足', icon: 'info' }
              this.sweetAlert(message)
              this.applyUsd = ''
            }
          }
        })
        if (this.applyUsd > 0 && this.applyUsd < 2000) {
          const message = { title: '單筆申購金額不得小於美金2仟元整', icon: 'info' }
          this.sweetAlert(message)
          this.applyUsd = ''
        }
      }
    },
    confirmApply () {
      // https://www.itread01.com/content/1549295292.html
      if (this.radioInfo === 'no') {
        const message = { title: '請確認審閱公開說明書', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      if (!this.applyDate) {
        const message = { title: '請選取下單日期', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      if (this.selectAccount.length < 5) {
        const message = { title: '請選擇扣款帳號', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      if (!this.applyNt && !this.applyUsd) {
        const message = { title: '請輸入申購金額', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      if (this.radioCurrency === 'nt') {
        const isCorrectAcc = this.selectAccount.search('台幣') !== -1
        if (!isCorrectAcc) {
          const message = { title: '請重新選擇扣款帳號', icon: 'info' }
          this.sweetAlert(message)
          return
        }
      }
      if (this.radioCurrency === 'usd') {
        const isCorrectAcc = this.selectAccount.search('美金') !== -1
        if (!isCorrectAcc) {
          const message = { title: '請重新選擇扣款帳號', icon: 'info' }
          this.sweetAlert(message)
          return
        }
      }
      const message = { title: '申購成功', icon: 'success' }
      this.sweetAlert(message)
      setTimeout(() => {
        this.isLoading = true
      }, 1500)
      setTimeout(() => {
        this.$router.push('/')
      }, 2500)
      // if ( typeof this.selectAccount.length )
      // const selectStamp = this.$filters.toTimeStamp(this.applyDate)
      // this.todyStamp = new Date().getTime()
      // if (selectStamp < this.todyStamp) {
      //   const message = { title: '申購日期須於今日以後10日內', icon: 'info' }
      //   this.sweetAlert(message)
      // }
    }
  }
}
</script>
<style scoped>
@keyframes ldio-gafo7wcq9r4 {
  0% {
    transform: translate(2px, 2px);
  }
  33.33% {
    transform: translate(102px, 2px);
  }
  66.66% {
    transform: translate(42px, 102px);
  }
  100% {
    transform: translate(2px, 2px);
  }
}
.ldio-gafo7wcq9r4 > div {
  transform: scale(0.8);
  transform-origin: 100px 100px;
}

.ldio-gafo7wcq9r4 > div > div {
  animation: ldio-gafo7wcq9r4 2.6315789473684212s linear infinite;
  position: absolute;
}

.ldio-gafo7wcq9r4 > div > div div:nth-child(1) {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 12px solid #ccc;
  background: transparent;
}

.ldio-gafo7wcq9r4 > div > div div:nth-child(2) {
  width: 17px;
  height: 51px;
  transform: rotate(-45deg);
  background: #ccc;
  border-radius: 0 0 8px 8px;
  position: absolute;
  top: 68px;
  left: 85px;
}
.loadingio-spinner-magnify-ki0t54cccsf {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-gafo7wcq9r4 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-gafo7wcq9r4 div {
  box-sizing: content-box;
}
/* generated by https://loading.io/ */
</style>
