import * as $         from 'jquery';
import {getMockupNews} from './news-mockup-data.js'


export class NewsLoad {
   constructor() {
      this.$newsContainer = $('#news-list');

      if (!this.$newsContainer) {
         return false
      }

      this.$lastDownloadedPage = 1;
      this.$isLast = false;
      this.$isLoading = false;

      this.init();
   }

   init = () => {
      this.getNews(this.$lastDownloadedPage);

      this.initHandlers();

      $(window).on('scroll', this.onScroll)
   }

   initHandlers = () => {

      this.$newsContainer.closest('.news-section').on('click', '.repeat-btn', this.repeatDownload)

   }

   repeatDownload = (e) => {
      e.preventDefault;

      this.$newsContainer.next('.repeat-btn').remove();

      this.getNews(this.$lastDownloadedPage + 1);

      this.$lastDownloadedPage += 1;
   }

   onScroll = () => {
      if  ($(window).scrollTop() === $(document).height() - $(window).height()) {
         if (!this.$isLast && !this.$isLoading) {
            this.getNews(this.$lastDownloadedPage + 1);

            this.$lastDownloadedPage += 1;
         }

      }

   }

   getNews = async (pageNumber) => {
      this.toggleLoader();

      let newsArray = await this.getNewsPage(pageNumber);

      if (newsArray && newsArray.length > 0) {
         setTimeout(() => {

            let template = this.getNewsTemplate(newsArray);

            this.appendNews(template);

            this.toggleLoader();

         }, 2000)
      } else {
         this.$isLast = true;

         this.toggleLoader();
      }
   }

   appendNews = (template) => {
      this.$newsContainer.append(template)
   }

   toggleLoader = () => {
      if (this.$newsContainer.next('.loader').length > 0) {
         this.$isLoading = false;
         this.$newsContainer.next('.loader').remove();
      } else {
         this.$isLoading = true;
         this.$newsContainer.after('<div class="loader"></div>')
      }
   }

   onError = () => {
      this.$newsContainer.after('<div class="repeat-btn">Повторить загрузку</div>')
   }

   getNewsPage = async (pageNumber) => {
      return getMockupNews(pageNumber);
   }

   getNewsTemplate = (newsArray) => {
      let template = ``;

      for (let i = 0; i < newsArray.length; i++) {
         if (this.$lastDownloadedPage === 1 && i === 0) {
            template += this.getNewsItemTemplate(newsArray[i], true);
         } else {
            template += this.getNewsItemTemplate(newsArray[i], false);
         }
      }

      return template;
   }

   getNewsItemTemplate = (item, isFirst) => {
      const isFirstClassName = isFirst ? ' item-first' : '';

      return `<a href=${item.link}  class="item ${isFirstClassName}">
                    <div class="bg-wrap">
                        <div class="bg" style="background-image: url(${item.image})"></div>
                    </div>

                    <div class="item-info">
                        <div class="text">
                            <div class="title">${item.title}</div>
                            <div class="date">${item.date}</div>
                        </div>
                        <div class="btn">
                            <img src="./img/agc/newsitem-read-more.svg" alt="">
                            <span>Подробнее</span>
                        </div>
                    </div>
                </a>
      `
   }
}
