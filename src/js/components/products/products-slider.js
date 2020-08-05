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
      $('.body, .products-detail').addClass('overflow-visible');

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
               let slideIndex = +this.$instance.activeIndex;

               this.$tabs.find('.item').removeClass('active');
               this.$tabs.find('[data-slide="'+ slideIndex + '"]').addClass('active');
            }
         }
      });
   }

   initTabs = () => {
      this.$tabs.find('.item').on('click', (e) => {
         e.preventDefault();

         let slideIndex = $(e.currentTarget).attr('data-slide');

         this.$tabs.find('.item').removeClass('active');
         $(e.currentTarget).addClass('active');

         this.$instance.slideTo(slideIndex, 300, true);
      })
   }


}
