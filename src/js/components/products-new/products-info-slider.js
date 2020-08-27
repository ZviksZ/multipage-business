import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class ProductsInfoSlider {
   constructor() {
      this.$slider = $('#product-info_slider');

      if (this.$slider.length === 0) return false;

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
         resistance: 'auto',
         slidesPerView: 'auto',
         freeMode: true,
         //spaceBetween: 32,
         navigation: {
            nextEl: '#product-info_slider_controls .swiper-button-next',
            prevEl: '#product-info_slider_controls .swiper-button-prev'
         },

      });
   }
}
