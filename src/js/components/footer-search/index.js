export class FooterSearch {
   constructor() {
      this.$input = document.querySelector('.footer-search .footer-search_input');
      this.$btn = document.querySelector('.footer-search .footer-search_btn');
      this.$iconSearch = document.querySelector('.footer-search .footer-search_icon-search');
      this.$iconClean = document.querySelector('.footer-search .footer-search_icon-clean');


      this.activateSearch = this.activateSearch.bind(this);
      this.deactivateSearch = this.deactivateSearch.bind(this);


      this.init();
   }

   init() {
      this.$iconSearch.addEventListener('click', this.activateSearch);
      this.$iconClean.addEventListener('click', this.deactivateSearch);

      //document.addEventListener('mouseup', this.outsideClickClose);
   }

   activateSearch(e) {
      e.preventDefault();

      this.$btn.classList.add('show');
      this.$iconSearch.classList.add('icon-hide');
      this.$iconClean.classList.remove('icon-hide');
      this.$input.focus();
   }

   deactivateSearch(e) {
      e.preventDefault();

      this.$btn.classList.remove('show');
      this.$iconSearch.classList.remove('icon-hide');
      this.$iconClean.classList.add('icon-hide');
   }

  /* closeMenu(e) {
      e.preventDefault();

      this.$body.classList.remove('header__menu-open');
   }

   outsideClickClose(e) {
      if (e.target !== this.$menu && !this.$menu.contains(e.target)) {
         this.$body.classList.remove('header__menu-open');
      }
   }*/
}
