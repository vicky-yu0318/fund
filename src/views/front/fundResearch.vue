<template>
  <Breadcrumb></Breadcrumb>
  <section class="section section-searchFund" id="section-searchFund">
    <div class="container">
      <h2><i class="fas fa-search"></i>基金搜尋</h2>
      <div class="searchResult-title">
        <div>
          <span>{{ funds.length }}</span
          >個結果
        </div>
        <a class="btn" href="#section-searchResult">查看搜尋結果</a>
        <div class="btn">重設所有條件</div>
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
            />
            <ul class="match-list" v-if="matchList.length > 0 && isMatchList"
              ref="refMatchList">
              <li
                class="match-item"
                @click="chooseCondition(item)"
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
          <div class="btn-asset-choose">
            繼續選擇
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="btn-choose-group">
            <template v-for="item in assetCategory" :key="item">
              <div class="btn-choose" v-if="currentAsset === item || !isAddAsset"
                  :class="{'active': chooseAssetItems.includes(item) && fixConditions.has(item) }"
                  @click="addAssetCondition(item)"
                  > {{ item }}
              </div>
            </template>
          </div>
          <div class="category" v-if="isAssetOption">
            <!-- https://tools.wingzero.tw/article/sn/196 -->
            <!-- 這樣就不需要ID了 -->
            <label>
              <input type="checkbox" value="" :checked="isAssetAll" />
              <span> 全部 </span>
            </label>
            <label v-for="item in AssetDetailSet" :key="item">
              <!-- @change="addADetailCondition(item)" -->
              <input type="checkbox" value="${item}"  />
              <span> {{ item }} </span>
            </label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="title">計價幣別</div>
        <div class="content">
          <div class="btn-choose-group">
            <div class="btn-choose">新台幣</div>
            <div class="btn-choose">美元</div>
            <div class="btn-choose">南非幣</div>
          </div>
        </div>
        <div class="btn-more">
          更多幣別
          <i class="fas fa-angle-down"></i>
        </div>
      </div>

      <div class="row">
        <div class="title">
          基金評等
          <a href="javascript:;">
            <i class="fa-solid fa-circle-question"></i>
          </a>
          <a class="title-description"
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
      <h2><i class="fa-solid fa-square-poll-vertical"></i>搜尋結果</h2>
      <div class="search-condition">
        <!-- v-if="fixConditions" -->
        <div class="condition-item" v-for="item in fixConditions" :key="item">
          {{ item }} <i class="fas fa-times"  @click="deleteCondition(item)"></i>
        </div>
      </div>
      <ul class="searchResult">
        <li class="active">
          <div>基本資料</div>
        </li>
        <li>
          <div>報酬率</div>
        </li>
        <li>
          <div>風險</div>
        </li>
      </ul>

      <div class="content">
        <ul class="searchResult-title row">
          <li></li>
          <li>基金名稱</li>
          <li>幣別</li>
          <li>基金評等</li>
          <li></li>
        </ul>

        <ul class="searchResult-content row">
          <li>
            <button class="btn-compare" id="btn-compare">
              <i class="fas fa-plus"></i>比較
            </button>
            <button class="btn-heart" id="btn-heart">
              <i class="fas fa-heart"></i>觀察
            </button>
          </li>
          <li>摩根投資基金</li>
          <li>澳元</li>
          <li>4</li>
          <li><a href="javascript:;" class="btn-buy">申購</a></li>
        </ul>
      </div>
    </div>
  </section>

  <div class="compare-fixed">
    <div class="container">
      <!-- <section class="section-compare" id="section-compare"> -->
      <!-- <div class="container"> -->
      <div class="compare-window">
        <div class="window-head">
          <div class="title" id="btn-zoomout">比較清單 <span>(3)</span></div>
          <div class="fas fa-angle-down"></div>
        </div>
        <div class="window-body">
          <ul class="compare-list">
            <li class="compare-item">
              <div class="fund">
                貝萊德世界能源基金HedgedA2澳幣<span>00400154</span>
              </div>
              <div class="btn-close fas fa-times"></div>
            </li>
            <li class="compare-item">
              <div class="fund">
                貝萊德世界能源基金HedgedA2澳幣<span>00400154</span>
              </div>
              <div class="btn-close fas fa-times"></div>
            </li>
          </ul>
          <button class="btn">開始比較</button>
        </div>
        <div class="compare-window-footer">
          <div class="btn-list">
            <div class="active" id="btn-compareList">
              比較清單 <span>3</span>
            </div>
            <div id="btn-favoriteList">觀察清單 <span>1</span></div>
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

