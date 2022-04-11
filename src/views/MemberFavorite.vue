<template>
  <!-- <router-view v-if="loginData">00</router-view> -->
  <Navbar :loginStatus="loginStatus" :currentPage="currentPage"></Navbar>
  <section v-if="loginData"
  class="section section-favorite" id="section-favorite">
        <div class="container">
            <div class="block-main-title">
                <i class="fa-solid fa-heart"></i>
                <h2 class="main-title">基金觀察名單</h2>
            </div>
            <p>建議您先登入網路銀行，即可永久儲存觀察清單。 若未登入，最多僅觀察2筆，且該清單無法與網路銀行同步。</p>
            <div class="block-btn-more">
                <router-link to="/search" class="btn-more-fund">加入更多基金觀察</router-link>
            </div>
            <div class="block-favorite" v-if="myFavoriteGroup.length > 0">
                <div class="favorite-table">
                    <div class="favorite-tr">
                        <div class="favorite-th btns-th"></div>
                        <div class="favorite-th name-th">基金名稱</div>
                        <div class="favorite-th">幣別</div>
                        <div class="favorite-th">三個月報酬率</div>
                        <div class="favorite-th">一年報酬率</div>
                        <div class="favorite-th">三年報酬率</div>
                        <div class="favorite-th">風險屬性</div>
                        <div class="favorite-th"></div>
                    </div>
                    <!-- 2個以下觀察基金 樣板 -->
                    <template v-if="myFavoriteGroup.length <= 2">
                        <div class="favorite-tr"
                            v-for="item in myFavoriteGroup" :key="item">
                                <div class="favorite-td btns-td">
                                    <button class="btn-compare" id="btn-compare"
                                    >
                                        <i class="fas fa-plus"></i>比較
                                    </button>
                                    <button class="btn-heart" id="btn-heart"
                                     :class="{ active: myFavoriteGroup.includes(item)}"
                                     @click="updateFavorite(item)">
                                        <i class="fas fa-heart"></i>刪除
                                    </button>
                                </div>
                                <div class="favorite-td name-td"> {{ item.fund }} </div>
                                <div class="favorite-td"> {{ item.currency }} </div>
                                <div class="favorite-td"
                                 :class="{ mark: item.performance.three_month_year < 0 }">
                                 {{ $filters.toPercent(item.performance.three_month_year) }} </div>
                                <div class="favorite-td"
                                :class="{ mark: item.performance.three_month_year < 0 }">
                                {{  $filters.toPercent(item.performance.one_year) }}</div>
                                <div class="favorite-td"
                                :class="{ mark: item.performance.three_month_year < 0 }">
                                {{  $filters.toPercent(item.performance.three_year) }}</div>
                                <div class="favorite-td">{{ item.risk }}</div>
                                <div class="favorite-td">
                                    <a href="" class="btn-buy">申購</a>
                                </div>
                        </div>
                    </template>

                    <!-- 3個以下觀察基金 樣板 -->
                    <template v-if="myFavoriteGroup.length > 2">
                        <div class="favorite-tr"
                            v-for="item in myFavoriteGroup" :key="item">
                                <div class="favorite-td btns-td">
                                    <button class="btn-compare" id="btn-compare"
                                    >
                                        <i class="fas fa-plus"></i>比較
                                    </button>
                                    <button class="btn-heart" id="btn-heart"
                                     :class="{ active: myFavoriteGroup.includes(item)}"
                                     @click="updateFavorite(item)">
                                        <i class="fas fa-heart"></i>刪除
                                    </button>
                                </div>
                                <div class="favorite-td name-td"> {{ item.fund }} </div>
                                <div class="favorite-td"> {{ item.currency }} </div>
                                <div class="favorite-td"
                                 :class="{ mark: item.performance.three_month_year < 0 }">
                                 {{ $filters.toPercent(item.performance.three_month_year) }} </div>
                                <div class="favorite-td"
                                :class="{ mark: item.performance.three_month_year < 0 }">
                                {{  $filters.toPercent(item.performance.one_year) }}</div>
                                <div class="favorite-td"
                                :class="{ mark: item.performance.three_month_year < 0 }">
                                {{  $filters.toPercent(item.performance.three_year) }}</div>
                                <div class="favorite-td">{{ item.risk }}</div>
                                <div class="favorite-td">
                                    <a href="" class="btn-buy">申購</a>
                                </div>
                        </div>
                        <!-- <div class="btn-goLogin-dark">
                            <p>若未登入，最多僅觀察2筆，且該清單無法與網路銀行同步。</p>
                            <router-link to="/login"
                            class="btn-goLogin"
                            >前往網銀</router-link>
                        </div> -->
                    </template>
                </div>
            </div>
        </div>
    </section>

</template>

<style lang="scss">
@import '../assets/stylesheets/fund.css';
</style>

<script>
import Favorite from '@/methods/localStorage.js'
import goTop from '@/methods/goTop.js'
import Navbar from '@/components/Navbar.vue'

export default {
  data () {
    return {
      currentPage: this.$route.name,
      loginData: '',
      myFavoriteGroup: this.getFavorite() || []
    }
  },
  components: {
    Navbar
  },
  mixins: [Favorite],
  mounted () {
    this.loginData = this.getUser()
    goTop()
    console.log(this.loginData)
  },
  methods: {
    getUser () {
      // 讀檔get:
      return JSON.parse(localStorage.getItem('loginUser'))
    }
  }
}
</script>
