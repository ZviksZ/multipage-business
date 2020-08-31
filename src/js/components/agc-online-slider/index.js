import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class AgcOnlineSlider {
   constructor() {
      this.$slider = $('#agc-video_slider');
      if (!this.$slider.length) return false;


      this.init();
   }

   init = () => {
      this.initSlider();
   }

   initSlider = () => {
      this.$instance = new Swiper(this.$slider, {
         effect: 'slide',
         loop: false,
         preloadImages: false,
         lazy: true,
         resistance: false,
         slidesPerView: 2,
         freeMode: true,
         spaceBetween: 32,
         navigation: {
            nextEl: '.agc-video_slider-wrap .swiper-button-next',
            prevEl: '.agc-video_slider-wrap .swiper-button-prev'
         },
         breakpoints: {
            320: {
               slidesPerView: 1,
               spaceBetween: 0
            },
            768: {
               slidesPerView: 2,
               spaceBetween: 32
            }
         }
      });
   }


}
