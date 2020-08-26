import * as $                    from 'jquery';

export class ProductsSearch {
   constructor() {
      this.$input = $('#products-input');
      if (this.$input.length === 0) {
         return false
      }

      this.$items = $('#products-list .item');
      this.$columnBlocks = $('#products-list .column-block');

      this.init();
   }

   init = () => {
      this.initHandlers();
   }

   initHandlers = () => {
      this.$input.on('input', this.filterItems);
   }


   filterItems = (e) => {
      let text = e.currentTarget.value;

      if (text.length > 0) {
         for (let i = 0; i < this.$items.length; i++) {
            let item = $(this.$items[i]);

            if (!item.text().toLowerCase().includes(text)) {
               item.addClass('hide');
            } else {
               item.removeClass('hide');
            }

            if (item.closest('.column-block').find('.item:not(.hide)').length === 0) {
               item.closest('.column-block').find('.title').addClass('hide');
            } else {
               item.closest('.column-block').find('.title').removeClass('hide');
            }
         }
      } else {
         this.$items.removeClass('hide');
         this.$columnBlocks.find('.title').removeClass('hide');
      }

    /*  for (let j = 0; j < this.$columnBlocks.length; j++) {
         let item = $(this.$columnBlocks[j]);

         if (!item.find('.item:not(.hide)').length){
            item.find('.title').addClass('hide')
         } else {
            item.find('.title').removeClass('hide')
         }
      }*/
   }

}
