<template>
  <Breadcrumb></Breadcrumb>
  <section class="section section-searchFund" id="section-searchFund"
  >
  <!-- @click.stop="removeDescription -->
    <div class="container">
      <div class="block-main-title">
          <i class="fas fa-search"></i>
          <h2 class="main-title">基金搜尋</h2>
      </div>
      <!-- <h2><i class="fas fa-search"></i>基金搜尋</h2> -->
      <div class="searchResult-title" :class="{active: isFixTop}">
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
            <ul class="match-list" v-if="matchList.length > 0 && isMatchList"
              ref="refMatchList">
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
              :class="{ active: chooseCompanyItems.includes(item) && fixConditions.has(item) }"
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
          <div class="btn-asset-choose" v-if="isAssetDetail"
          @click="backAsset">
            <i class="fas fa-angle-left"></i>
            繼續選擇
          </div>
          <div class="btn-choose-group">
            <!-- 主類按鈕=> 只要有勾"全" 或 "細項" 有勾選任一，就active -->
            <template v-for="item in assetCategory" :key="item">
              <div class="btn-choose"
                  v-if="currentAsset === item || !isAssetOption"
                  :class="{ disabled: isAssetDetail,
                  active: (showAllDetail.includes(item) || chooseSingleDetailGroup.size > 0)
                   && fixConditions.has(item) }"
                  @click="addAssetCondition(item)"
                  > {{ item }}
              </div>
            </template>
          </div>
          <div class="category" v-if="isAssetDetail">
            <!-- https://tools.wingzero.tw/article/sn/196 -->
            <!-- 這樣就不需要ID了 -->
            <template v-for="item in assetCategory" :key="item">
              <button type="button" class="btnsmall" @click="checkAllAssetDetail"
              :class="{ 'active': showAllDetail.includes(item)
              && fixConditions.has(item)}"
              v-if="currentAsset === item"
              >全選
              </button>
            </template>
            <button type="button"  class="btnDetail"
            v-for="item in AssetDetailSet" :key="item"
            @click="checkSingleAssetDetail(item)"
            :class="{active: chooseSingleDetailGroup.has(item)
            && fixConditions.has(item) }">{{ item }}</button>
            <!-- <label>
              <input type="checkbox" value=""
              @click="checkAllAssetDetail"
              :checked="showAllDetail.isShow"
              >
              <span> 全部 </span>
            </label> -->
            <!-- <label v-for="item in AssetDetailSet" :key="item">
              <input type="checkbox" value="${item}"
              @click="checkSingleAssetDetail(item)"
              :checked="fixConditions.has(item)"
              >
              <span> {{ item }} </span>
            </label> -->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="title">計價幣別</div>
        <div class="content">
          <div class="btn-choose-group">
            <div class="btn-choose"
            v-for="item in currencyCategory" :key="item"
            @click="updateCurrencyCondition(item)"
            :class="{active:chooseCurrencyItems.includes(item) && fixConditions.has(item)}">
            {{ item }}
            </div>
          </div>
        </div>
        <!-- <div class="btn-more">
          更多幣別
          <i class="fas fa-angle-down"></i>
        </div> -->
      </div>

      <div class="row">
        <div class="title"
        @click="isShowratingDesription = !isShowratingDesription">
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
          {{ item }} <i class="fas fa-times"  @click="deleteCondition(item)"></i>
        </div>
      </div>
      <!-- 搜尋結果主分類 -->
      <div class="search-category">
        <ul class="row">
          <li :class="{active: currentSearchCatagory === 'basic'}"
            @click="currentSearchCatagory = 'basic'"  >
            基本資料
          </li>
          <li :class="{active: currentSearchCatagory === 'performance'}"
            @click="currentSearchCatagory = 'performance'"  >
            報酬率
          </li>
          <li :class="{active: currentSearchCatagory === 'risk'}"
            @click="currentSearchCatagory = 'risk'"  >
            風險
          </li>
        </ul>
      </div>
      <!-- 一類: 基本資料 -->
      <div class="content basic-content"
      v-if="currentSearchCatagory === 'basic'">
        <ul class="result-tr"
          v-if="finalData.size > 0">
          <li></li>
          <li>基金名稱</li>
          <li>幣別</li>
          <li>基金類型</li>
          <li></li>
        </ul>
        <ul class="result-tr"
            v-for="item in finalData" :key="item">
          <li>
            <button class="btn-compare" id="btn-compare"
            @click="toCompareList(item)"
            :class="{active: compareGroup.includes(item)}">
              <i class="fas fa-plus"></i>比較
            </button>
            <button class="btn-heart" id="btn-heart"
              @click="updateFavorite(item)"
              :class="{active: myFavoriteGroup.includes(item)}">
              <i class="fas fa-heart"></i>觀察
            </button>
          </li>
          <li>{{ item.fund }}</li>
          <li> {{ $filters.toDate(item.established) }} </li>
          <template v-for="(detail, key) in item.asset" :key="detail">
            <li>{{ key }} - {{ detail[0] }} </li>
          </template>
          <li><a href="javascript:;" class="btn-buy">申購</a></li>
        </ul>
      </div>

      <!-- 二類: 報酬率 -->
      <div class="content performance-content"
      v-if="currentSearchCatagory === 'performance'">
        <ul class="result-tr"
          v-if="finalData.size > 0">
          <li></li>
          <li>基金名稱</li>
          <li>三個月</li>
          <li>一年</li>
          <li>三年</li>
          <li>成立至今</li>
          <li></li>
        </ul>

        <ul class="result-tr"
            v-for="item in finalData" :key="item">
          <li>
            <button class="btn-compare" id="btn-compare"
            @click="toCompareList(item)"
            :class="{active: compareGroup.includes(item)}">
              <i class="fas fa-plus"></i>比較
            </button>
            <button class="btn-heart" id="btn-heart"
              @click="updateFavorite(item)"
              :class="{active: myFavoriteGroup.includes(item)}">
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
      <div class="content risk-content"
        v-if="currentSearchCatagory === 'risk'">
        <ul class="result-tr"
          v-if="finalData.size > 0">
          <li></li>
          <li>基金名稱</li>
          <li>晨星評等</li>
          <li>風險屬性</li>
          <li>資本額(百萬)</li>
          <li></li>
        </ul>
        <ul class="result-tr" v-for="item in finalData" :key="item">
          <li>
            <button class="btn-compare" id="btn-compare"
            @click="toCompareList(item)"
            :class="{active: compareGroup.includes(item)}">
              <i class="fas fa-plus"></i>比較
            </button>
            <button class="btn-heart" id="btn-heart"
              @click="updateFavorite(item)"
              :class="{active: myFavoriteGroup.includes(item)}">
              <i class="fas fa-heart"></i>觀察
            </button>
          </li>
          <li> {{item.fund}} </li>
          <li>{{item.rating}}</li>
          <li>{{item.risk}}</li>
          <li>{{item.scaleMillion}}</li>
          <li><a href="javascript:;" class="btn-buy">申購</a></li>
        </ul>
      </div>
    </div>
  </section>

  <div class="compare-fixed">
    <div class="container">
      <!-- <section class="section-compare" id="section-compare"> -->
      <!-- <div class="container"> -->
      <div class="compare-window"
          :class="{show: compareGroup.length > 0}">
          <!-- v-if="showCompareBody"不用此控 他是flex 非block-->
          <!-- 兩種狀態: 比較 & 觀察 -->
        <div class="window-head" v-if="compareStatus"
            :class="{active: showCompareBody, show: compareGroup.length > 0}"
            @click="showCompareBody = false">
          <div class="title" id="btn-zoomout"
          >比較清單
          <span>( {{compareGroup.length}} )</span></div>
          <div class="fas fa-angle-down"></div>
        </div>
        <div class="window-head" v-else
            :class="{active: showFavoriteBody, show: myFavoriteGroup.length > 0}"
            @click="showFavoriteBody = false">
          <div class="title" id="btn-zoomout"
          >觀察清單
          <span>( {{myFavoriteGroup.length}} )</span></div>
          <div class="fas fa-angle-down"></div>
        </div>
        <div class="window-body" v-if="compareStatus"
        :class="{active: compareGroup.length>0 && showCompareBody}">
          <ul class="compare-list">
            <li class="compare-item"
            v-for="item in compareGroup" :key="item" >
              <div class="fund">
                {{ item.fund }}<span>{{ item.code }}</span>
              </div>
              <div class="btn-close" @click="deleteCompare(item)"></div>
            </li>
          </ul>
          <button class="btn btn-starCompare"
          @click="toComparePage">開始比較</button>
        </div>
        <div class="window-body" v-else
        :class="{active: myFavoriteGroup.length>0 && showFavoriteBody}">
          <ul class="compare-list">
            <li class="compare-item"
            v-for="item in myFavoriteGroup" :key="item" >
              <div class="fund">
                {{ item.fund }}<span>{{ item.code }}</span>
              </div>
              <div class="btn-close"
              @click="deletemyFavorite(item)"></div>
            </li>
          </ul>
        </div>
        <div class="compare-window-footer"
        :class="{show: compareGroup.length > 0 ||
                myFavoriteGroup.length > 0}">
          <div class="btn-list">
            <div
              :class="{active: compareStatus, disabled: compareGroup.length < 1}"
              id="btn-compareList"
              @click="showCompareBody = true, compareStatus = true">
              比較清單
                <span>{{ compareGroup.length }}</span>
            </div>
            <div id="btn-favoriteList"
              @click="showFavoriteBody = true, compareStatus = false"
              :class="{active: !compareStatus, disabled: myFavoriteGroup.length < 1 }">
              觀察清單
              <span> {{myFavoriteGroup.length}} </span></div>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- </section> -->
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
// 如果不是vue檔，不用componensts 直接放入data就可以使用
// https://www.796t.com/post/MWI1eGs=.html
import fundData from '@/json/fundData.json'
// import fundData from '@/json/fundData.js'
// import getFundData from '@/methods/getFundData'
import localStorage from '@/methods/localStorage.js'
import emitter from '@/methods/eventBus'

