import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class ProjectSlider {
   constructor() {
      this.$slider = $('#ro_slider');

      if (this.$slider.length === 0) return false;

      this.$sliderControls = $('#ro_slider-controls');

      this.init();
   }

   init = () => {
      this.initPagination();
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
            nextEl: '.ro-main-slider .ro__slider-controls .swiper-button-next',
            prevEl: '.ro-main-slider .ro__slider-controls .swiper-button-prev'
         },
         pagination: {
            el: '.ro-main-slider .ro__slider-controls .swiper-progressbar',
            type: 'progressbar'
         },
         on: {
            slideChange: () => {
               let slideIndex = +this.$instance.activeIndex + 1;

               this.$sliderControls.find('.swiper-pagination-current').text(slideIndex);
            }
         }
      });
   }

   initPagination = () => {
      let total = this.$slider.find('.swiper-slide').length;

      this.$sliderControls.find('.swiper-pagination-total').text(total);
   }
}
