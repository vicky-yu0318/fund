<template>
  <Navbar :currentPage="currentPage"></Navbar>
  <Breadcrumb :currentPage="currentPage"></Breadcrumb>
  <section class="section section-searchFund" id="section-searchFund">
    <!-- @click.stop="removeDescription -->
    <div class="container">
      <div class="block-main-title">
        <i class="fas fa-search"></i>
        <h2 class="main-title">基金搜尋</h2>
      </div>
      <div class="searchResult-title" :class="{ active: isFixTop }">
        <div>
          <span>{{ finalData.size }}</span>個結果
        </div>
        <a class="btn" @click="toResultSection">查看搜尋結果</a>
        <div class="btn" @click="resetAllConditons">重設所有條件</div>
      </div>
      <div class="notes">
        <p>您可輸入關鍵字搜尋，或透過以下條件設定，即可搜尋到相關資訊。</p>
        <span>資料來源：Morningstar</span>
      </div>
      <div class="row">
        <div class="title">關鍵字</div>
        <div class="content">
          <div class="keyword-wrap">
            <div class="input-field">
              <input
                type="text"
                placeholder="請輸入名稱/代碼"
                v-model="keyword"
                @input="searchFundValue"
                @keyup.enter="addFundCondition"
              />
               <!-- @blur="matchList = false" -->
              <ul
                class="match-list"
                v-if="matchList.length > 0 && showMatchList && keyword"
              >
                <li
                  class="match-item"
                  @click="pitchOnFund(item)"
                  v-for="item in matchList" :key="item"
                >
                  <Highlight :innertext="`${item.code}-${item.fund}`" :innersearch="keyword"></Highlight>
                </li>
              </ul>
            </div>
            <div
              class="fas fa-search btn-searchFund"
              id="btn-searchFund"
              @click="addFundCondition"
            ></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="title">基金公司</div>
        <div class="content">
          <!-- 以下 為顯示全部版 -->
          <div class="keyword-wrap-company" v-if="isCompanyMore" >
            <div class="input-field">
              <input
                type="text"
                placeholder="請輸入基金公司關鍵字"
                v-model="companyKeyword"
                ref="refMatchFund"
                @input="searchCompanyValue"
                @keyup.enter="addCompanyCondition"
              />
               <!-- @blur="matchCompanyList = false" -->
              <ul class="match-list"
                v-if="matchCompanyList.length > 0 && companyKeyword && showCompanyList">
                <li class="match-item match-item-company" ref="refMatchCompany"
                  v-for="(item, i) in matchCompanyList" :key="item" :data-index="i"
                  @click="pitchOnCompany(item)"
                  >
                  <Highlight :innertext="item" :innersearch="companyKeyword"></Highlight>
                </li>
              </ul>
            </div>
            <div
              class="fas fa-search btn-searchFund"
              @click="addCompanyCondition"></div>
          </div>
          <div class="btn-choose-group"
             v-if="isCompanyMore">
            <div
              class="btn-choose"
              v-for="item in companyCategory"
              :key="item"
              @click="updateCompanyCondition(item)"
              :class="{ active: chooseCompanyGroup.includes(item) }"
            >
              <i class="fas fa-star"></i> {{ item }}
            </div>
          </div>
          <!-- 以上 為顯示全部版 -->
          <!-- 以下 為簡約版 -->
          <div class="btn-choose-group btn-choose-group-company" v-if="!isCompanyMore">
            <div
              class="btn-choose"
              v-for="item in pointCompanyCategory"
              :key="item"
              @click="updateCompanyCondition(item)"
              :class="{
                active: chooseCompanyGroup.includes(item) && fixConditions.has(item)
              }"
            >
              <i class="fas fa-star"></i> {{ item }}
            </div>
          </div>
          <!-- 以上 為簡約版 -->
        </div>
        <div class="btn-more" @click="isCompanyMore = !isCompanyMore">
          更多基金公司
          <i class="fas fa-angle-down"></i>
        </div>
      </div>
      <div class="row asset-block">
        <div class="title">資產類別</div>
        <div class="content">
          <div
            class="btn-asset-choose"
            v-if="showAssetDetail"
            @click="backAsset"
          >
            <i class="fas fa-angle-left"></i>
            繼續選擇
          </div>
          <div class="btn-choose-group">
            <template v-for="item in assetCategory" :key="item">
              <div
                class="btn-choose"
                v-if="currentAsset === item || !isAssetOption"
                :class="{
                  disabled: showAssetDetail,
                  active: chooseAssetGroup.includes(item) && fixConditions.has(item)
                }"
                @click="addAssetCondition(item)"
              >
                {{ item }}
              </div>
            </template>
          </div>
          <div class="detail-check" v-if="showAssetDetail">
            <!-- 區別每個"全部"按鈕 -->
            <!-- <template v-for="item in assetCategory" :key="item"> -->
              <label v-if="currentAsset === '大宗商品'">
                <input
                  type="checkbox"
                  value="大宗商品"
                  v-model="allcheck1"
                  @click="checkAllAsset"
                />
                <span>全部</span>
              </label>
              <label v-if="currentAsset === '新興市場股票'">
                <input
                  type="checkbox"
                  value="新興市場股票"
                  v-model="allcheck2"
                  @click="checkAllAsset"
                />
                <span>全部 </span>
              </label>
              <label v-if="currentAsset === '高收益債'">
                <input
                  type="checkbox"
                  value="高收益債"
                  v-model="allcheck3"
                  @click="checkAllAsset"
                />
                <!-- :checked="checkDetailLen === currentAssetdetailLen && !isDetailStatus" -->
                <span>全部</span>
              </label>
            <!-- </template>  刪除某主類全細項，全主類全細項都會被刪除-->
            <!-- <label v-for="item in AssetDetailSet" :key="item">
              <input type="checkbox" :value="item" v-model="checkDetailGroup" />
              <span>{{ item }}</span>
            </label> -->
            <template v-if="currentAsset === '大宗商品'">
              <label v-for="item in showCurrentDetail" :key="item">
                <input type="checkbox" :value="item" v-model="checkDetailGroup1" />
                <span>{{ item }}</span>
              </label>
            </template>
            <template v-if="currentAsset === '新興市場股票'">
              <label v-for="item in showCurrentDetail" :key="item">
                <input type="checkbox" :value="item" v-model="checkDetailGroup2" />
                <span>{{ item }}</span>
              </label>
            </template>
            <template v-if="currentAsset === '高收益債'">
              <label v-for="item in showCurrentDetail" :key="item">
                <input type="checkbox" :value="item" v-model="checkDetailGroup3" />
                <span>{{ item }}</span>
              </label>
            </template>
          </div>
          <!-- <div class="category" v-if="isAssetDetail">
            <template v-for="item in assetCategory" :key="item">
              <button
                type="button"
                class="btnsmall"
                @click="checkAllAsset"
                :class="{
                  active:
                    showAllDetail.includes(item) && fixConditions.has(item)
                }"
                v-if="currentAsset === item"
              >
                全選
              </button>
            </template>
            <button
              type="button"
              class="btnDetail"
              v-for="item in AssetDetailSet"
              :key="item"
              @click="checkSingleAssetDetail(item)"
              :class="{
                active:
                  chooseSingleDetailGroup.has(item) && fixConditions.has(item)
              }"
            >
              {{ item }}
            </button>
          </div> -->
        </div>
      </div>

      <div class="row">
        <div class="title">計價幣別</div>
        <div class="content">
          <div class="btn-choose-group">
            <div
              class="btn-choose"
              v-for="item in currencyCategory"
              :key="item"
              @click="updateCurrencyCondition(item)"
              :class="{
                active:
                  chooseCurrencyGroup.includes(item) && fixConditions.has(item)
              }"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          class="title"
          @click="isShowratingDesription = !isShowratingDesription"
        >
          基金評等
          <a href="javascript:;">
            <i class="fa-solid fa-circle-question"></i>
          </a>
          <a class="title-description" v-if="isShowratingDesription"
            >根據基金的報酬、風險及費用三個面向發展出的晨星星等評級(Morningstar
            Rating)，用以呈現同組別基金風險調整後的相對表現，評級結果由最高5顆星到最低1顆星。
            <div>了解更多 <i class="fas fa-angle-right"></i></div>
          </a>
        </div>
        <div class="rating">
          <i
            ref="ratingStar"
            class="fas fa-star rating-star"
            v-for="item in 5"
            :key="item"
            @mouseover="hoverRating(item)"
            @click="clickRating(item)"
          ></i>
          <p class="rating-remark" v-if="showRatingRemark">
            <span>{{ currentRating }}</span
            >顆星以上
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="section section-searchResult" id="section-searchResult">
    <div class="container">
      <div class="block-main-title" ref="titleResult">
        <i class="fas fa-search"></i>
        <h2 class="main-title">搜尋結果</h2>
      </div>
      <div class="search-condition">
        <div class="condition-item" v-for="item in fixConditions" :key="item">
          {{ item }} <i class="fas fa-times" @click="deleteFixCondition(item)"></i>
        </div>
      </div>
      <!-- 沒搜尋結果 -->
      <div class="block-empty-search" v-if="finalData.size === 0">
        <div class="empty-remark">
          <i class="fa-solid fa-magnifying-glass-plus icon-search"></i>
          <div class="content">
            <p class="txt">目前無符合搜尋條件的基金</p>
            <p class="tip">請至上方選取您要搜尋的基金條件。</p>
          </div>
        </div>
      </div>
      <!-- 搜尋結果主分類 -->
      <div class="search-category" v-if="finalData.size > 0">
        <ul class="row">
          <li
            :class="{ active: currentSearchCatagory === 'basic' }"
            @click="currentSearchCatagory = 'basic'"
          >
            基本資料
          </li>
          <li
            :class="{ active: currentSearchCatagory === 'performance' }"
            @click="currentSearchCatagory = 'performance'"
          >
            報酬率
          </li>
          <li
            :class="{ active: currentSearchCatagory === 'risk' }"
            @click="currentSearchCatagory = 'risk'"
          >
            風險
          </li>
        </ul>
      </div>
      <!-- 一類: 基本資料 -->
      <div
        class="content basic-content"
        v-if="currentSearchCatagory === 'basic'"
      >
        <ul class="result-tr" v-if="finalData.size > 0">
          <li></li>
          <li>基金名稱</li>
          <li>發行日期</li>
          <li>基金類型</li>
          <li></li>
        </ul>
        <ul class="result-tr" v-for="item in finalData" :key="item">
          <li>
            <button
              class="btn-compare"
              id="btn-compare"
              @click="updateCompare(item, 'search')"
              :class="{ active: compareGroup.includes(item) }"
            >
              <i class="fas fa-plus"></i>比較
            </button>
            <button
              class="btn-heart"
              id="btn-heart"
              @click="updateFavorite(item, 'search')"
              :class="{ active: myFavoriteGroup.includes(item) }"
            >
              <i class="fas fa-heart"></i>觀察
            </button>
          </li>
          <li>{{ item.fund }}</li>
          <li>{{ $filters.toFormalDate(item.established) }}</li>
          <template v-for="(detail, key) in item.asset" :key="detail">
            <li>{{ key }} - {{ detail[0] }}</li>
          </template>
          <li><a href="javascript:;" class="btn-buy" @click.prevent="updateApply(item)">申購</a></li>
        </ul>
      </div>

      <!-- 二類: 報酬率 -->
      <div
        class="content performance-content"
        v-if="currentSearchCatagory === 'performance'"
      >
        <ul class="result-tr" v-if="finalData.size > 0">
          <li></li>
          <li>基金名稱</li>
          <li>三個月</li>
          <li>一年</li>
          <li>三年</li>
          <li>成立至今</li>
          <li></li>
        </ul>

        <ul class="result-tr" v-for="item in finalData" :key="item">
          <li>
            <button
              class="btn-compare"
              id="btn-compare"
              @click="updateCompare(item, 'search')"
              :class="{ active: compareGroup.includes(item) }"
            >
              <i class="fas fa-plus"></i>比較
            </button>
            <button
              class="btn-heart"
              id="btn-heart"
              @click="updateFavorite(item, 'search')"
              :class="{ active: myFavoriteGroup.includes(item) }"
            >
              <i class="fas fa-heart"></i>觀察
            </button>
          </li>
          <li>{{ item.fund }}</li>
          <li>{{ $filters.toPercent(item.performance.three_month_year) }}</li>
          <li>{{ $filters.toPercent(item.performance.one_year) }}</li>
          <li>{{ $filters.toPercent(item.performance.three_year) }}</li>
          <li>{{ $filters.toPercent(item.performance.establishToNow) }}</li>
          <li><a href="javascript:;" class="btn-buy" @click.prevent="updateApply(item)">申購</a></li>
        </ul>
      </div>

      <!-- 三類: 風險 -->
      <div class="content risk-content" v-if="currentSearchCatagory === 'risk'">
        <ul class="result-tr" v-if="finalData.size > 0">
          <li></li>
          <li>基金名稱</li>
          <li>晨星評等</li>
          <li>風險屬性</li>
          <li>資本額(百萬)</li>
          <li></li>
        </ul>
        <ul class="result-tr" v-for="item in finalData" :key="item">
          <li>
            <button
              class="btn-compare"
              id="btn-compare"
              @click="updateCompare(item, 'search')"
              :class="{ active: compareGroup.includes(item) }"
            >
              <i class="fas fa-plus"></i>比較
            </button>
            <button
              class="btn-heart"
              id="btn-heart"
              @click="updateFavorite(item, 'search')"
              :class="{ active: myFavoriteGroup.includes(item) }"
            >
              <i class="fas fa-heart"></i>觀察
            </button>
          </li>
          <li>{{ item.fund }}</li>
          <li>{{ item.rating }}</li>
          <li>{{ item.risk }}</li>
          <li>{{ item.scaleMillion }}</li>
          <li><a href="javascript:;" class="btn-buy" @click.prevent="updateApply(item)">申購</a></li>
        </ul>
      </div>
    </div>
  </section>

  <div class="window">
    <!-- 情境1: 比較清單 -->
    <div class="window-upper" :class="{ active: showUpperBody === 'compare' }">
      <div class="window-head" @click="showUpperBody = ''">
        <div class="title">
          比較清單
          <span v-if="compareGroup.length > 0"
            >({{ compareGroup.length }})</span
          >
        </div>
        <div class="fas fa-angle-down"></div>
      </div>
      <!-- body 有資料 -->
      <div class="window-body" v-if="compareGroup.length > 0">
        <ul class="body-list">
          <li class="fund-item" v-for="item in compareGroup" :key="item">
            <div class="name">
              {{ item.fund }}<span>({{ item.code }})</span>
            </div>
            <div
              class="btn-close fas fa-times"
              @click="updateCompare(item, 'search')"
            ></div>
          </li>
        </ul>
        <div class="block-btn">
          <router-link to="/compare" class="btn">開始比較</router-link>
        </div>
      </div>
      <!-- body 無資料 -->
      <div class="window-body" v-else>
        <p class="empty-item">
          目前無比較項目，請添加
          <i class="fa-solid fa-angles-down"></i>
        </p>
        <div class="block-btn">
          <a class="btn">新增比較項目</a>
        </div>
      </div>
    </div>
    <!-- 情境2: 觀察清單 -->
    <div class="window-upper" :class="{ active: showUpperBody === 'favorite' }">
      <div class="window-head" @click="showUpperBody = ''">
        <div class="title">
          觀察清單
          <span v-if="myFavoriteGroup.length > 0"
            >({{ myFavoriteGroup.length }})</span
          >
        </div>
        <div class="fas fa-angle-down"></div>
      </div>
      <!-- body 有資料 -->
      <div class="window-body" v-if="myFavoriteGroup.length > 0">
        <ul class="body-list">
          <li class="fund-item" v-for="item in myFavoriteGroup" :key="item">
            <div class="name">
              {{ item.fund }}<span>{{ item.code }}</span>
            </div>
            <div
              class="btn-close fas fa-times"
              @click="updateFavorite(item, 'search')"
            ></div>
          </li>
        </ul>
        <div class="block-btn">
          <router-link to="/favorite" class="btn">前往觀察</router-link>
          <router-link to="/login" class="btn">前往網銀</router-link>
        </div>
      </div>
      <!-- body 無資料 -->
      <div class="window-body" v-else>
        <p class="empty-item">
          目前無觀察項目，請添加
          <i class="fa-solid fa-angles-down"></i>
        </p>
        <div class="block-btn">
          <router-link to="/favorite" class="btn">前往觀察</router-link>
          <router-link to="/login" class="btn">前往網銀</router-link>
        </div>
      </div>
    </div>
    <div class="window-footer" :class="{ active: showWindowFooter }">
      <div class="btn-list">
        <div
          class="btn-compare-list"
          @click="showUpperBody = 'compare'"
          :class="{
            active: showUpperBody === 'compare'  || showUpperBody === ''
          }"
        >
          比較清單 <span> {{ compareGroup.length }} </span>
        </div>
        <div
          class="btn-favorite-list"
          @click="showUpperBody = 'favorite'"
          :class="{ active: showUpperBody === 'favorite' }"
        >
          觀察清單 <span> {{ myFavoriteGroup.length }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import fundData from '@/json/fundData.json'
import localStorage from '@/methods/localStorage.js'
import localStorageCompare from '@/methods/localStorage-compare.js'
import localStorageApply from '@/methods/localStorage-apply.js'
import Highlight from '@/components/Highlight.vue'
import goTop from '@/methods/goTop.js'

export default {
  data () {
    return {
      allcheck1: true,
      allcheck2: true,
      allcheck3: true,
      currentPage: this.$route.name,
      finalData: '',
      funds: fundData,
      keyword: '',
      companyKeyword: '',
      matchList: [],
      matchCompanyList: [],
      showMatchList: false,
      showCompanyList: false,
      tempCondition: {},
      tempCompanyCondition: {},
      conditions: {
        fund: [],
        company: [],
        asset: {},
        rating: '',
        currency: []
      },
      fixConditions: '',
      companyCategory: [],
      pointCompanyCategory: [],
      assetCategory: [],
      aDetailCategory: {},
      currencyCategory: [],
      chooseCompanyGroup: [],
      chooseCurrencyGroup: [],
      chooseAssetGroup: [],
      isCompanyMore: false,
      rating: '',
      showRatingRemark: false,
      currentRating: '',
      isRating: false,
      beforeStarSring: '',
      isShowratingDesription: false,
      currentAsset: '',
      AssetDetailSet: '',
      assetDetailCategories: {},
      showAssetDetail: false,
      isAssetOption: false,
      assetTempObj: {},
      compareGroup: [],
      myFavoriteGroup: [],
      isFixTop: false,
      currentSearchCatagory: 'basic',
      showUpperBody: '',
      showWindowFooter: false,
      checkDetailGroup1: [],
      checkDetailGroup2: [],
      checkDetailGroup3: [],
      assetButtonActive: '',
      showCurrentDetail: []
    }
  },
  components: {
    Breadcrumb,
    Navbar,
    Highlight
  },
  mixins: [localStorage, localStorageCompare, localStorageApply],
  watch: {
    conditions: {
      handler (n, o) {
        this.filter()
      },
      deep: true
    },
    checkDetailGroup1: {
      handler () {
        this.allcheck1 = false
        // 非按全選再執行
        if (this.checkDetailGroup1.length !== 0) {
          this.updateDetail()
        }
      },
      deep: true
    },
    checkDetailGroup2: {
      handler () {
        this.allcheck2 = false
        if (this.checkDetailGroup2.length !== 0) {
          this.updateDetail()
        }
      },
      deep: true
    },
    checkDetailGroup3: {
      handler () {
        this.allcheck3 = false
        if (this.checkDetailGroup3.length !== 0) {
          this.updateDetail()
        }
      },
      deep: true
    }
    // finalData: {
    //   handler () {
    //     if (this.finalData.size === 0) {
    //       // this.finalData.clear()
    //     }
    //   },
    //   deep: true
    // }
  },
  methods: {
    updateDetail () {
      // 資料- 刪除- 主類- fixConditions
      this.fixConditions.delete(`${this.currentAsset}`)
      // 資料- 刪除 / 新增- fixConditions
      this.AssetDetailSet.forEach((del) => {
        this.fixConditions.delete(`${del}`)
      })
      this.checkDetailGroup1.forEach((detail) => {
        this.fixConditions.add(detail)
      })
      this.checkDetailGroup2.forEach((detail) => {
        this.fixConditions.add(detail)
      })
      this.checkDetailGroup3.forEach((detail) => {
        this.fixConditions.add(detail)
      })
      // 資料- 刪除- conditions 目前按的資產主類(EX: 大宗商品)  全細項刪除(刪物件)
      delete this.conditions.asset[this.currentAsset]
      // 資料- 新增- conditions
      if (this.currentAsset === '大宗商品') {
        this.conditions.asset[this.currentAsset] = [...this.checkDetailGroup1]
      }
      if (this.currentAsset === '新興市場股票') {
        this.conditions.asset[this.currentAsset] = [...this.checkDetailGroup2]
      }
      if (this.currentAsset === '高收益債') {
        this.conditions.asset[this.currentAsset] = [...this.checkDetailGroup3]
      }
      // 畫面- 判斷主類按鈕是否加上class
      // this.AssetDetailSet.forEach((item) => {
      //   if (this.fixConditions.has(item)) {
      //     this.assetButtonActive = true
      //   } else {
      //     this.assetButtonActive = false
      //   }
      // })
    },
    // enterData () {
    // this.matchList = this.funds.filter((fund) => {
    //     return fund.code.match(this.keyword) || fund.fund.match(this.keyword)
    //   })
    //   if (this.matchList.length > 0) {
    //     this.showMatchList = true
    //   }
    // },
    searchFundValue (e) {
      if (this.keyword) {
        // 若有輸入內容觸發 (出現(過濾)陣列)
        this.matchList = []
        const arr = []
        // 以下是拿funds資料 (fund/code)
        for (let i = 0; i < this.funds.length; i++) {
          if ((this.funds[i].fund.indexOf(this.keyword) > -1) || (this.funds[i].code.indexOf(this.keyword) > -1)) {
            arr.push(this.funds[i])
          }
        }
        this.matchList = arr
        this.showMatchList = true
      } else {
        // 沒輸入資料 => 清空
        this.matchList = []
      }
    },
    searchCompanyValue (e) {
      if (this.companyKeyword) {
        this.matchCompanyList = []
        const arr = []
        // 以下是拿分類好的company資料
        for (let i = 0; i < this.companyCategory.length; i++) {
          if (this.companyCategory[i].indexOf(this.companyKeyword) > -1) {
            arr.push(this.companyCategory[i])
          }
        }
        this.matchCompanyList = arr
        this.showCompanyList = true
      } else {
        this.matchCompanyList = []
      }
    },
    pitchOnFund (item) {
      this.keyword = item.code
      this.showMatchList = false
      this.tempCondition = item
    },
    pitchOnCompany (item) {
      this.companyKeyword = item
      this.showCompanyList = false
    },
    addFundCondition () {
      if (this.keyword === '') {
        const message = { title: '請輸入基金名稱/代號', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      // 如果keyword裡面的值符合資料庫
      this.funds.forEach((item) => {
        if (item.code === this.keyword || item.fund === this.keyword) {
          // 如果條件內已有這基金，就不新增condition
          // 資料- 新增- conditions & fixConditions
          if (!this.fixConditions.has(item.fund)) {
            this.conditions.fund.push(this.tempCondition.fund)
            this.keyword = ''
            this.fixConditions.add(this.tempCondition.fund)
          }
        }
      })
    },
    addCompanyCondition () {
      if (this.companyKeyword === '') {
        const message = { title: '請輸入您要搜尋的基金公司名稱', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      if (this.fixConditions.has(this.companyKeyword)) {
        const message = { title: '先前已加入搜尋條件中', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      this.companyCategory.forEach((item) => {
        if (item === this.companyKeyword) {
          this.updateCompanyCondition(item)
        }
      })
      this.companyKeyword = ''
    },
    addAssetCondition (item) {
      // 畫面- 細項是否呈現
      this.showAssetDetail = true
      // 畫面- 資產主類別是否 已選擇 (選擇才會讓其他的2個主類消失)
      this.isAssetOption = true
      // 判斷- 把現在按的主要資產類別 灌入狀態內(做細項參考)
      this.currentAsset = item
      // 畫面- 先備好個別資產細項
      this.showCurrentDetail = this.assetDetailCategories[this.currentAsset]
      // OK 畫面- 從8隻基金裡面「現在點選的主類別」細項 放在AssetDetailSet中，再顯示在畫面
      this.AssetDetailSet = new Set()
      this.funds.forEach((fund) => {
        const details = fund.asset[item]
        if (typeof details !== 'undefined') {
          details.forEach((detail) => {
            this.AssetDetailSet.add(detail)
          })
        }
      })
      // 畫面- 主資產類別可複選，使用一個群組包覆，把按過的資產主項目放在群組
      if (!this.chooseAssetGroup.includes(item)) {
        this.chooseAssetGroup.push(item)
        // 資料- 新增- fixConditions
        this.fixConditions.add(item)
      }
      // 資料- 新增- conditions
      // assetDetailCategories 為預先整理好的格式 {新興市場: [1,2,2,]; 成熟市場: [1,2,3]}
      const keyAry = Object.keys(this.assetDetailCategories)
      keyAry.forEach((key) => {
        if (key === item) {
          // 只有首次新增 主要資產屬性 需要推細項進去
          if (this.assetTempObj[key] === undefined) {
            this.assetTempObj[key] = [...this.assetDetailCategories[key]]
          }
        }
      })
      this.conditions.asset = this.assetTempObj
    },
    checkAllAsset () {
      // 畫面- 清空細項(觸發深層監聽) ps只能刪此主類細項
      if (this.currentAsset === '大宗商品') {
        this.checkDetailGroup1 = []
        if (!this.allcheck1) {
          // true
          this.allCheckTrue()
        } else {
          // false
          this.allCheckFalse()
        }
      }
      if (this.currentAsset === '新興市場股票') {
        this.checkDetailGroup2 = []
        if (!this.allcheck2) {
          this.allCheckTrue()
        } else {
          this.allCheckFalse()
        }
      }
      if (this.currentAsset === '高收益債') {
        this.checkDetailGroup3 = []
        if (!this.allcheck3) {
          this.allCheckTrue()
        } else {
          this.allCheckFalse()
        }
      }
    },
    allCheckTrue () {
      // 畫面- 主類按鈕
      if (!this.chooseAssetGroup.includes(this.currentAsset)) {
        this.chooseAssetGroup.push(this.currentAsset)
      }
      const currentDetail = this.assetDetailCategories[this.currentAsset]
      // 資料- 新增- fixConditions- 主類
      this.fixConditions.add(`${this.currentAsset}`)
      // 資料- 刪除- fixConditions- 目前 細項
      this.fixConditions.forEach((fix) => {
        currentDetail.forEach((detail) => {
          if (fix === detail) {
            this.fixConditions.delete(fix)
          }
        })
      })
      // 資料- 刪除- conditions- 目前 細項(1-3個)
      this.conditions.asset[this.currentAsset] = []
      // 資料- 新增- conditions- 主類(全)
      this.conditions.asset[this.currentAsset] = currentDetail
    },
    allCheckFalse () {
      // 畫面- 主類按鈕
      this.chooseAssetGroup.forEach((asset) => {
        if (this.currentAsset === asset) {
          const index = this.chooseAssetGroup.indexOf(asset)
          this.chooseAssetGroup.splice(index, 1)
        }
      })
      // 資料- 刪除- conditions- 目前 全細項(刪物件)
      delete this.conditions.asset[this.currentAsset]
      // 資料- 刪除- fixConditions- 刪除主項
      this.fixConditions.forEach((fix) => {
        if (fix === this.currentAsset) {
          this.fixConditions.delete(fix)
        }
      })
    },
    deleteFixCondition (item) {
      // 共用- 刪除 fixConditions
      this.fixConditions.delete(item)
      // 共用- 刪除 conditions
      if (this.conditions.company.includes(item)) {
        const index = this.conditions.company.indexOf(item)
        this.conditions.company.splice(index, 1)
      }
      if (this.conditions.fund.includes(item)) {
        const index = this.conditions.fund.indexOf(item)
        this.conditions.fund.splice(index, 1)
      }
      if (this.conditions.currency.includes(item)) {
        const index = this.conditions.currency.indexOf(item)
        this.conditions.currency.splice(index, 1)
      }
      if (this.conditions.asset) {
        const obj = this.conditions.asset
        const keyAry = Object.keys(obj)
        // keyAry = ['大宗商品', '新興市場股票', '高收益債']
        // 情況一: 條件式裡有現在按刪除 的"主類"，刪除
        if (keyAry.includes(item)) {
          keyAry.forEach((key) => {
            if (key === item) {
              // 刪除條件的屬性
              delete obj[key]
              // this.conditions.asset = obj
            }
          })
        }
        // 情況二： 條件式裡有現在按刪除 的"細項"，刪除
        // 如果我按的 item(天然資源股票) 從條件式裡 刪除
        keyAry.forEach((key) => {
          const valueAry = this.conditions.asset[key]
          if (valueAry !== undefined && valueAry.includes(item)) {
            const index = valueAry.indexOf(item)
            valueAry.splice(index, 1)
            // this.conditions.asset[key] = valueAry
            // 剩下[貴金屬股票] 灌回去條件式this.conditions.asset[key] = valueAry
          }
        })
      }
      if (this.conditions.rating) {
        const starString = `${this.conditions.rating}顆星評等`
        if (item === starString) {
          // 刪除 conditions
          this.conditions.rating = ''
          // 刪除 畫面 (不能綁畫面)
          this.showRatingRemark = false
          const domRatingStars = this.$refs.ratingStar
          domRatingStars.forEach((domRatingStar) => {
            domRatingStar.classList.remove('active')
          })
        }
      }
    },
    categoriesCompany () {
      const company = new Set()
      this.funds.forEach((fund) => {
        company.add(fund.company)
      })
      this.companyCategory = [...company]
      this.pointCompanyCategory = this.companyCategory.slice(0, 5)
    },
    categoriesAsset () {
      this.funds.forEach((item) => {
        const keyAry = Object.keys(item.asset)
        keyAry.forEach((key) => {
          if (!this.assetCategory.includes(key)) {
            this.assetCategory.push(key)
          }
        })
      })
      this.categoriesAssetDetail()
    },
    categoriesAssetDetail () {
      // 預期格式: {新興市場: [1,2,2,]; 成熟市場: [1,2,3]}
      const obj = {}
      this.funds.forEach((item) => {
        const keyArry = Object.keys(item.asset)
        keyArry.forEach((key) => {
          // 狀況一: 在物件裡第一次新增 屬性
          if (obj[key] === undefined) {
            obj[key] = JSON.parse(JSON.stringify(item.asset[key]))
          } else {
            // 狀況二: 在物件裡有此屬性了(把重複屬性值拿掉)
            // funds forEach 裡item (陣列)有傳參特性，需要深拷
            if (!obj[key].includes(item.asset[key][0])) {
              const newAry = JSON.parse(JSON.stringify(item.asset[key]))
              obj[key].push(...newAry)
            }
          }
          this.assetDetailCategories = obj
        })
      })
    },
    categoriesCurrency () {
      this.funds.forEach((item) => {
        if (!this.currencyCategory.includes(item.currency)) {
          this.currencyCategory.push(item.currency)
        }
      })
    },
    updateCompanyCondition (item) {
      // ▲ 狀況一：原本就有在條件中 (刪除)
      if (this.chooseCompanyGroup.includes(item)) {
        // 畫面- active 轉換
        const companyIndex = this.chooseCompanyGroup.indexOf(item)
        this.chooseCompanyGroup.splice(companyIndex, 1)
        // 資料- 刪除- fixConditions
        this.fixConditions.delete(item)
        // 資料- 刪除- conditions
        this.conditions.company = this.chooseCompanyGroup
      } else {
        // ▲ 狀況二： 新增
        // 畫面-
        this.chooseCompanyGroup.push(item)
        // 資料- 將陣列塞入conditions的company屬性值
        this.conditions.company = this.chooseCompanyGroup
        // 資料- fixConditions
        this.fixConditions.add(item)
      }
    },
    updateCurrencyCondition (item) {
      // ▲ 狀況一: 尚未按過
      if (!this.chooseCurrencyGroup.includes(item)) {
        // 畫面- active
        this.chooseCurrencyGroup.push(item)
        // 資料- 新增- fixConditions
        this.fixConditions.add(item)
        // 資料- 新增- conditions
        this.conditions.currency.push(item)
      } else {
        // ▲ 狀況二: 先前按過
        // 畫面- active取消
        const index = this.chooseCurrencyGroup.indexOf(item)
        this.chooseCurrencyGroup.splice(index, 1)
        // 資料- 刪除- fixConditions
        this.fixConditions.delete(item)
        // 資料- 刪除- conditions
        const conditionIndex = this.conditions.currency.indexOf(item)
        this.conditions.currency.splice(conditionIndex, 1)
      }
    },
    hoverRating (item) {
      if (!this.isRating) {
        const ratingStars = this.$refs.ratingStar
        ratingStars.forEach((ratingStar, i) => {
          if (item > i) {
            const dom = ratingStars[i]
            if (dom !== undefined) {
              dom.classList.add('active')
            }
          }
          // 加入滑鼠移開的事件監聽，以避免寫在行內，會造成之後click事件無法移除(已按，移開卻有mouseout效果)
          ratingStar.addEventListener('mouseout', this.leaveRating)
        })
      }
    },
    leaveRating (item) {
      const ratingStars = this.$refs.ratingStar
      ratingStars.forEach((ratingStar) => {
        ratingStar.classList.remove('active')
      })
    },
    clickRating (item) {
      // 資料- 刪除- fixConditions原始  星星評等
      if (this.beforeStarSring) {
        this.fixConditions.delete(this.beforeStarSring)
      }
      // 畫面-
      this.isRating = true
      this.showRatingRemark = true
      const domRatingStars = this.$refs.ratingStar
      domRatingStars.forEach((domRatingStar, index) => {
        domRatingStar.removeEventListener('mouseout', this.leaveRating)
        domRatingStar.classList.remove('active')
        if (item > index) {
          domRatingStar.classList.add('active')
        }
      })
      this.currentRating = item
      // 資料- 刪除 原始 conditions
      this.conditions.rating = ''
      // 資料- 新增 conditions
      this.conditions.rating = String(this.currentRating)
      // 資料- 新增 fixConditions
      const starSring = `${this.currentRating}顆星評等`
      this.fixConditions.add(starSring)
      this.beforeStarSring = starSring
    },
    backAsset () {
      this.isAssetOption = false
      this.showAssetDetail = false
    },
    // 監聽conditions
    filter () {
      this.finalData = new Set()
      this.finalData.clear()
      // 每次觸發先清空 (本身是set 就不要用[]清空 否則報錯)
      this.funds.forEach((item) => {
        if (this.conditions.fund.includes(item.fund)) {
          this.finalData.add(item)
        }
        if (
          this.conditions.rating > 0 &&
          this.conditions.rating <= item.rating
        ) {
          this.finalData.add(item)
        }
        if (this.conditions.company.includes(item.company)) {
          this.finalData.add(item)
        }
        if (this.conditions.currency.includes(item.currency)) {
          this.finalData.add(item)
        }
        if (this.conditions.asset) {
          // 資料- 所有 細項放入新創陣列 ['貴金屬股票', '拉丁美洲股票']
          const detailAry = []
          const keyAry = Object.keys(this.conditions.asset)
          keyAry.forEach((key) => {
            detailAry.push(...this.conditions.asset[key])
          })
          // 與item內的asset key 內的值比對
          for (const fundkey in item.asset) {
            const fundDetail = item.asset[fundkey][0]
            if (detailAry.includes(fundDetail)) {
              this.finalData.add(item)
            }
          }
        }
      })
    },
    resetAllConditons () {
      // 畫面
      this.showRatingRemark = false
      const domRatingStars = this.$refs.ratingStar
      domRatingStars.forEach((domRatingStar) => {
        domRatingStar.classList.remove('active')
      })
      // 畫面- 退回主類 選項
      this.backAsset()
      // 資料
      this.fixConditions = new Set()
      this.conditions = {
        fund: [],
        company: [],
        asset: {},
        currency: []
      }
    },
    scroll () {
      if (window.scrollY > 400) {
        this.isFixTop = true
      } else {
        this.isFixTop = false
      }
    },
    toResultSection () {
      const domTitleResult = this.$refs.titleResult
      const titleOffsetTop = domTitleResult.offsetTop
      window.scrollTo({
        top: titleOffsetTop,
        behavior: 'smooth'
      })
    },
    // quantityControl () {
    //   if (this.compareGroup.length > 3) {
    //     const message = { title: '比較基金不得超過3隻', icon: 'error' }
    //     this.sweeAlert(message)
    //     this.compareGroup.pop()
    //   }
    // },

    sweetAlert (message) {
      this.$swal(message)
    }
  },
  mounted () {
    goTop()
    window.addEventListener('scroll', this.scroll)
    this.categoriesCompany()
    this.categoriesAsset()
    this.categoriesCurrency()
    this.fixConditions = new Set()
    this.finalData = new Set()
    // 不出始化，finalData就是空值，就不會有空資料畫面
  }
}
</script>
