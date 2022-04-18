<template>
  <section class="section-bannerApply">
    <div class="container">
      <div class="content">
        <p>每月一點點投資，你會看到積沙成塔的力量</p>
      </div>
    </div>
  </section>
  <Progress></Progress>
  <section class="section-apply">
    <div class="container">
      <div class="block-apply">
        <form action="" class="form-apply">
          <div class="apply-tr">
            <div class="apply-th">專案優惠</div>
            <div class="apply-td">線上享6折</div>
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
            <div class="apply-th">是否已取得公開說明書</div>
            <div class="apply-td">
              <input type="radio" name="getInfo" class="radioInfo" /><span
                class="isInfo"
                >是</span
              >
              <input type="radio" name="getInfo" class="radioInfo" /><span
                class="isInfo"
                >否</span
              >
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">基金申購幣別</div>
            <div class="apply-td">
              <!-- <template v-if="applyItem.currency !== '台幣'"> -->
                <input type="radio" name="getInfo" class="radioInfo" v-model="usd" />
                <div class="isInfo">直接扣<span>美金</span>申購</div>
              <!-- </template> -->
              <input type="radio" name="getInfo" class="radioInfo" />
              <div class="isInfo">直接扣<span>臺幣</span>申購</div>
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th apply-caption">扣款資訊</div>
            <div class="apply-td apply-caption apply-empty"></div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">日期</div>
            <div class="apply-td">
              <input type="date" class="apply-date" />
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">扣款帳號</div>
            <div class="apply-td">
              <select name="" id="">
                <option>請選擇</option>
                <option>888222333624</option>
                <option>777222333688</option>
              </select>
              <span class="remark">可投資餘額： $5000</span>
            </div>
          </div>
          <div class="apply-tr">
            <div class="apply-th">申購金額</div>
            <div class="apply-td">
              <img src="https://upload.cc/i1/2022/04/17/xFMocp.png" alt="" />
              <!-- [img]https://upload.cc/i1/2022/04/17/SR7LAm.png[/img] -->
              <input type="number" class="applyAmount" min="1000" />
              <span class="remark"
                >(最低申購限額為「美金2,000.00元」)
                (最低申購限額為「臺幣50,000元」)</span
              >
            </div>
          </div>
          <div class="block-btn">
            <div class="btn btn-clear">清除內容</div>
            <div class="btn">確認申購</div>
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
      applyItem: this.getApply(),
      usd: ''
    }
  },
  components: {
    Progress
  },
  mixins: [localStorageApply],
  mounted () {
    goTop()
    console.log(this.applyItem)
  }

}
</script>
