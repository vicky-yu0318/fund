<template>
  <Navbar :currentPage="currentPage"></Navbar>
    <!-- <section class="section section-home" id="section-home">
        <div class="container">
            <div class="home-slider">
                <div class="slide active">
                    <div class="content">
                        <span>new arrivals</span>
                        <h3>共同基金</h3>
                        <p> 攜手成長</p>
                        <a href="#" class="btn">shop now</a>
                    </div>
                    <div class="image connect">
                        <img src="https://upload.cc/i1/2022/04/04/diAtjQ.png" alt="">
                    </div>
                </div>
                <div class="slide">
                    <div class="content">
                        <span>new arrivals</span>
                        <h3>共同基金</h3>
                        <p>ctetur adipisicing elit. Dolorum, debitis.</p>
                        <a href="#" class="btn">shop now</a>
                    </div>
                    <div class="image">
                        <img src="https://upload.cc/i1/2022/04/04/TSYKbM.png" alt="">
                    </div>
                </div>
            </div>

            <div id="home-slide-next" class="fas fa-angle-right" onClick="nextPage()"></div>
            <div id="home-slide-prev" class="fas fa-angle-left" onClick="prePage()"></div>
        </div>
    </section> -->
    <!-- <section class="section section-topic" id="section-home">
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
    </section> -->
    <!-- <section class="section section-service" id="section-service">
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
                <div class="swiper-pagination"></div>
            </Swiper>
        </div>
    </section> -->
</template>
<script>
// import Navbar from '@/components/Navbar.vue'
// import goTop from '@/methods/goTop'
// // swiper core
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
// // swiper vue
// import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
// // swiper css
// import 'swiper/swiper-bundle.css'

// SwiperCore.use([Navigation, Pagination, Autoplay])

// export default {
//   data () {
//     return {
//       currentPage: this.$route.fullPath,
//       swiperOptions: {
//         breakpoints: {
//           0: { slidesPerView: 1, spaceBetween: 30 },
//           768: { slidesPerView: 2, spaceBetween: 30 },
//           1200: { slidesPerView: 3, spaceBetween: 30 }
//         }
//       }
//     }
//   },
//   components: {
//     Navbar,
//     Swiper,
//     SwiperSlide
//   },
//   mounted () {
//     goTop()
//     // console.log(this.$route)
//   }
// }
// </script>
