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
      <!-- <h2><i class="fas fa-search"></i>基金搜尋</h2> -->
      <div class="searchResult-title" :class="{ active: isFixTop }">
        <div>
          <span>{{ finalData.size }}</span
          >個結果
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
        <div class="keyword-wrap">
          <div class="input-field">
            <input
              type="text"
              placeholder="請輸入名稱/代碼"
              v-model="keyword"
              @input="enterData"
              @keyup.enter="addFundCondition"
            />
            <!-- keyup的觸發=> 於input 非button -->
            <ul
              class="match-list"
              v-if="matchList.length > 0 && isMatchList"
              ref="refMatchList"
            >
              <li
                class="match-item"
                @click="chooseFundCondition(item)"
                v-for="item in matchList"
                :key="item"
              >
                <div class="code">{{ item.code }}-</div>
                <div class="name">{{ item.fund }}</div>
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
      <div class="row">
        <div class="title">基金公司</div>
        <div class="content">
          <!-- 顯示全部 -->
          <div class="keyword-wrap" v-if="isCompanyMore">
            <input type="text" placeholder="請輸入基金公司關鍵字" />
          </div>
          <div class="btn-choose-group" v-if="isCompanyMore">
            <div
              class="btn-choose"
              v-for="item in companyCategory"
              :key="item"
              @click="updateCompanyCondition(item)"
              :class="{ active: chooseCompanyItems.includes(item) }"
            >
              <i class="fas fa-star"></i> {{ item }}
            </div>
          </div>
          <!-- 顯示全部 -->
          <!-- 簡約版 -->
          <div class="btn-choose-group" v-if="!isCompanyMore">
            <div
              class="btn-choose"
              v-for="item in pointCompanyCategory"
              :key="item"
              @click="updateCompanyCondition(item)"
              :class="{
                active:
                  chooseCompanyItems.includes(item) && fixConditions.has(item)
              }"
            >
              <i class="fas fa-star"></i> {{ item }}
            </div>
          </div>
          <!-- 簡約版 -->
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
                  active: chooseAssetGroup.includes(item)
                }"
                @click="addAssetCondition(item)"
              >
                {{ item }}
              </div>
            </template>
          </div>
          <div class="detail-check" v-if="showAssetDetail">
            <label>
              <input
                type="checkbox"
                value="全"
                @click="checkAllAsset"
                :checked="checkDetailLen === currentAssetdetailLen &&
                !isDetailStatus"
              />
              <span>全部</span>
            </label>
            <label v-for="item in AssetDetailSet" :key="item">
              <input type="checkbox" :value="item" v-model="checkDetailGroup" />
              <span>{{ item }}</span>
            </label>
            {{ checkDetailGroup }}
            點選:{{ checkDetailLen }},  總長: {{ currentAssetdetailLen }}
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
                  chooseCurrencyItems.includes(item) && fixConditions.has(item)
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
          <p class="rating-remark" v-if="isRatingRemark">
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
          {{ item }} <i class="fas fa-times" @click="deleteCondition(item)"></i>
        </div>
      </div>
      <!-- 搜尋結果主分類 -->
      <div class="search-category">
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
          <li>幣別</li>
          <li>基金類型</li>
          <li></li>
        </ul>
        <ul class="result-tr" v-for="item in finalData" :key="item">
          <li>
            <button
              class="btn-compare"
              id="btn-compare"
              @click="updateCompare(item)"
              :class="{ active: compareGroup.includes(item) }"
            >
              <i class="fas fa-plus"></i>比較
            </button>
            <button
              class="btn-heart"
              id="btn-heart"
              @click="updateFavorite(item)"
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
          <li><a href="javascript:;" class="btn-buy">申購</a></li>
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
              @click="updateCompare(item)"
              :class="{ active: compareGroup.includes(item) }"
            >
              <i class="fas fa-plus"></i>比較
            </button>
            <button
              class="btn-heart"
              id="btn-heart"
              @click="updateFavorite(item)"
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
          <li><a href="javascript:;" class="btn-buy">申購</a></li>
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
              @click="updateCompare(item)"
              :class="{ active: compareGroup.includes(item) }"
            >
              <i class="fas fa-plus"></i>比較
            </button>
            <button
              class="btn-heart"
              id="btn-heart"
              @click="updateFavorite(item)"
              :class="{ active: myFavoriteGroup.includes(item) }"
            >
              <i class="fas fa-heart"></i>觀察
            </button>
          </li>
          <li>{{ item.fund }}</li>
          <li>{{ item.rating }}</li>
          <li>{{ item.risk }}</li>
          <li>{{ item.scaleMillion }}</li>
          <li><a href="javascript:;" class="btn-buy">申購</a></li>
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
              @click="updateCompare(item)"
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
              @click="updateFavorite(item)"
            ></div>
          </li>
        </ul>
        <div class="block-btn">
          <a class="btn" @click="toResultSection, (showUpperBody = '')"
            >新增觀察項目</a
          >
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
          <a class="btn" @click="toResultSection, (showUpperBody = '')"
            >新增觀察項目</a
          >
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
            active: showUpperBody === 'compare' || showUpperBody === ''
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
// 如果不是vue檔，不用componensts 直接放入data就可以使用
// https://www.796t.com/post/MWI1eGs=.html
import fundData from '@/json/fundData.json'
// import fundData from '@/json/fundData.js'
// import getFundData from '@/methods/getFundData'
import localStorage from '@/methods/localStorage.js'
import localStorageCompare from '@/methods/localStorage-compare.js'
// import emitter from '@/methods/eventBus'

