import * as $         from 'jquery';
import {getMockupNews} from './news-mockup-data.js'


export class NewsLoad {
   constructor() {
      this.$newsContainer = $('#news-list');

      if (!this.$newsContainer) {
         return false
      }

      this.$lastDownloadedPage = 1;

      this.init();
   }

   init = () => {
      this.getNews(this.$lastDownloadedPage);

      $(window).on('scroll', this.onScroll)
   }

   onScroll = () => {
      if  ($(window).scrollTop() == $(document).height() - $(window).height() - 200) {
         this.getNews(this.$lastDownloadedPage + 1);
      }

   }

   getNews = async (pageNumber) => {
      this.toggleLoader();


      let newsArray = await this.getNewsPage(pageNumber);
      let template = this.getNewsTemplate(newsArray);

      this.appendNews(template);

      this.toggleLoader();
   }



   appendNews = (template) => {
      this.$newsContainer.append(template)
   }

   toggleLoader = () => {
      if (this.$newsContainer.find('loader').length > 0) {
         this.$newsContainer.find('loader').remove();
      } else {
         this.$newsContainer.append('<div class="loader"></div>')
      }
   }

   getNewsPage = async (pageNumber) => {
      let data = [];
      setTimeout(() => {
         data = getMockupNews(pageNumber);
      }, 3000)

      return data;
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

      return `      
         <a href=${item.link}  class="item ${isFirstClassName}">
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
