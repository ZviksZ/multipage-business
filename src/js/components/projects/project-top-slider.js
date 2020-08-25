import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';

export class ProjectTopSlider {
   constructor() {
      this.$slider = $('#ro-top_slider');
      if (!this.$slider.length) return false;

      this.$sliderControls = $('#ro-top_slider-controls');

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
         freeMode: true,
         slidesPerView: 'auto',
         spaceBetween: 30,
         navigation: {
            nextEl: '.ro_top__slider-wrap .ro-top__slider-controls .swiper-button-next',
            prevEl: '.ro_top__slider-wrap .ro-top__slider-controls .swiper-button-prev'
         },
         pagination: {
            el: '.ro_top__slider-wrap .ro-top__slider-controls .swiper-progressbar',
            type: 'progressbar'
         },
         on: {
            slideChange: () => {
               let slideIndex = +this.$instance.activeIndex + 1;


               this.$sliderControls.find('.swiper-pagination-current').text(slideIndex);
            },
            reachEnd: () => {
               setTimeout(() => {
                  this.$sliderControls.find('.swiper-pagination-current').text(this.totalSlides);

                  this.$instance.activeIndex = this.totalSlides + '';
               }, 100)

            }

         }
      });
   }

   initPagination = () => {
      this.totalSlides = this.$slider.find('.swiper-slide').length;

      this.$sliderControls.find('.swiper-pagination-total').text(this.totalSlides);
   }
}
