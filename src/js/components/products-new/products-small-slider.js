import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class ProductsSmallSlider {
   constructor() {
      this.$slider = $('#product-slider-small');

      if (this.$slider.length === 0) return false;

      this.$sliderControls = $('#product-slider-small_controls');

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
            nextEl: '#product-slider-small_controls .swiper-button-next',
            prevEl: '#product-slider-small_controls .swiper-button-prev'
         },
         pagination: {
            el: '#product-slider-small_controls .swiper-progressbar',
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
