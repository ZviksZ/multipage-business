export class HeaderMenu {
   constructor() {
      this.$body = document.querySelector('body');
      this.$menu = document.querySelector('.header__menu');
      this.$openBtn = document.querySelector('#header .header__menu-btn');
      this.$closeBtn = document.querySelector('.header__menu .header__menu-close');

      this.openMenu = this.openMenu.bind(this)
      this.closeMenu = this.closeMenu.bind(this)
      this.outsideClickClose = this.outsideClickClose.bind(this)

      this.init();
   }

   init() {
      this.$openBtn.addEventListener('click', this.openMenu);

      this.$closeBtn.addEventListener('click', this.closeMenu);

      document.addEventListener('mouseup', this.outsideClickClose);
   }

   openMenu(e) {
      e.preventDefault();

      this.$body.classList.add('header__menu-open');
   }

   closeMenu(e) {
      e.preventDefault();

      this.$body.classList.remove('header__menu-open');
   }

   outsideClickClose(e) {
      if (e.target !== this.$menu && !this.$menu.contains(e.target)) {
         this.$body.classList.remove('header__menu-open');
      }
   }
}
