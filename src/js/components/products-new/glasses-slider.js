import * as $                    from 'jquery';
import Swiper from 'swiper/js/swiper.min';
const ProgressBar = require('progressbar.js');

export class GlassesSlider {
   constructor() {
      this.$slider = $('#product-glasses_slider');
      if (!this.$slider.length) return false;
      this.$tabs = $('#product-glasses_tabs');


      this.init();
   }

   init = () => {
      if (this.$tabs.find('.show-more-btn').length > 0) {
         this.$tabs.find('.show-more-btn').on('click', this.initTabsShowMore)
      }
      this.initSlider();
      this.initTabs();
      this.initProgressBars();
   }

   initTabsShowMore = (e) => {
      e.preventDefault();

      if (this.$tabs.hasClass('show-more-items')) {
         this.$tabs.removeClass('show-more-items')
         this.$tabs.find('.show-more-btn').text('Показать больше')
      } else {
         this.$tabs.addClass('show-more-items')
         this.$tabs.find('.show-more-btn').text('Скрыть')
      }
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


   initProgressBars = () => {
      this.$slider.find('.circle-item').each(function(_, item) {
         let percent = +$(item).attr('data-percent') / 100;

         let bar = new ProgressBar.Circle(item, {
            strokeWidth: 10,
            easing: 'easeInOut',
            duration: 1400,
            color: '#3e61ab',
            trailColor: 'rgba(255,255,255,0.3)',
            trailWidth: 4,
            svgStyle: null
         });

         bar.set(percent);
      })



   }

}
