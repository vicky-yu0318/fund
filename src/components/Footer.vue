<template>
  <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col">
                    <a href="" class="logo fa-solid fa-filter-circle-dollar">
                        Fund <h2 class="sr-only">playfund </h2>
                    </a>
                    <p class="idea">安心金控旗下各子公司共同分享的核心價值，亦即「誠信、創新、親切、專業」，並惕勵每位安心同仁時刻將四大核心價值實現在日常工作中。</p>
                </div>
                <div class="col">
                    <h3>相關企業 <div class="underline"> <span></span> </div> </h3>
                    <ul class="office-list">
                        <li><router-link to="/external" class="externalLink"> <i class="fa-solid fa-building-columns"></i>安心人壽</router-link></li>
                        <li><router-link to="/external" class="externalLink"> <i class="fa-solid fa-building-columns"></i>安心銀行</router-link></li>
                        <li><router-link to="/external" class="externalLink"> <i class="fa-solid fa-building-columns"></i>安心產險</router-link></li>
                        <li><router-link to="/external" class="externalLink"> <i class="fa-solid fa-building-columns"></i>安心投信</router-link></li>
                        <li><router-link to="/external" class="externalLink"> <i class="fa-solid fa-building-columns"></i>安心投顧</router-link></li>
                    </ul>
                </div>
                <div class="col">
                    <h3>相關連結 <div class="underline"> <span></span> </div></h3>
                    <ul class="links">
                        <li>:::<router-link to="/external" class="externalLink"> <i class="fa-solid fa-building-columns"></i>無障礙網頁</router-link></li>
                        <li><router-link to="/external" class="externalLink"> <i class="fa-solid fa-circle-question"></i>常見問題</router-link></li>
                        <li><router-link to="/external" class="externalLink"> <i class="fa-solid fa-user"></i>員工專區</router-link></li>
                        <li><router-link to="/external" class="externalLink"> <i class="fa-solid fa-head-side-mask"></i>防疫紓困專區</router-link></li>
                    </ul>
                </div>
                <div class="col">
                    <h3>最新訊息 <div class="underline"> <span></span> </div></h3>
                    <form action="" class="form">
                        <div class="input-field">
                            <i class="far fa-envelope"></i>
                            <input type="email" placeholder="訂閱我們掌握第一手資訊">
                            <button type="button"> <i class="fas fa-arrow-right"></i></button>
                        </div>
                    </form>
                    <div class="social-icons">
                        <router-link to="/external" class="fab fa-facebook-f"></router-link >
                        <router-link to="/external" class="fa-brands fa-line"></router-link >
                    </div>
                </div>
            </div>
            <div class="copyright">
                本網站僅供個人作品使用，不提供商業用途
            </div>
        </div>
    </footer>
</template>
<style scoped>
  /* 除非在畫面寫，但就必須props判定在哪個路由 */
  /* :style="{'background-color': ' #ede4ee'}" */
  .footer::before {
    background-color: #ede4ee;
  }
</style>
