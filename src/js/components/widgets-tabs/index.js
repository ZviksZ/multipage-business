import * as $ from 'jquery';

export class WidgetTabs {
   constructor() {
      this.$section = $('.widgets');
      if (!this.$section.length) {
         return false
      }
      this.$switchers = this.$section.find('.switchers');
      this.$widgetsTabs = this.$section.find('.widgets-tabs');


      this.init();
   }

   init = () => {
      this.startTabs();
      this.initHandlers();
   }

   startTabs = () => {
      if (!this.$switchers.find('.switch').hasClass('active')) {
         this.$switchers.find('.switch').first().addClass('active')
      }
      let activeTab = this.$switchers.find('.active').attr('data-tab');

      this.$widgetsTabs.find('.item[data-tab="' + activeTab + '"]').addClass('active');
   }

   initHandlers = () => {
      this.$switchers.find('.switch').on('click', this.changeTab);
   }

   changeTab = (e) => {
      e.preventDefault();

      this.$switchers.find('.switch').removeClass('active');
      this.$widgetsTabs.find('.item').removeClass('active');

      this.$switchers.find('.switch[data-tab="' + $(e.currentTarget).attr('data-tab') + '"]').addClass('active');
      this.$widgetsTabs.find('.item[data-tab="' + $(e.currentTarget).attr('data-tab') + '"]').addClass('active');


      $(e.currentTarget).closest('.page-filter').removeClass('filter-open');
   }

}
