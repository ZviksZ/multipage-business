export class FullscreenScroll {
   constructor() {
      this.container = document.querySelector('.fullscreen-page');
      this.pages = Array.from(document.querySelectorAll('.fullscreen-page .section'));
      this.curr = 0;
      this.scrolling = false;
      this.lastScroll = Date.now();
      this.ticker = 0;
      this.index = 0;
      this.$header = document.getElementById('header');
      this.headerClassName = 'compact';


      if (!this.container || !this.pages.length || document.documentElement.clientWidth < 1000) {
         return false
      }

      this.handleScroll = this.handleScroll.bind(this)
      this.scrollTo = this.scrollTo.bind(this)

      this.init();
   }

   init() {
      this.pages[this.curr].classList.add('active');

      window.onmousewheel = this.handleScroll;
      window.addEventListener('DOMMouseScroll', this.handleScroll);

      window.scrollY=0;
   }

   handleScroll(event) {
      const delta = event.wheelDelta || event.detail;
      const now = Date.now();
      const duration = now - this.lastScroll;
      this.lastScroll = now;

      if (duration < 50 && Math.abs(delta) < 50) {
         return false
      }
      if (this.scrolling) {
         return false
      }

      const down = delta < 0;
      const next = Math.max(0, Math.min(this.curr + (down ? 1 : -1), this.pages.length));
      if (this.index === next || next === this.pages.length) {
         return false
      }
      this.scrollTo(next, down);
      this.curr = next;

      this.pages.forEach((page, index) => {
         if (index === this.curr) {
            page.classList.add('active');
         } else {
            page.classList.remove('active');
         }
      });

      this.changeHeaderOnScroll()
   }

   scrollTo(pageIndex, isDown) {
      if (this.index === pageIndex || pageIndex === this.pages.length) {
         return false
      }
      this.index = pageIndex;

      let containerTranslate = this.getContainerTranslateY();
      let target;

      if (containerTranslate === 0 && !isDown) {
         return false
      }

      if (this.pages[pageIndex].offsetHeight <= window.innerHeight && isDown) {
         target = - this.pages[pageIndex].offsetHeight + containerTranslate;
      } else if (this.pages[pageIndex].offsetHeight <= window.innerHeight && !isDown) {
         target = this.pages[pageIndex + 1].offsetHeight + containerTranslate;
      }

      const _ticker = this.ticker = Date.now();
      this.scrolling = true;

      const timer = setInterval(() => {
         if (this.ticker !== _ticker) {
            clearInterval(timer);
            return;
         }

         const source = this.getContainerTranslateY();
         const nextStep = source + (target > source ? Math.ceil : Math.floor)((target - source) * 0.05);

         this.container.style.transform = 'translateY(' + nextStep +'px)';

         if (nextStep === target) {
            clearInterval(timer);
            this.scrolling = false;
         }
      }, 6);
   }

   changeHeaderOnScroll() {
      if (this.curr !== 0) {
         this.$header.classList.add(this.headerClassName);
      } else {
         this.$header.classList.remove(this.headerClassName);
      }
   }

   getContainerTranslateY() {
      return Number.parseInt(window.getComputedStyle(this.container).transform.split(', ')[5]) || 0
   }

}
