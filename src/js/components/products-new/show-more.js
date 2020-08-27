import * as $                    from 'jquery';

export class ShowMore {
   constructor() {
      this.$btn = $('#show-more');

      if (this.$btn.length === 0) return false;

      this.init();
   }

   init = () => {
      this.$btn.on('click', this.showMore)
   }

   showMore = () => {
      this.$btn.closest('.text').find('.hide-mobile').removeClass('hide-mobile');
      this.$btn.remove();
   }
}
