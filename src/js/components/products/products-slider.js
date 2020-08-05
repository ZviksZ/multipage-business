import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class ProductsSlider {
   constructor() {
      this.$slider = $('#products-detail_slider');
      if (!this.$slider) return;
      this.$tabs = $('#slider-colors');


      this.init();
   }

   init = () => {
      this.initSlider();

      this.initTabs()
   }

   initSlider = () => {
      this.$instance = new Swiper(this.$slider, {
         effect: 'slide',
         loop: false,
         preloadImages: false,
         lazy: true,
         resistance: false,
         //spaceBetween: 32,
         navigation: {
            nextEl: '.swiper-arrows .swiper-button-next',
            prevEl: '.swiper-arrows .swiper-button-prev'
         },
         on: {
            slideChange: () => {
               // костыль для lazy load - ХЗ почему не работает нормально!
               // this.slider.lazy.load();
            }
         }
      });
   }

   initTabs = () => {
      let productsSlider = this.$instance;
      let colorTabs = this.$tabs;

      this.$tabs.find('.item').on('click', function (e) {
         e.preventDefault();

         let slideIndex = $(this).attr('data-slide');

         colorTabs.find('.item').removeClass('active');
         $(this).addClass('active');

         productsSlider.slideTo(slideIndex, 600, true);
      })
   }


}
