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
      return fetch(`/news/?nc_ctpl=22&isNaked=1&curPos=${this.currentPos + 10}`).then(res => res.json()).catch((err) => this.onError())
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



/*
export class NewsLoad {
   constructor() {
      this.$newsContainer = $('#news-list');

      if (!this.$newsContainer.length) {
         return false
      }

      this.currentPart = 0;
      this.isDataLoaded = false;
      this.isLast = false;

      this.init();
   }

   init = async () => {
      this.data = await this.getNewsPages();

      if (this.data) {
         this.chunkData = this.chunkArray(this.data, 10);
         this.isDataLoaded = true;
      }

      this.initHandlers();
      $(window).on('scroll', this.onScroll)
   }

   initHandlers = () => {
      this.$newsContainer.closest('.news-section').on('click', '.repeat-btn', this.repeatDownload);
   }

   repeatDownload = async (e) => {
      e.preventDefault;

      this.data = await this.getNewsPages();

      if (this.data) {
         this.chunkData = this.chunkArray(this.data, 10);
         this.isDataLoaded = true;
      }
   }

   onScroll = async () => {
      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
         if (this.currentPart + 1 < this.chunkData.length && this.isDataLoaded) {
            this.getNews();
         } else if (this.currentPart + 1 === this.chunkData.length && this.isDataLoaded && !this.isLast) {
            this.getNews();

            this.isLast = true;
         }
      }
   }

   getNews = () => {
      this.toggleLoader();

      let template = this.getNewsTemplate(this.chunkData[this.currentPart]);
      this.appendNews(template);

      this.currentPart += 1;

      this.toggleLoader();
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
         this.$newsContainer.after('<div class="loader"></div>');
      }
   }

   onError = () => {
      this.$newsContainer.after('<div class="repeat-btn">Повторить загрузку</div>');
   }

   getNewsPages = () => {
      return fetch('/news/?nc_ctpl=22&isNaked=1').then(res => res.json()).catch((err) => this.onError())

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
                            <img src="/img/agc/newsitem-read-more.svg" alt="">
                            <span>Подробнее</span>
                        </div>
                    </div>
                </a>
      `
   }

   chunkArray = (arr, n) => {
      let chunks = [];
      while (arr.length > n) {
         chunks.push(arr.slice(0, n));
         arr = arr.slice(n, arr.length);
      }
      chunks.push(arr);

      return chunks;
   }
}
*/
