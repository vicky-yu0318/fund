<template>
  <section class="section section section-progressbar" id="section-progressbar">
    <div class="container">
      <ul class="progressbar">
        <li class="progressItem" :class="{active: currentProgress === 'note'}" ><span></span>閱讀規定</li>
        <li class="progressItem" :class="{active: currentProgress === 'apply'}"><span></span>輸入並確認資料</li>
        <li class="progressItem" :class="{active: currentProgress === 'order'}"><span></span>交易結果</li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    currentProgress: {
      type: String
    }
  }
}
</script>
