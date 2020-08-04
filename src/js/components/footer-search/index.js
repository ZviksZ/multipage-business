export class FooterSearch {
   constructor() {
      this.$footerSearch = document.querySelector('.footer-search');
      this.$input = document.querySelector('.footer-search .footer-search_input');
      this.$btn = document.querySelector('.footer-search .footer-search_btn');
      this.$iconSearch = document.querySelector('.footer-search .footer-search_icon-search');
      this.$iconClean = document.querySelector('.footer-search .footer-search_icon-clean');




      this.init();
   }

   init = () => {
      this.$iconSearch.addEventListener('click', this.activateSearch);
      this.$iconClean.addEventListener('click', this.deactivateSearch);
      this.$input.addEventListener('focus', this.openBtnOnInputChange);
   }

   activateSearch = (e) => {
      e.preventDefault();

      this.$footerSearch.classList.add('footer-search__active');
      this.$input.focus();
   }

   deactivateSearch = (e) => {
      e.preventDefault();

      this.$footerSearch.classList.remove('footer-search__active');
      this.$input.value = '';
   }

   openBtnOnInputChange = () => {
      this.$footerSearch.classList.add('footer-search__active');
   }

}
