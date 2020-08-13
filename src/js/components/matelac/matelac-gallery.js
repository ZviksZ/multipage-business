import * as $ from 'jquery';
import Swiper from "swiper/js/swiper.min.js";

export class MatelacGallery {
   constructor() {
      this.$gallery = $('#matelac-gallery');

      if (!this.$gallery.length) return false;

      this.$slider = $('#gallery-slider');

      this.init();
   }

   init = () => {
      this.initModalItems();
      this.initModalSlider();
      this.initSlideTo();
      this.initSliderImgScale();
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

   initModalSlider = () => {
         this.$sliderInstance = new Swiper(this.$slider, {
            effect: 'slide',
            loop: false,
            preloadImages: false,
            lazy: true,
            resistance: false,
            slidesPerView: 1,
            centeredSlides: true,
            centeredSlidesBounds: true,
            spaceBetween: 0,
            navigation: {
               nextEl: '.gallery-modal .swiper-button-next',
               prevEl: '.gallery-modal .swiper-button-prev'
            },
            on: {
               slideChange: () => {
                  this.$slider.find('.swiper-slide').removeClass('slide-scale')
               }
            }
         });

   }


}


