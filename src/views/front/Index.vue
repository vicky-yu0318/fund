<template>
  <Navbar :currentPage="currentPage"></Navbar>
    <section class="section section-home" id="section-home">
        <div class="container">
            <div class="home-slider">
                <div class="slide"
                  :class="{ active: currentIndex === index }"
                  v-for="(item, index) in indexSlide" :key="item">
                    <div class="content">
                        <span>{{ item.subtitle }}</span>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.content }} </p>
                        <a href="#" class="btn">前往了解</a>
                    </div>
                    <div class="image">
                        <img :src="item.imageSrc">
                    </div>
                </div>
            </div>

            <div id="home-slide-next" class="fas fa-angle-right" @click="nextPage"
            ></div>
            <div id="home-slide-prev" class="fas fa-angle-left" @click="prePage"
              ></div>
        </div>
    </section>
    <section class="section section-topic" id="section-topic">
        <div class="container">
            <div class="item-group">
                <a class="item">
                    <span class="new">New</span>
                    <i class="fa-solid fa-piggy-bank"></i>
                    <h3 class="title">幸福長跑 基金優惠</h3>
                    <p>讓投資變習慣，為自己好好打算。定期定額滿三年，手續費0元</p>
                    <div class="block-btn-more">
                      <div class="btn">了解更多</div>
                    </div>
                </a>
                <a class="item">
                    <span class="new">New</span>
                    <i class="fa-solid fa-comments-dollar"></i>
                    <h3 class="title">小資理財術</h3>
                    <p>利用小錢及早學習投資理財，「你不理財、財不理你」跨出第一步是成功的開始</p>
                    <div class="block-btn-more">
                        <div class="btn">了解更多</div>
                    </div>
                </a>
                <a class="item">
                    <span class="new">New</span>
                    <i class="fa-solid fa-comment-dots"></i>
                    <h3 class="title">買基金必學法則</h3>
                    <p>看著朋友們享受投資成果，您是否也想要開始學習投資基金呢？只要掌握以下重點，就能輕鬆上手！</p>
                    <div class="block-btn-more">
                        <div class="btn">了解更多</div>
                    </div>
                </a>
            </div>
        </div>
    </section>
    <section class="section section-service" id="section-service">
        <div class="container">
            <Swiper class="service-slider swiper"
              :pagination="{ clickable: true }"
              :breakpoints="swiperOptions.breakpoints"
              :autoplay="{  autoplay: true,
                            disableOnInteraction: false,
                            stopOnLastSlide: false}"
              loop
              :centeredSlides="true"
              >
                    <SwiperSlide class="slide swiper-slide"
                      >
                        <img src="@/assets/images/001.jpg" alt="">
                        <div class="content">
                            <h3 class="title">定期不定額，提高勝率</h3>
                            <p>投資策略採「自由設定」，全方位滿足不同市場行情需求，客觀判斷加減碼，避免因人為主觀判斷錯失投資機會。</p>
                            <div class="block-btn">
                                <a href="javascript:;" class="btn">了解更多</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide class="slide swiper-slide">
                        <img src="@/assets/images/002.jpg" alt="">
                        <div class="content">                            <h3 class="title">最佳智能團，安心不費力</h3>
                            <p>為不同投資類型投資人精準配置需求；智能團依據市場趨勢、基金績效嚴選每月首選基金，滿足各種投資需求</p>
                            <div class="block-btn">
                                <a href="javascript:;" class="btn">了解更多</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide class="slide swiper-slide">
                        <img src="@/assets/images/003.jpg" alt="">
                        <div class="content">
                            <h3 class="title">想抗通膨又買不起房？不妨靠REITS</h3>
                            <p>在全球普遍預期通膨影響下，在台灣也可以感受到房價上漲所帶來壓力，不過投資人或許可以把買房的夢想，
                              放在全球不動產投資信託基金(REITs)，更能掌握成長趨勢</p>
                            <div class="block-btn">
                                <a href="javascript:;" class="btn">了解更多</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide class="slide swiper-slide">
                        <img src="@/assets/images/004.jpg" alt="">
                        <div class="content">
                            <h3 class="title">第一次買基金就上手</h3>
                            <p>基金是一項普及的投資標的，對於剛開始投資基金的人來說，除了要有第一筆資金外，也應該做好心理準備與認知，才能正式步上投資理財的道路。</p>
                            <div class="block-btn">
                                <a href="javascript:;" class="btn">了解更多</a>
                            </div>
                        </div>
                    </SwiperSlide>

                <div class="swiper-pagination"></div>
            </Swiper>
        </div>
    </section>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import goTop from '@/methods/goTop'
// swiper core
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
// swiper vue
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
// swiper css
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay])

export default {
  data () {
    return {
      currentPage: this.$route.fullPath,
      swiperOptions: {
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1200: { slidesPerView: 3, spaceBetween: 30 }
        }
      },
      showNextBtn: false,
      sidePage: 0,
      indexSlide: [
        {
          title: '開啟投資第一步',
          subtitle: '開始比研究更重要',
          imageSrc: 'https://i.postimg.cc/cH0LytJk/phone.png',
          content: '活動期間數位通路申購首選基金，享申購手續費6折優惠'
        },
        {
          title: '共同基金',
          subtitle: '攜手成長，安全有保障',
          imageSrc: 'https://i.postimg.cc/rpgvsDJP/final0.png',
          content: '共同基金因資金龐大，可有計劃的分散投資。擁有智能團隊專業的判斷，提高投資勝算。'
        }
      ],
      currentIndex: 0,
      slideLen: ''
    }
  },
  components: {
    Navbar,
    Swiper,
    SwiperSlide
  },
  methods: {
    nextPage () {
      this.slideLen = this.indexSlide.length
      this.currentIndex = (this.currentIndex + 1) % this.slideLen
    },
    prePage () {
      this.currentIndex = ((this.currentIndex - 1) + this.slideLen) % this.slideLen
    }
  },
  mounted () {
    goTop()
  }
}
</script>
