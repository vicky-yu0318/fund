<template>
  <Progress :currentProgress="currentProgress"></Progress>
  <section class="section-notes">
    <div class="container">
      <div class="scroll-bg">
        <div class="scroll-div">
          <div class="scroll-object">
            <h3 class="title">
              申購須知-「特定金錢信託投資國內外基金」電子服務相關規定
            </h3>
            <div class="content">
              <p>
                投資人及本行同意以符合電子簽章法之簽章，或以「金融機構辦理電子銀行業務安全控管作業基準」所訂之規範，作為投資人身分識別與同意本約定事項條款之依據，投資人無須簽名或蓋章，且投資人於本行網站線上同意本約定事項條款時，無須簽章。投資人及本行同意得以電子文件做為表示方法，依本約定事項交換之電子文件，其效力與書面文件相同。
              </p>
              <p>
                網銀、行銀系統之基金交易流程中所提及之「投資人、委託人、台端、本人、我、您、客戶」等用語，均意指「投資人(包含未成年投資人之法定代理人、受輔助宣告投資人之輔助人或經投資人授與締約代理權之意定代理人)。
              </p>
              <h4 class="note-heading">交易時間</h4>
              <ul class="note-list">
                <li>
                  一、
                  營業日時間上午八點三十分至下午三點三十分，若於非營業時間申請，則視為次一營業時間生效。
                </li>
                <li>
                  二、
                  本行受理交易時間如非基金公司之交易日時，以基金公司提供之確認資料為準。
                </li>
                <li>三、 於交易時間內一經執行確認之交易將無法取消。</li>
              </ul>
              <h4 class="note-heading">約定資料變更</h4>
              <ul class="note-list">
                <li>
                  一、
                  若變更生效日為該基金扣款日者，此變更事項將從下一次扣款日開始適用。
                </li>
                <li>
                  二、
                  投資人所指定之扣款標的，如該基金業已（或嗣後）經主管機關暫停或核准終止在國內募集及銷售、撤銷或廢止其核准或申報生效，投資人變更扣款條件時，依規定本行將不得受理投資人增加扣款金額（含增加扣款次數及嗣後恢復扣款）。
                </li>
                <li>
                  三、
                  「定存轉基金」專案之標的於約定投資期間內，所申請變更之指定投資標的，以本行所公告之特定基金公司及基金類型為限。如以外幣信託申購者，該變更後投資標的，以原投資標的之計價幣別為限。
                </li>
                <li>
                  四、
                  「定存轉基金」專案之標的於約定投資期間內，本行將不受理任何投資金額及投資扣款日之變更，另除投資人終止「定存轉基金」專案之信託投資約定外，本行不受理任何指定投資標的之終止扣款申請。
                </li>
                <li>
                  五、
                  投資人申請終止「定存轉基金」專案中之信託投資約定後，該專案編號下所連結之信託憑證將一併全數終止。「定存轉基金」專案中之信託投資約定終止後，則本行自終止日起不再進行指定標的之扣款投資，惟已轉存之各筆未到期定期性存款將存續，不自動辦理中途解約。
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="confirm-read">
        <label>
          <input type="checkbox" v-model="checkRead" />
          <span>投資人特此聲明已於合理審閱期間內將全部約定條款審閱完畢，並已充分了解且同意遵守全部內容。</span
          >
        </label>
      </div>
      <div class="block-btn">
        <div class="btn" @click="acceptNote">接受</div>
        <div class="btn btn-accept">不接受</div>
      </div>
    </div>
  </section>
</template>
<script>
import Progress from '@/components/Progress.vue'
export default {
  data () {
    return {
      currentProgress: this.$route.name,
      checkRead: ''
    }
  },
  components: {
    Progress
  },
  methods: {
    acceptNote () {
      if (!this.checkRead) {
        const message = { title: '請閱讀申購須知，充分了解且同意遵守全部內容，並打勾同意', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      this.$router.push('/apply')
    },
    sweetAlert (message) {
      this.$swal(message)
    }
  }
}
</script>
