import * as $         from 'jquery';

export class FooterSearch {
   constructor() {
      this.$footerSearch = $('.footer-search');
      this.$input = this.$footerSearch.find('.footer-search_input');
      this.$btn = this.$footerSearch.find('.footer-search_btn');
      this.$iconSearch = this.$footerSearch.find('.footer-search_icon-search');
      this.$iconClean = this.$footerSearch.find('.footer-search_icon-clean');




      this.init();
   }

   init = () => {
      this.$iconSearch.on('click', this.activateSearch);
      this.$iconClean.on('click', this.deactivateSearch);
      this.$input.on('focus', this.openBtnOnInputChange);
   }

   activateSearch = (e) => {
      e.preventDefault();

      this.$footerSearch.addClass('footer-search__active');
      this.$input.focus();
   }

   deactivateSearch = (e) => {
      e.preventDefault();

      this.$footerSearch.removeClass('footer-search__active');
      this.$input.value = '';
   }

   openBtnOnInputChange = () => {
      this.$footerSearch.addClass('footer-search__active');
   }

}
