import * as $         from 'jquery';
import {getMockupNews} from './news-mockup-data.js'


export class NewsLoad {
   constructor() {
      this.$newsContainer = $('#news-list');

      if (this.$newsContainer.length === 0) {
         return false
      }

      this.currentPos = 0;
      this.$isLast = false;
      this.$isLoading = false;

      this.init();
   }

   init = () => {
      this.initHandlers();

      $(window).on('scroll', this.onScroll)
   }

   initHandlers = () => {

      this.$newsContainer.closest('.news-section').on('click', '.repeat-btn', this.repeatDownload)

   }

   repeatDownload = (e) => {
      e.preventDefault;

      this.$newsContainer.next('.repeat-btn').remove();

      this.getNews();
   }

   onScroll = () => {
      if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
         if (!this.$isLast && !this.$isLoading) {
            this.getNews();
         }
      }
   }

   getNews = async () => {
      try {
         this.toggleLoader();
         let newsArray = await this.getNewsPage();
         this.currentPos += 10;

         if (newsArray && newsArray.length > 0) {
            let template = this.getNewsTemplate(newsArray);

            this.appendNews(template);

            this.toggleLoader();
         } else {
            this.$isLast = true;

            this.toggleLoader();
         }
      } catch (e) {
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

   getNewsPage = async () => {
      return fetch(`${location.pathname}?nc_ctpl=22&isNaked=1&curPos=${this.currentPos + 10}`).then(res => res.json()).catch((err) => this.onError())
      //return getMockupNews(pageNumber);
   }

   getNewsTemplate = (newsArray) => {
      let template = ``;

      for (let i = 0; i < newsArray.length; i++) {
         template += this.getNewsItemTemplate(newsArray[i], false);
      }

      return template;
   }

   getNewsItemTemplate = (item, isFirst) => {
      const isFirstClassName = isFirst ? ' item-first' : '';
      const img = item?.image || './img/news/empty-news.jpg';

      return `<a href=${item.link}  class="item ${isFirstClassName}">
                    <div class="bg-wrap">
                        <div class="bg" style="background-image: url(${img})"></div>
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
