import * as $                    from 'jquery';

export class ProductsTabs {
   constructor() {
      this.$tabs = $('.products-detail .products-detail_tabs .tab');

      this.init();
   }

   init = () => {
      this.initHandlers();
   }

   initHandlers = () => {
      this.$tabs.find('.tab_header').on('click', this.openTab);
   }

   openTab = (e) => {
      if (!$(e.target).closest('.tab').hasClass('open')) {
         this.$tabs.removeClass('open')

         $(e.target).closest('.tab').addClass('open')
      } else {
         this.$tabs.removeClass('open')
      }
   }

}
