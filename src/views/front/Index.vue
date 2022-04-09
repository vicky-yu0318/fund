<template>
  <Navbar :currentPage="currentPage"></Navbar>
    <section class="section section-home" id="section-home">
        <div class="container">
            <div class="home-slider">
                <div class="slide"
                  :class="{ active: currentIndex === index }"
                  v-for="(item, index) in indexSlide" :key="item">
                    <div class="content">
                        <span>new arrivals</span>
                        <h3>{{ item.title }}</h3>
                        <p> 攜手成長</p>
                        <a href="#" class="btn">shop now</a>
                    </div>
                    <div class="image connect">
                        <img :src="item.imageSrc">
                    </div>
                </div>
                <!-- <div class="slide" :class="{active: sidePage === 1}">
                    <div class="content">
                        <span>new arrivals</span>
                        <h3>共同基金</h3>
                        <p>ctetur adipisicing elit. Dolorum, debitis.</p>
                        <a href="#" class="btn">shop now</a>
                    </div>
                    <div class="image">
                        <img src="https://upload.cc/i1/2022/04/04/TSYKbM.png" alt="">
                    </div>
                </div> -->
            </div>

            <div id="home-slide-next" class="fas fa-angle-right" @click="nextPage"
            :class="{hover: showNextBtn}"
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
                    <h3 class="title">title</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, repellendus!</p>
                    <div class="block-btn-more">
                      <div class="btn">了解更多</div>
                    </div>
                </a>
                <a class="item">
                    <span class="new">New</span>
                    <i class="fa-solid fa-comments-dollar"></i>
                    <h3 class="title">title</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, repellendus!</p>
                    <div class="block-btn-more">
                        <div class="btn">了解更多</div>
                    </div>
                </a>
                <a class="item">
                    <span class="new">New</span>
                    <i class="fa-solid fa-comment-dots"></i>
                    <h3 class="title">title</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, repellendus!</p>
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
                :autoplay="{ autoplay: true,
                              disableOnInteraction: false
                            }"
              loop
              :centeredSlides="true"
              >
                    <SwiperSlide class="slide swiper-slide"
                      >
                        <img src="https://upload.cc/i1/2022/04/04/JyBMX0.jpg" alt="">
                        <div class="content">
                            <h3 class="title">title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laborum facilis rem est. Incidunt obcaecati magni fugiat quo, repudiandae placeat.</p>
                            <div class="block-btn">
                                <a href="" class="btn">了解更多</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide class="slide swiper-slide">
                        <img src="https://upload.cc/i1/2022/04/04/HYvNwJ.jpg" alt="">
                        <div class="content">
                            <h3 class="title">title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laborum facilis id necessitatibus provident ut
                                accusamus, accusantium debitis quia ipsum odit dolorem est. Incidunt obcaecati magni fugiat quo, repudiandae
                                placeat.</p>
                            <div class="block-btn">
                                <a href="" class="btn">了解更多</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide class="slide swiper-slide">
                        <img src="https://upload.cc/i1/2022/04/04/mhk4uP.jpg" alt="">
                        <div class="content">
                            <h3 class="title">title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laborum facilis id necessitatibus provident ut
                                accusamus, accusantium debitis quia ipsum odit dolorem est. Incidunt obcaecati magni fugiat quo, repudiandae
                                placeat.</p>
                            <div class="block-btn">
                                <a href="" class="btn">了解更多</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide class="slide swiper-slide">
                        <img src="https://upload.cc/i1/2022/04/09/WPELFk.jpg" alt="">
                        <div class="content">
                            <h3 class="title">title</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laborum facilis id necessitatibus provident ut
                                accusamus, accusantium debitis quia ipsum odit dolorem est. Incidunt obcaecati magni fugiat quo, repudiandae
                                placeat.</p>
                            <div class="block-btn">
                                <a href="" class="btn">了解更多</a>
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
          title: '手機',
          imageSrc: 'https://upload.cc/i1/2022/04/04/diAtjQ.png'
        },
        {
          title: '房子',
          imageSrc: 'https://upload.cc/i1/2022/04/07/HeLgPK.png'
        }
      ],
      currentIndex: 0,
      slideLen: ''
      //  slideLen: this.indexSlide.length一載入的時候讀不到，先後順序原理
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
    // const slideLen =
    // console.log(this.$route)
  }
}
</script>