export default {
  data () {
    return {
      funds: fundData,
      keyword: '',
      matchList: [],
      isMatchList: false,
      tempCondition: {},
      conditions: {},
      fixConditions: [],
      companyCategory: [],
      pointCompanyCategory: [],
      assetCategory: [],
      aDetailCategory: {},
      chooseCompanyItems: [],
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
      isAssetOption: false,
      assetOptionItems: [],
      isAddAsset: false
    }
  },
  components: {
    Breadcrumb
  },
  // watch: {
  //   conditions: {
  //     handler (n, o) {
  //       console.log(n, o)
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    enterData () {
      // https://morecoke.coderbridge.io/2021/03/28/js-input-%E4%BA%8B%E4%BB%B6/
      // input事件，一輸入即觸發
      // keydown: 按下鍵盤時觸發。
      // keypress: 按著鍵盤時觸發(過時事件，官方不建議使用)。
      // beforeinput: 在 input 事件開始前觸發。
      // input: 只要 input 內的值改變就會觸發。
      // keyup: 手指離開鍵盤時觸發。
      // change: 在 input 輸入完字串後，離開(blur) input 或是在 input 內(focus)按下 enter 時觸發。
      this.matchList = this.funds.filter((fund) => {
        return fund.code.match(this.keyword) || fund.fund.match(this.keyword)
      })
      if (this.matchList.length > 0) {
        this.isMatchList = true
        this.changekeywordColor()
      }
    },
    chooseCondition (item) {
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
      // console.log(this.isSearchFund)
      if (this.keyword === '') {
        alert('請輸入基金名稱/代號')
        return
      }
      // 如果input裡面的值有符合資料庫的fund值
      this.funds.forEach((item) => {
        if (item.code === this.keyword || item.fund === this.keyword) {
          // 如果條件內已有這基金，就不新增了 (不用透過includes set陣列已經達成)
          // if (this.fixConditions.includes(item.fund)) {
          this.conditions.fund = this.tempCondition.fund
          this.prepareFundCondition()
        }
      })
      if (!this.isSearchFund) {
        alert('沒有您要找的基金名稱/代號')
      }
    },
    addAssetCondition (item) {
      // 把現在按的主要資產類別 灌入狀態內(做細項參考)
      this.isAddAsset = true
      this.currentAsset = item
      // 清空每次呈現在畫面的資產類別細節
      this.AssetDetailSet = new Set()
      this.funds.forEach((fund) => {
        const aa = fund.asset[item]
        if (typeof (aa) !== 'undefined') {
          aa.forEach((a) => {
            this.AssetDetailSet.add(a)
          })
          // console.log(this.AssetDetailSet)
        }
        // console.log(aa) ['新興單一國家股票'] push/add要是值，但目前是陣列
        // XX this.AssetDetailSet.add(...aa)
        // 筆記(先帶隨機值) ary.push(...[1, 2])
        // 出錯確認typeof console.log(ary, typeof (ary))
      })
      // console.log(this.AssetDetailSet)
      // 可複選 => 畫面要用Include 否則就用showitem: 123只帶一值
      // 狀況一: 尚未選取
      if (!this.chooseAssetItems.includes(item)) {
        this.chooseAssetItems.push(item)
        this.fixConditions.add(item)
        this.isAssetOption = true
        // !! 要放到條件式中
        // 創一個 aDetailCategory物件，格式=> { 新興市場: [拉丁, 越南], 原物料市場: [咖啡, 玉米] }
        // 但物件不適合跑資料，所以創一個key陣列，格式=> [新興市場, 原物料市場]
        // const keyAry = Object.keys(this.aDetailCategory)
        // 用原資料去取我們要的資料
        // const ary = []
        // 舊錯誤方法參考:
      //   const obj = {}
      //   keyAry.forEach((keys) => {
      //     if (item === keys) {
      //       obj[keys] = this.aDetailCategory[keys]
      //       // 會不斷被覆蓋XX
      //       if (this.isAssetNew === false) {
      //         // 舊的
      //         this.conditions.asset[keys] = this.aDetailCategory[keys]
      //       } else {
      //         // 新的
      //         this.conditions.asset = obj
      //         this.isAssetNew = false
      //       }
      //       // Cannot set properties of undefined (setting 'b')
      //       // this.conditions.asset['新興市場'] = '123'
      //     }
      //   })
      }
    },
    // addADetailCondition (item) {
    //   // (1) 如果第一次由"全部"改為"複選"
    //   if (this.isAssetAll) {
    //     this.isAssetAll = false
    //     // 加入conditions內 (代表按的不是"全部") 刪掉全部
    //     this.conditions.asset[this.currentAsset] = []
    //     this.conditions.asset[this.currentAsset].push(item)
    //   } else {
    //     // (2) 第二次加要複選的項目，就不用清空了
    //     this.conditions.asset[this.currentAsset].push(item)
    //     // console.log(this.conditions.asset[this.currentAsset])
    //   }
    //   // 加入fixConditions
    //   this.fixConditions.add(item)
    //   // console.log(this.fixConditions)
    // },
    deleteCondition (item) {
      // console.log(item)
      this.fixConditions.delete(item)
      // console.log(this.fixConditions)
      // const index = this.fixConditions.indexOf(item)
      // this.fixConditions.splice(index, 1)
      // 不能用I / new Set 使用set.delete(1)移除 / set不能用indexof
      // https://ithelp.ithome.com.tw/articles/10191607
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
      // this.categoriesADetail()
    },
    // categoriesADetail () {
    //   const obj = {}
    //   this.funds.forEach((item) => {
    //     // console.log(item.asset)
    //     // (1) 取key ['大宗商品'] ['新興市場股票'] ['高收益債'] ['大宗商品']
    //     const key = Object.keys(item.asset)
    //     //
    //     // (2) 新增物件 =>  {新興市場: [1,2,2,]; 成熟市場: [1,2,3]}
    //     //
    //     // (3) 刪掉重複 如果個新增的物件沒有看到這屬性
    //     // 新增
    //     if (obj[key] === undefined) {
    //       // key的陣列值: console.log(item.asset[key])
    //       // obj[key] = ['1', '2']
    //       let setAry = new Set()
    //       setAry = item.asset[key]
    //       obj[key] = setAry
    //       // console.log(obj)
    //       // 大宗商品: Proxy {0: '天然資源股票'}
    //       // 新興市場股票: Proxy {0: '拉丁美洲股票'}
    //       // 高收益債: Proxy {0: '亞洲高收益債'}
    //     } else {
    //       // 有過
    //       // console.log(item.asset[key])值
    //       item.asset[key].forEach((detail) => {
    //         // console.log(detail)
    //         obj[key].push(detail)
    //       })
    //     }
    //   })
    //   // this.aDetailCategory = obj
    //   // 466這裡就有問題了
    //   // console.log(this.aDetailCategory)
    //   // 大宗商品: Proxy {0: '天然資源股票', 1: '貴金屬股票', 2: '農產品'}
    //   // 新興市場股票: Proxy {0: '拉丁美洲股票', 1: '新興市場股票', 2: '新興單一國家股票'}
    //   // 高收益債: Proxy {0: '亞洲高收益債', 1: '全球/美/歐高收益債'}
    // },
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
      // console.log(this.conditions)
      // (3) 將公司名稱一個一個塞入fixConditions
      this.prepareCompanyCondition()
    },
    prepareFundCondition () {
      // 有找到才會給找到狀態
      this.isSearchFund = true
      // console.log(this.conditions)
      // console.log(this.fixConditions)
      this.fixConditions.add(this.conditions.fund)
      // this.fixConditions = Object.values(this.conditions.fund)
      // console.log(this.fixConditions)
    },
    prepareCompanyCondition () {
      // console.log(this.conditions.company)
      this.conditions.company.forEach((item) => {
        this.fixConditions.add(item)
      })
      // console.log(this.fixConditions)
    },
    // 失敗範例 prepareCompanyCondition () {
    //   // console.log(this.conditions)OK
    //   // 如果基金公司裡面有值company: (2) ['富邦投顧', '富邦投信]
    //   // ，將(陣列)拆分塞到fixConditions內
    //   const companyAry = this.conditions.company
    //   const temp = []
    //   if (companyAry !== undefined) {
    //     // console.log('目前的公司:', companyAry)
    //     // (1) 新增進去
    //     companyAry.forEach((item) => {
    //       // console.log(item, temp)
    //       temp.push(item)
    //     })
    //     // console.log(temp)
    //     // (2) 確認是否重複
    //     const ne = []
    //     temp.forEach((te) => {
    //       if (this.fixConditions.includes(te)) {
    //         console.log('重複')
    //       } else {
    //         // (3) 把temp陣列內的值拆開
    //         // console.log(temp)
    //         ne.push(te)
    //         // this.fixConditions.push(te)
    //         console.log(ne)
    //       }
    //     })
    //     // 要歸零，但不是在for回圈內
    //     // const tempAry = new Set()
    //     // companyAry.forEach((value, index) => {
    //     //   console.log('做拆分:', companyAry.slice(index, index + 1))
    //     //   console.log('tempAry裝什麼:', tempAry)
    //     //   tempAry.push(companyAry.slice(index, index + 1))
    //     // })
    //     // console.log('目前條件:', tempAry)
    //   }
    // },
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
    }
  },
  mounted () {
    this.categoriesCompany()
    this.categoriesAsset()
    const setTemp = new Set()
    this.fixConditions = setTemp
    this.setTemp = new Set()
    this.AssetDetailSet = setTemp
  }
}
// slice好文
// https://medium.com/@bebebobohaha/slice-splice-split-%E5%82%BB%E5%82%BB%E5%88%86%E4%B8%8D%E6%B8%85-46d9c8992729
// https://blog.csdn.net/weixin_40013817/article/details/103069487 一個觸發，兩件事情；多個觸發
</script>
