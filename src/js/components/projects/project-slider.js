import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class ProjectSlider {
   constructor() {
      this.$slider = $('#ro_slider');
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
         slidesPerView: 1,
         //spaceBetween: 32,
         navigation: {
            nextEl: '.swiper-arrows .swiper-button-next',
            prevEl: '.swiper-arrows .swiper-button-prev'
         },
         on: {
            slideChange: () => {
               let slideIndex = +this.$instance.activeIndex;

               this.$tabs.find('.item').removeClass('active');
               this.$tabs.find('[data-slide="'+ slideIndex + '"]').addClass('active');
            }
         }
      });
   }
}
