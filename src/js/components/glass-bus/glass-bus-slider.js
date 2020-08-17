import * as $ from 'jquery';
import Swiper from "swiper/js/swiper.min.js";

export class GlassBusSlider {
   constructor() {
      this.$slider = $('#glass-bus__slider');

      if (!this.$slider.length) return false;

      this.init();
   }

   init = () => {
      this.initSlider();
   }

   initSliderImgScale = () => {
      this.$slider.find('.swiper-slide').on('dblclick', function (e) {
         $(this).toggleClass('slide-scale');
      })
   }

   initSlideTo = () => {
      this.$gallery.find('.item').on('click', (e) => {
         let slide = +$(e.currentTarget).attr('data-slide');

         this.$sliderInstance.slideTo(slide, 10, true);

         setTimeout(() => {
            this.$sliderInstance.update();
         }, 10)
      })
   }

   initModalItems = () => {
      let template = ``;

      this.$gallery.find('.item').each((index, item) => {
         let img = item.dataset.img;

         template += this.getModalItemTemplate(img)
      })

      this.$slider.find('.swiper-wrapper').html(template)
   }

   getModalItemTemplate = (image) => {
      return `
         <div class="swiper-slide" style="background-image: url(${image})">
            
         </div>
      `
   }

   initSlider = () => {
      this.$sliderInstance = new Swiper(this.$slider, {
         loop: false,
         preloadImages: false,
         lazy: true,
         resistance: false,
         slidesPerView: 1,
         centeredSlides: true,
         centeredSlidesBounds: true,
         spaceBetween: 0,
         navigation: {
            nextEl: '.glass-bus__slider-wrap .swiper-button-next',
            prevEl: '.glass-bus__slider-wrap .swiper-button-prev'
         },
         on: {
            slideChange: () => {
               this.$slider.find('.swiper-slide').removeClass('slide-scale')
            }
         }
      });

   }


}