export default {
  data () {
    return {
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
      chooseAssetItems: [],
      isAssetAll: true,
      isAssetNew: true,
      isRating: false,
      currentAsset: '',
      AssetDetailSet: '',
      assetOptionItems: [],
      assetDetailCategories: {},
      isAssetDetail: false,
      isAssetOption: false,
      assetTempObj: {},
      isfirstCheckDetail: '',
      showAllDetail: [],
      isChooseAllDetail: true,
      chooseSingleDetailGroup: '',
      isChooseSingleDetail: false,
      isAllStatus: true,
      secondClickAssetGroup: [],
      FirstAssetGroup: [],
      beforeStarSring: '',
      isShowratingDesription: false,
      compareGroup: [],
      showCompareBody: true,
      showFavoriteBody: true,
      myFavoriteGroup: [],
      compareStatus: '',
      isFixTop: false,
      currentSearchCatagory: 'basic'
    }
  },
  components: {
    Breadcrumb
  },
  mixins: [localStorage],
  watch: {
    conditions: {
      handler (n, o) {
        this.filter()
      },
      deep: true
    },
    compareGroup: {
      handler () {
        this.quantityControl()
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
        alert('請輸入基金名稱/代號')
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
    initialAllDetail () {
      const keyAry = Object.keys(this.assetDetailCategories)
      // console.log(keyAry)
      keyAry.forEach((key) => {
        this.FirstAssetGroup.push(key)
      })
      // console.log(this.FirstAssetGroup)
    },
    addAssetCondition (item) {
      if (this.FirstAssetGroup.includes(item)) {
        // console.log('家真正群組')
        this.showAllDetail.push(item)
        const index = this.FirstAssetGroup.indexOf(item)
        this.FirstAssetGroup.splice(index, 1)
        // console.log(this.FirstAssetGroup)
      }
      // OK 畫面- 細項是否呈現
      this.isAssetDetail = true
      // OK 判斷- 把現在按的主要資產類別 灌入狀態內(做細項參考)
      this.currentAsset = item
      // OK 畫面- 資產主類別是否 選擇 (選擇才會讓其他的2個主類消失)
      this.isAssetOption = true
      // 畫面- '現在點選的主類'  中的"有全選按鈕" 丟入showAllDetail名單中
      // if (!this.showAllDetail.includes(item)) {
      //   this.showAllDetail.push(this.currentAsset)
      // }
      // 按過單選後，非第一次 => 沒有全選active
      // if (this.secondClickAssetGroup.includes(item)) {
      //   const index = this.showAllDetail.indexOf(item)
      //   this.showAllDetail.splice(index, 1)
      //   // console.log(this.showAllDetail)
      // }
      // 判斷- 是否選擇所有 細項(預設)
      this.isChooseAllDetail = true
      // OK 畫面- 從8隻基金裡面「現在點選的主類別」細項 放在AssetDetailSet中，再顯示在畫面
      this.AssetDetailSet = new Set()
      this.funds.forEach((fund) => {
        const details = fund.asset[item]
        if (typeof (details) !== 'undefined') {
          details.forEach((detail) => {
            this.AssetDetailSet.add(detail)
          })
        }
      })
      // OK 畫面- 因為資產類別可複選，使用一個群組包覆，把按過的資產主項目放在群組
      if (!this.chooseAssetItems.includes(item)) {
        this.chooseAssetItems.push(item)
        // OK 把主項塞入fix
        this.fixConditions.add(item)
      }
      // OK 資料- 把主項塞入最終條件式
      // assetDetailCategories 為預先做好的格式
      // 格式: {新興市場: [1,2,2,]; 成熟市場: [1,2,3]}
      const keyAry = Object.keys(this.assetDetailCategories)
      keyAry.forEach((key) => {
        if (key === item) {
          // console.log(this.assetDetailCategories[key])
          // 只有首次新增 主要資產屬性 需要推細項進去
          if (this.assetTempObj[key] === undefined) {
            this.assetTempObj[key] = this.assetDetailCategories[key]
            // console.log(this.assetTempObj)
          }
        }
      })
      this.conditions.asset = this.assetTempObj
      // console.log(this.conditions)
    },
    checkAllAssetDetail () {
      // 由單項=> 改全選時，要再把條件清空
      if (!this.isAllStatus) {
        this.conditions.asset[this.currentAsset] = []
        this.isAllStatus = true
      }
      // (預設是"全選")所以再按一次觸發此事件，變成"不選"，從已按全部鈕名單 刪除
      this.isChooseAllDetail = !this.isChooseAllDetail
      // 先備好個別資產細項
      const currentDetail = this.assetDetailCategories[this.currentAsset]
      // 狀況一: 全選=> 不選
      if (!this.isChooseAllDetail) {
        // console.log('全選=> 不選')
        const index = this.showAllDetail.indexOf(this.currentAsset)
        this.showAllDetail.splice(index, 1)
        // 如果不全選，外面的主分類也會取消active
        this.chooseAssetItems.forEach((asset) => {
          if (this.currentAsset === asset) {
            const index = this.chooseAssetItems.indexOf(asset)
            this.chooseAssetItems.splice(index, 1)
          }
        })
        // (1) OK刪除- 最終條件- 目前按的資產主類(EX: 大宗商品)  全細項
        delete (this.conditions.asset[this.currentAsset])
        // (2) OK刪除- fixConditions- 主項
        this.fixConditions.forEach((fix) => {
          if (fix === this.currentAsset) {
            this.fixConditions.delete(fix)
          }
        })
      } else {
        // 狀況二: 不選=> 全選
        // (0) 畫面- 顯示"他是有按全選" 的按鈕樣式
        this.showAllDetail.push(this.currentAsset)
        // (0) 畫面- 單項清空 (不能清空其他主類 的細項)
        // console.log(this.chooseSingleDetailGroup)
        this.chooseSingleDetailGroup.forEach((item) => {
          const currentDetail = this.assetDetailCategories[this.currentAsset]
          // console.log(this.assetDetailCategories[this.currentAsset])
          // console.log(item)
          currentDetail.forEach((detail) => {
            if (detail === item) {
              // console.log(item)
              // const index = this.chooseSingleDetailGroup.indexOf(item)
              // this.chooseSingleDetailGroup.splice(index, 1)
              this.chooseSingleDetailGroup.delete(item)
              // console.log(this.chooseSingleDetailGroup)
            }
          })
        })
        // this.chooseSingleDetailGroup = []
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
      }
      // console.log(this.conditions)
      // const currentDetail = this.assetDetailCategories[this.currentAsset]
      // // 狀況一： 如果勾選全部細項
      // if (this.showAllDetail.isShow) {
      //   // (1) OK刪除- 最終條件- 目前按的資產主類(EX: 大宗商品) 全細項
      //   this.conditions.asset[this.currentAsset] = []
      //   // (2) OK新增- 最終條件-
      //   this.conditions.asset[this.currentAsset] = currentDetail
      //   // (3) OK刪除- fixConditions- 全部單一細項
      //   this.fixConditions.forEach((fix) => {
      //     currentDetail.forEach((detail) => {
      //       if (fix === detail) {
      //         this.fixConditions.delete(fix)
      //       }
      //     })
      //   })
      //   // (4) OK新增- fixConditions- 主要類別
      //   this.fixConditions.add(this.currentAsset)
      // 狀況二： 不勾全選
      // if (!this.showAllDetail.isShow) {
      //   // (1) OK刪除- 最終條件- 目前按的資產主類(EX: 大宗商品)  全細項  所有單一條件
      //   delete (this.conditions.asset[this.currentAsset])
      //   // (2) OK刪除- fixConditions- 主項
      //   this.fixConditions.forEach((fix) => {
      //     if (fix === this.currentAsset) {
      //       this.fixConditions.delete(fix)
      //     }
      //   })
      // }
      // console.log(this.conditions)
    },
    checkSingleAssetDetail (item) {
      // console.log(this.chooseSingleDetailGroup)
      // (0) 在畫面上刪除"他是有按全選" 的按鈕樣式
      // console.log(this.showAllDetail)
      const index = this.showAllDetail.indexOf(this.currentAsset)
      this.showAllDetail.splice(index, 1)
      this.isChooseAllDetail = false
      this.isChooseSingleDetail = !this.isChooseSingleDetail
      // 狀況一： 首次勾選單項  不勾 => 勾
      if (!this.chooseSingleDetailGroup.has(item)) {
        // (0) 按過單選後，之後再進來主類非首次
        this.secondClickAssetGroup.push(this.currentAsset)
        // console.log('按過單選', this.secondClickAssetGroup)
        // (0) 畫面- 新增
        this.chooseSingleDetailGroup.add(item)
        // (1) 刪除- fixCondtions全選 的主類 (this.currentAsset和fix裡的item被系統判定本質不同)
        this.fixConditions.delete(`${this.currentAsset}`)
        // (2) 新增- fixCondtions
        this.fixConditions.add(item)
        // (3) 刪除- 最終條件式 全選 (加條件，只有由"全選"改 "單選"  才要清空)
        if (this.isAllStatus) {
          // 不勾選=> 勾選
          // 狀況1.1 且目前全選狀態， 條件式清空， 狀態改「非全選」
          // (4) 新增- 最終條件式
          // 狀況一: 有達總長就刪除
          const dataTotal = this.assetDetailCategories[this.currentAsset].length
          const currentTotal = this.conditions.asset[this.currentAsset].length
          // 代表現在是"全選"
          if (dataTotal === currentTotal) {
            // console.log('首次')
            this.conditions.asset[this.currentAsset] = []
            this.conditions.asset[this.currentAsset].push(item)
            // console.log(this.conditions)
          } else {
            // 不勾選=> 勾選
            // 狀況1.2 代表現在是要選 "第2.第3個"
            this.conditions.asset[this.currentAsset].push(item)
            // console.log('2次')
            // console.log(this.conditions)
          }
          // this.isAllStatus = false
        }
      } else {
        // 狀況二： 勾 => 不勾
        // (0) 畫面- 刪除
        // const index = this.chooseSingleDetailGroup.indexOf(item)
        this.chooseSingleDetailGroup.delete(item)
        // (1) 刪除- fixCondtions
        this.fixConditions.delete(item)
        // (2) 刪除- 最終條件式
        const conditionIndex = this.conditions.asset[this.currentAsset].indexOf(item)
        this.conditions.asset[this.currentAsset].splice(conditionIndex, 1)
        // console.log(this.conditions)
      }
    },
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
      domRatingStars.forEach((domRatingStar) => {
        domRatingStar.removeEventListener('mouseout', this.leaveRating)
        // 再按一次星星時，會把所有加active的星星拿掉active
        domRatingStar.classList.remove('active')
        if (item >= domRatingStar.__vnode.key) {
          domRatingStars[domRatingStar.__vnode.key - 1].classList.add('active')
        }
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
      this.isAssetDetail = false
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
        if (this.conditions.rating > 0 && this.conditions.rating <= item.rating) {
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
    toCompareList (item) {
      this.compareStatus = true
      // 狀況一: 沒加過
      // 畫面
      if (!this.compareGroup.includes(item)) {
        this.compareGroup.push(item)
      } else {
        // 狀況二: 加過
        // 畫面
        const index = this.compareGroup.indexOf(item)
        this.compareGroup.splice(index, 1)
      }
    },
    quantityControl () {
      if (this.compareGroup.length > 3) {
        alert('比較基金不得超過3隻')
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
      this.$router.push('/compare')
      emitter.emit('getSearchData', this.compareGroup)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
    this.categoriesCompany()
    this.categoriesAsset()
    this.initialAllDetail()
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
