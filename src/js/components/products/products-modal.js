import * as $                    from 'jquery';

export class ProductsModal {
   constructor() {
      this.$modal = $('#products-modal');
      if (!this.$modal) return false

      this.$moreBtn = this.$modal.find('.more-btn');
      this.$addressItems = this.$modal.find('.address-item');

      this.init();
   }

   init = () => {
      this.initHandlers();
   }

   initHandlers = () => {
      this.$moreBtn.on('click', this.showFullList);
   }

   showFullList = (e) => {
      e.preventDefault();

      this.$modal.addClass('show-full-list')
   }

}