export default {
  data () {
    return {
      currentPage: this.$route.name,
      finalData: '',
      funds: fundData,
      keyword: '',
      matchList: [],
      isMatchList: false,
      tempCondition: {},
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
      chooseCompanyItems: [],
      chooseCurrencyItems: [],
      isCompanyMore: false,
      tempCompanyCondition: {},
      rating: '',
      isRatingRemark: false,
      currentRating: '',
      isSearchFund: '',
      chooseAssetGroup: [],
      isAssetAll: true,
      isAssetNew: true,
      isRating: false,
      currentAsset: '',
      AssetDetailSet: '',
      assetOptionItems: [],
      assetDetailCategories: {},
      showAssetDetail: false,
      isAssetOption: false,
      assetTempObj: {},
      isfirstCheckDetail: '',
      showAllDetail: [],
      isChooseAllDetail: true,
      chooseSingleDetailGroup: '',
      secondClickAssetGroup: [],
      beforeStarSring: '',
      isShowratingDesription: false,
      compareGroup: [],
      showCompareBody: true,
      showFavoriteBody: true,
      myFavoriteGroup: [],
      compareStatus: '',
      isFixTop: false,
      currentSearchCatagory: 'basic',
      showUpperBody: '',
      showWindowFooter: false,
      checkDetailGroup: [],
      allChooseAsset: '',
      tempDetail: [],
      checkDetailLen: '',
      currentAssetdetailLen: '',
      isDetailStatus: '',
      cancel: ''
    }
  },
  components: {
    Breadcrumb,
    Navbar
  },
  mixins: [localStorage, localStorageCompare],
  watch: {
    conditions: {
      handler (n, o) {
        this.filter()
      },
      deep: true
    },
    checkDetailGroup: {
      handler () {
        if (this.checkDetailGroup.length === 0) {
          // console.log('按全選')
        } else {
          this.updateDetail()
        }
      },
      deep: true
    },
    finalData: {
      handler () {
        if (this.finalData.size === 0) {
          this.finalData.clear()
        }
      },
      deep: true
    }
  },
  methods: {
    updateDetail () {
      // 畫面-狀態- 點選單選 不是全部，就算選取全部的細項，全選也不能勾起
      this.isDetailStatus = true
      // 更新前先清空
      this.tempDetail.forEach((temp) => {
        this.fixConditions.delete(temp)
      })
      // 資料- 刪除- 主類- fixConditions
      this.fixConditions.delete(this.currentAsset)
      // 資料- 刪除/ 新增- fixConditions
      this.checkDetailGroup.forEach((detail) => {
        this.fixConditions.add(detail)
        // 下次要按細項，全部清空的準備內容 (避免重複因此做判斷)
        if (!this.tempDetail.includes(detail)) {
          this.tempDetail.push(detail)
        }
      })
      // 資料- 刪除- Conditions 目前按的資產主類(EX: 大宗商品)  全細項刪除(刪物件)
      delete this.conditions.asset[this.currentAsset]
      // 資料- 新增- Conditions
      this.conditions.asset[this.currentAsset] = this.checkDetailGroup
      // 畫面- 用資料控制畫面 判定全部是否勾選
      if (this.conditions.asset[this.currentAsset]) {
        this.checkDetailLen = this.conditions.asset[this.currentAsset].length
        this.currentAssetdetailLen = this.AssetDetailSet.size
      }
    },
    enterData () {
      // https://morecoke.coderbridge.io/2021/03/28/js-input-%E4%BA%8B%E4%BB%B6/
      this.matchList = this.funds.filter((fund) => {
        return fund.code.match(this.keyword) || fund.fund.match(this.keyword)
      })
      if (this.matchList.length > 0) {
        this.isMatchList = true
        this.changekeywordColor()
      }
    },
    chooseFundCondition (item) {
      this.keyword = item.code
      this.isMatchList = false
      this.tempCondition = item
      // console.log(this.tempCondition)
    },
    changekeywordColor () {
      // 關鍵字綁定
      // const regExp = new RegExp(this.keyword, 'gi')
      // console.log(regExp)
      // const matchList = document.querySelector('.match-list')
      // console.log(matchList)
      // setTimeout
    },
    addFundCondition () {
      this.isSearchFund = ''
      if (this.keyword === '') {
        const message = { title: '請輸入基金名稱/代號', icon: 'info' }
        this.sweetAlert(message)
        return
      }
      // 如果input裡面的值有符合資料庫的fund值
      this.funds.forEach((item) => {
        if (item.code === this.keyword || item.fund === this.keyword) {
          // 如果條件內已有這基金，就不新增了 (不用透過includes set陣列已經達成)
          // if (this.fixConditions.includes(item.fund)) {
          this.conditions.fund.push(this.tempCondition.fund)
          // console.log(this.conditions)
          this.keyword = ''
          this.prepareFundCondition()
        }
      })
    },
    addAssetCondition (item) {
      // OK 畫面- 細項是否呈現
      this.showAssetDetail = true
      // OK 畫面- 資產主類別是否 選擇 (選擇才會讓其他的2個主類消失)
      this.isAssetOption = true
      // OK 判斷- 把現在按的主要資產類別 灌入狀態內(做細項參考)
      this.currentAsset = item
      // 判斷- 一按主類別，預設選取 所有細項
      this.isChooseAllDetail = true
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
      // OK 畫面- 因為資產類別可複選，使用一個群組包覆，把按過的資產主項目放在群組
      // (按過就變色，再按無效)
      if (!this.chooseAssetGroup.includes(item)) {
        this.chooseAssetGroup.push(item)
        // OK 資料- 把主類塞入fix
        this.fixConditions.add(item)
      }
      // OK 資料- 把主類塞入最終條件式conditions{ asset: {新興市場: [1,2,2,] }
      // assetDetailCategories 為預先整理好的格式 {新興市場: [1,2,2,]; 成熟市場: [1,2,3]}
      const keyAry = Object.keys(this.assetDetailCategories)
      keyAry.forEach((key) => {
        if (key === item) {
          // 只有首次新增 主要資產屬性 需要推細項進去
          if (this.assetTempObj[key] === undefined) {
            this.assetTempObj[key] = this.assetDetailCategories[key]
          }
        }
      })
      this.conditions.asset = this.assetTempObj
    },
    checkAllAsset () {
      // 畫面- 區隔按全選還是 單選
      this.isDetailStatus = false
      // 畫面- 清空所有細項 (觸發深層監聽)
      this.checkDetailGroup = []
      // 判斷情境- 預設是"全選" 再按一次，變成"不選"
      this.isChooseAllDetail = !this.isChooseAllDetail
      console.log('click')
      // 先備好個別資產細項this.AssetDetailSet
      const currentDetail = this.assetDetailCategories[this.currentAsset]
      if (this.conditions.asset[this.currentAsset]) {
        this.checkDetailLen = this.conditions.asset[this.currentAsset].length
        this.currentAssetdetailLen = this.AssetDetailSet.size
        if (this.checkDetailLen === this.currentAssetdetailLen) {
          console.log('表本全選要改 單')
        } else {
          console.log('表單要改 全選')
        }
      }
      // ▲ 狀況1: 全選 (本都單選改全選 or 全部取消選取狀況下選取)
      if (this.checkDetailLen !== this.currentAssetdetailLen || this.cancel) {
        // 畫面- 主類變色
        this.chooseAssetGroup.push(this.currentAsset)
        // (1) OK刪除- 最終條件- 目前按的資產主類(EX: 大宗商品) 全細項
        this.conditions.asset[this.currentAsset] = []
        // (2) OK新增- 最終條件-
        this.conditions.asset[this.currentAsset] = currentDetail
        // (3) OK刪除- fixConditions- 全部單一細項
        this.fixConditions.forEach((fix) => {
          currentDetail.forEach((detail) => {
            if (fix === detail) {
              this.fixConditions.delete(fix)
            }
          })
        })
        // (4) OK新增- fixConditions- 主要類別
        this.fixConditions.add(this.currentAsset)
        this.cancel = false
      } else {
        // ▲ 狀況2: 不選全部(取消全選)
        // OK畫面- 把原選擇的主類 顏色拿掉
        this.chooseAssetGroup.forEach((asset) => {
          if (this.currentAsset === asset) {
            const index = this.chooseAssetGroup.indexOf(asset)
            this.chooseAssetGroup.splice(index, 1)
          }
        })
        // (1) OK資料- 刪除- 最終條件- 目前按的資產主類(EX: 大宗商品)  全細項刪除(刪物件)
        delete this.conditions.asset[this.currentAsset]
        // (2) OK資料- 刪除- fixConditions- 刪除主項
        this.fixConditions.forEach((fix) => {
          if (fix === this.currentAsset) {
            this.fixConditions.delete(fix)
          }
        })
        // 取消全選 = checkDetailLen沒資料
        this.cancel = true
      }
      // 用資料控制畫面 判定全部是否勾選
      if (this.conditions.asset[this.currentAsset]) {
        this.checkDetailLen = this.conditions.asset[this.currentAsset].length
        this.currentAssetdetailLen = this.AssetDetailSet.size
      }
      // 畫面- 區隔按全選還是 單選
      this.isDetailStatus = true
    },
    // XXcheckSingleAssetDetail (item) {
    //   // console.log(this.chooseSingleDetailGroup)
    //   // (0) 在畫面上刪除"他是有按全選" 的按鈕樣式
    //   // console.log(this.showAllDetail)
    //   // const index = this.showAllDetail.indexOf(this.currentAsset)
    //   // this.showAllDetail.splice(index, 1)
    //   // this.isChooseAllDetail = false
    //   // ▲ 狀況一：勾
    //   if (!this.chooseSingleDetailGroup.has(item)) {
    //     // (0) 按過單選後，之後再進來主類非首次
    //     // this.secondClickAssetGroup.push(this.currentAsset)
    //     // console.log('按過單選', this.secondClickAssetGroup)
    //     // (0) 畫面- 新增
    //     this.chooseSingleDetailGroup.add(item)
    //     // (1) 資料- 刪除- fixCondtions主類 (this.currentAsset和fix裡的item被系統判定本質不同)
    //     this.fixConditions.delete(`${this.currentAsset}`)
    //     // (2) 資料- 新增- fixCondtions
    //     this.fixConditions.add(item)
    //     // (3) 資料- 刪除- 最終條件式 全選 (加條件，只有首次 由"全選" 改 "單選"  才要清空conditions)
    //     // (4) 新增- 最終條件式
    //     // ▲ 狀況 1.1：勾 - 由全選 => 單選  目標:conditions清空， 改「非全選」狀態
    //     if (this.isAllStatus) {
    //       const detailLen = this.assetDetailCategories[this.currentAsset].length
    //       const currentLen = this.conditions.asset[this.currentAsset].length
    //       // 等於代表現在是"全選" = 代表首次由全選 轉為 單選
    //       if (detailLen === currentLen) {
    //         this.conditions.asset[this.currentAsset] = []
    //         this.conditions.asset[this.currentAsset].push(item)
    //         this.isAllStatus = false
    //       } else {
    //         // ▲ 狀況 1.2：勾 - 已單選 => 選第2.3個單選  不用清空conditions
    //         this.conditions.asset[this.currentAsset].push(item)
    //       }
    //     } else {
    //       // ▲ 狀況二：不勾
    //       // (0) 畫面- 刪除
    //       this.chooseSingleDetailGroup.delete(item)
    //       // (1) 刪除- fixCondtions
    //       this.fixConditions.delete(item)
    //       // (2) 刪除- 最終條件式
    //       const conditionIndex = this.conditions.asset[this.currentAsset].indexOf(item)
    //       this.conditions.asset[this.currentAsset].splice(conditionIndex, 1)
    //     }
    //   }
    // },
    deleteCondition (item) {
      // 共用 刪除 fixConditions
      this.fixConditions.delete(item)
      // https://ithelp.ithome.com.tw/articles/10191607
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
        // ['大宗商品', '新興市場股票', '高收益債']
        // OK 情況一: 條件式裡有現在按刪除 的"主類"，刪除
        if (keyAry.includes(item)) {
          keyAry.forEach((key) => {
            if (key === item) {
              // 刪除條件的屬性
              delete obj[key]
              this.conditions.asset = obj
            }
          })
        }
        // 情況二： 條件式裡有現在按刪除 的"細項"，刪除
        // console.log(this.conditions)
        // conditions 的keyAry => [新興市場, 成熟市場]
        // 如果我按的 item(天然資源股票) 從條件式裡 刪除
        keyAry.forEach((key) => {
          const valueAry = this.conditions.asset[key]
          if (valueAry.includes(item)) {
            const index = valueAry.indexOf(item)
            valueAry.splice(index, 1)
            // console.log(valueAry) 剩下[貴金屬股票] 灌回去條件式
            this.conditions.asset[key] = valueAry
            // console.log(this.conditions)
          }
        })
      }
      if (this.conditions.rating) {
        const starString = `${this.conditions.rating}顆星評等`
        if (item === starString) {
          // 刪除 最終條件
          this.conditions.rating = ''
          // 刪除 畫面 (不能直接於畫面做 單顆星星 動態active  因為他在fixCondition內)
          this.isRatingRemark = false
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
      // http://www.victsao.com/blog/81-javascript/166-javascript-arr-slice
      // 取前5個(陣列片段)
      // 參考: 解決重複
      // if (!this.conditions.asset[this.currentAsset].includes(item)) {
      //     this.conditions.asset[this.currentAsset].push(item)
      //   }
    },
    categoriesAsset () {
      // 改用別種方式取代set
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
      // this.funds.forEach((bb) => {
      //   console.log(bb.asset)
      // })
      // (1) 創資料整理用  物件 assetDetailCategories
      // 希望格式: {新興市場: [1,2,2,]; 成熟市場: [1,2,3]}
      const obj = {}
      this.funds.forEach((item) => {
        // console.log(item.asset)
        // console.log(Object.keys(item.asset))
        const keyArry = Object.keys(item.asset)
        keyArry.forEach((key) => {
          // console.log(item.asset[key]) 可看到屬性值
          // 狀況一: 在物件裡第一次新增 屬性
          if (obj[key] === undefined) {
            obj[key] = JSON.parse(JSON.stringify(item.asset[key]))
          } else {
            // 狀況二: 在物件裡有此屬性了
            // 細分 (把重複屬性值拿掉)
            // forEach 裡item (陣列)有傳參考(傳陣列)特性，需要深拷
            // console.log(obj[key].includes(item.asset[key][0]))
            if (!obj[key].includes(item.asset[key][0])) {
              const newAry = JSON.parse(JSON.stringify(item.asset[key]))
              obj[key].push(...newAry)
            }
          }
          this.assetDetailCategories = obj
          // console.log(this.assetDetailCategories)
        })
      })
      // 確認傳參考消失
      // this.funds.forEach((bb) => {
      //   console.log(bb.asset)
      // })
    },
    categoriesCurrency () {
      this.funds.forEach((item) => {
        if (!this.currencyCategory.includes(item.currency)) {
          this.currencyCategory.push(item.currency)
        }
      })
    },
    updateCompanyCondition (item) {
      // 原本就有在條件中 (-- 刪除)
      // set不能用included可改用has / 但不能delete，雖然item看起來一樣，但這些item產出來源是來自不同陣列
      // if (this.fixConditions.has(item)) {
      // this.fixConditions.delete(item)
      if (this.chooseCompanyItems.includes(item)) {
        // (1) 先讓畫面active 轉換
        const companyIndex = this.chooseCompanyItems.indexOf(item)
        this.chooseCompanyItems.splice(companyIndex, 1)
        // (2) 再讓fix陣列刪除
        // Array.from(this.fixConditions)
        // https://www.html.cn/qa/javascript/10339.html  set轉arry
        const arry = [...this.fixConditions]
        const fixConditionIndex = arry.indexOf(item)
        arry.splice(fixConditionIndex, 1)
        this.fixConditions = new Set(arry)
        // 沒有在條件中 (++ 新增)
      } else {
        // 目前觸發的item = 點選的基金公司名稱
        // (1) 創一個陣列 放基金公司名稱
        this.chooseCompanyItems.push(item)
        // console.log(this.chooseCompanyItems)
      }
      // (2) 將陣列塞入conditions的company屬性值 (!!一整包最新的基金公司推到此屬性)
      this.conditions.company = this.chooseCompanyItems
      // console.log(this.conditions.company)
      // console.log(this.conditions)
      // (3) 將公司名稱一個一個塞入fixConditions
      this.prepareCompanyCondition()
    },
    updateCurrencyCondition (item) {
      // 狀況一: 尚未按過
      if (!this.chooseCurrencyItems.includes(item)) {
        // 畫面- active
        this.chooseCurrencyItems.push(item)
        // 新增- fixConditions
        this.fixConditions.add(item)
        // 新增- conditions
        this.conditions.currency.push(item)
      } else {
        // 狀況二: 先前按過
        // 畫面- active取消
        const index = this.chooseCurrencyItems.indexOf(item)
        this.chooseCurrencyItems.splice(index, 1)
        // 刪除- fixConditions
        this.fixConditions.delete(item)
        // 刪除- conditions
        const conditionIndex = this.conditions.currency.indexOf(item)
        this.conditions.currency.splice(conditionIndex, 1)
      }
    },
    prepareFundCondition () {
      // 有找到才會給找到狀態
      this.isSearchFund = true
      this.conditions.fund.forEach((item) => {
        this.fixConditions.add(item)
      })
    },
    prepareCompanyCondition () {
      // console.log(this.conditions.company)
      this.conditions.company.forEach((item) => {
        this.fixConditions.add(item)
      })
      // console.log(this.fixConditions)
    },
    hoverRating (item) {
      if (!this.isRating) {
        const ratingStars = document.querySelectorAll('.rating-star')
        ratingStars.forEach((ratingStar) => {
          // console.dir(ratingStar.__vnode.key)
          // console.log(ratingStar.getAttribute('key'))
          // 如果目前hover的星星位置大於等於其他星星，給這些其他星星變色
          if (item >= ratingStar.__vnode.key) {
            ratingStars[ratingStar.__vnode.key - 1].classList.add('active')
          }
          // 在這才加入滑鼠移開的事件監聽，以避免寫在行內(click事件時需移除)無法移除
          // ("個別" 於 "dom" 加監聽)
          ratingStar.addEventListener('mouseout', this.leaveRating)
        })
      }
    },
    leaveRating (item) {
      const ratingStars = document.querySelectorAll('.rating-star')
      ratingStars.forEach((ratingStar) => {
        ratingStar.classList.remove('active')
      })
    },
    clickRating (item) {
      // console.log(item)
      // (3) 刪除 原始 fixConditions 星星評等
      // console.log(this.beforeStarSring)
      if (this.beforeStarSring) {
        this.fixConditions.delete(this.beforeStarSring)
      }
      // this.fixConditions.delete(starSring)
      // (1) 使用refs取代document.querySelectorAll
      // (2) 因為這的程式較不單純，因此沒用data 去改變狀態，而是在此使用classList.remove(add)去改變
      // (3) 以此範例我就無法寫v-for於畫面去跑forEach了
      // 如果按下click 就給全域一個狀態，不要讓他觸發hover
      this.isRating = true
      const domRatingStars = this.$refs.ratingStar
      domRatingStars.forEach((domRatingStar, index) => {
        domRatingStar.removeEventListener('mouseout', this.leaveRating)
        // 再按一次星星時，會把所有加active的星星拿掉active
        domRatingStar.classList.remove('active')
        if (item > index) {
          // console.log(domRatingStar)
          domRatingStar.classList.add('active')
        }
        // if (item >= domRatingStar.__vnode.key) {
        //   domRatingStars[domRatingStar.__vnode.key - 1].classList.add('active')
        // }
      })
      this.isRatingRemark = true
      // 因為此顯示範圍不在v-for內，需另外將變數值放於data，再取用
      this.currentRating = item
      // (1) 刪除 最終條件
      this.conditions.rating = ''
      // (2) 新增 最終條件
      const starSring = `${this.currentRating}顆星評等`
      this.conditions.rating = String(this.currentRating)
      // console.log(typeof (this.conditions.rating))
      // (4) 新增 fixConditions
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
      // console.log(this.finalData) 重設=>沒清空。。
      // 每次觸發先清空 (本身是set 就不要用[]清空 否則報錯)
      this.funds.forEach((item) => {
        if (this.conditions.fund.includes(item.fund)) {
          this.finalData.add(item)
        }
        // 情況 (1)>0 (空值) (2)小於基金群的都要顯示
        // console.log(this.conditions.rating > 0)
        // console.log(this.conditions.rating <= item.rating)
        if (
          this.conditions.rating > 0 &&
          this.conditions.rating <= item.rating
        ) {
          this.finalData.add(item)
          // console.log(this.finalData)
        }
        // console.log(this.conditions.company) 剛開始是undefined 非陣列
        // 除非於初始化給空陣列 或 if(this.conditions.company )
        if (this.conditions.company.includes(item.company)) {
          this.finalData.add(item)
        }
        if (this.conditions.currency.includes(item.currency)) {
          this.finalData.add(item)
        }
        if (this.conditions.asset) {
          // (1) 整資料- 把所有條件式 資產明細 放入新創陣列 ['貴金屬股票', '拉丁美洲股票']
          const detailAry = []
          const keyAry = Object.keys(this.conditions.asset)
          keyAry.forEach((key) => {
            detailAry.push(...this.conditions.asset[key])
          })
          // (2) 與item內的asset key 內的值比對
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
      this.fixConditions = new Set()
      this.isRatingRemark = false
      const domRatingStars = this.$refs.ratingStar
      domRatingStars.forEach((domRatingStar) => {
        domRatingStar.classList.remove('active')
      })
      // 畫面- 退回主類 選項
      this.backAsset()
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
      // 跑飛入動畫用
      // const windowHigh = window.innerHeight
      // const toTopHight = domTitleResult.getBoundingClientRect().y
      // console.log('物件距離視窗頂:', toTopHight, '視窗固定:', windowHigh)
      // 如果物件距離視窗頂 < 視窗固定 代表我看到目標物了
      // if (toTopHight < windowHigh / 1.25) {
      //   console.log('看到目標物了')
      // }
    },
    toResultSection () {
      const domTitleResult = this.$refs.titleResult
      const titleOffsetTop = domTitleResult.offsetTop
      window.scrollTo({
        top: titleOffsetTop,
        behavior: 'smooth'
      })
    },
    quantityControl () {
      if (this.compareGroup.length > 3) {
        const message = { title: '比較基金不得超過3隻', icon: 'error' }
        this.sweeAlert(message)
        this.compareGroup.pop()
        console.log(this.compareGroup)
      }
    },
    deleteCompare (item) {
      const index = this.compareGroup.indexOf(item)
      this.compareGroup.splice(index, 1)
    },
    deletemyFavorite (item) {
      const index = this.myFavoriteGroup.indexOf(item)
      this.myFavoriteGroup.splice(index, 1)
    },
    toComparePage () {
      // emitter.emit('getSearchData', this.compareGroup)
      this.$router.push('/compare')
    },
    toFavoritePage () {
      this.$router.push('/favorite')
    },
    toLogin () {
      this.$router.push('/login')
    },
    sweetAlert (message) {
      this.$swal(message)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
    this.categoriesCompany()
    this.categoriesAsset()
    this.categoriesCurrency()
    this.filter()
    // (1) const setTemp = new Set() 如果初始化data資料宣告空值，這就直接賦予即可
    // (2) 因為沒有像finalData可放 watch，直接於mounted設定
    this.fixConditions = new Set()
    this.chooseSingleDetailGroup = new Set()
  }
}
// slice好文
// https://medium.com/@bebebobohaha/slice-splice-split-%E5%82%BB%E5%82%BB%E5%88%86%E4%B8%8D%E6%B8%85-46d9c8992729
// https://blog.csdn.net/weixin_40013817/article/details/103069487 一個觸發，兩件事情；多個觸發
</script>
