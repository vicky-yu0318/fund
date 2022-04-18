<template>
    <Navbar :currentPage="currentPage"></Navbar>
    <Breadcrumb :currentPage="currentPage"></Breadcrumb>
  <section class="section section-favorite" id="section-favorite">
        <div class="container">
            <div class="block-main-title">
                <i class="fa-solid fa-heart"></i>
                <h2 class="main-title">基金觀察名單</h2>
            </div>
            <p v-if="myFavoriteGroup.length > 0">建議您登入網路銀行，即可永久儲存觀察清單。 若未登入，最多僅觀察2筆，且該清單無法與網路銀行同步。</p>
            <div class="block-btn-more" v-if="myFavoriteGroup.length > 0">
                <router-link to="/search" class="btn-more-fund">加入更多基金觀察</router-link>
                <router-link to="/login" class="btn-goLogin">前往網銀</router-link>
            </div>
            <!-- 沒有基金 -->
            <div class="block-empty-favorite"  v-if="myFavoriteGroup.length === 0">
              <div class="empty-remark">
                <i class="fa-solid fa-magnifying-glass-plus icon-search"></i>
                <div class="content">
                  <p class="txt">您目前無觀察中的基金</p>
                  <p class="tip">請至<router-link to="/search" class="link-search">基金搜尋</router-link>
                  點選「<button class="btn-heart"><i class="fas fa-heart"></i>觀察</button>」
                  加入想觀察的基金。</p>
                </div>
              </div>
            </div>
            <div class="block-favorite" v-if="myFavoriteGroup.length !== 0">
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
                                     @click="confirmEqual(item)"
                                     :class="{active: compareGroup.includes(item)} || isActiveCompareBtn"
                                    >
                                        <i class="fas fa-plus"></i>比較
                                    </button>
                                    <button class="btn-heart" id="btn-heart"
                                     :class="{ active: myFavoriteGroup.includes(item) }"
                                     @click="deleteFavorite(item)">
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
                                    <a href="" class="btn-buy" @click="updateApply(item)">申購</a>
                                </div>
                        </div>
                    </template>

                    <!-- 3個以上觀察基金 樣板 -->
                    <template v-if="myFavoriteGroup.length > 2">
                        <div class="favorite-tr dark"
                            v-for="item in myFavoriteGroup" :key="item">
                                <div class="favorite-td btns-td">
                                    <button class="btn-compare" id="btn-compare"
                                    v-if="item"
                                    @click="confirmEqual(item)"
                                    :class="{active: compareGroup.includes(item) ||
                                    ActiveCompareGroup.includes(item)
                                    }"
                                    >
                                        <i class="fas fa-plus"></i>比較
                                    </button>
                                    <button class="btn-heart disabled" id="btn-heart"
                                     @click="deleteFavorite(item)">
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
                        <div class="btn-goLogin-dark">
                            <p>若未登入，最多僅觀察2筆，無法管理名單，且該清單無法與網路銀行同步。</p>
                            <router-link to="/login"
                            class="btn-goLogin"
                            >前往網銀</router-link>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Favorite from '@/methods/localStorage.js'
import Compare from '@/methods/localStorage-compare.js'
import Breadcrumb from '@/components/Breadcrumb.vue'
import goTop from '@/methods/goTop.js'
import Navbar from '@/components/Navbar.vue'

export default {
  data () {
    return {
      currentPage: this.$route.name,
      myFavoriteGroup: this.getFavorite() || [],
      compareGroup: this.getCompare() || []
    }
  },
  components: {
    Navbar,
    Breadcrumb
  },
  // 裡面有2個以上方法，無法像goTop() 直接運行，要mixins
  mixins: [Favorite, Compare],
  mounted () {
    goTop()
    this.compareGroup = this.getCompare() || []
    this.isCompareBtnActive()
  },
  methods: {
    isCompareBtnActive () {
      this.compareGroup.forEach((compare) => {
        this.myFavoriteGroup.forEach((favorite) => {
          if (JSON.stringify(compare) === JSON.stringify(favorite)) {
            this.ActiveCompareGroup.push(favorite)
            // favorite 和 compare是不同的物件(雖然內容一樣)
          }
        })
      })
    }
    // 不能直接在畫面寫原因，不會v-for畫面呈現後才跑function?
    // sure (sure) {
    //   this.compareGroup.forEach((compare) => {
    //     if (JSON.stringify(compare) === JSON.stringify(sure)) {
    //       return true
    //     }
    //   })
    // }
  }
}
</script>
