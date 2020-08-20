import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class ProjectTopSlider {
   constructor() {
      this.$slider = $('#ro-top_slider');
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
         slidesPerView: 'auto',
         spaceBetween: 30,
         freeMode: true,
         //spaceBetween: 32,
         navigation: {
            nextEl: '.ro_top__slider-wrap .ro-top__slider-controls .swiper-button-next',
            prevEl: '.ro_top__slider-wrap .ro-top__slider-controls .swiper-button-prev'
         },
         pagination: {
            el: '.ro_top__slider-wrap .ro-top__slider-controls .swiper-pagination',
            type: 'fraction',
         },
         on: {
            slideChange: () => {
               let slideIndex = +this.$instance.activeIndex;

               /*this.$tabs.find('.item').removeClass('active');
               this.$tabs.find('[data-slide="'+ slideIndex + '"]').addClass('active');*/
            }
         }
      });
   }
}
