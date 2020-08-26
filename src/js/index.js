import * as $                                          from 'jquery';
window.jQuery = require('jquery');

import {CareerForm}                                    from './components/career-form';
import {FooterSearch}                                  from './components/footer-search';
import {initMaskedInput, initPlaceholders}             from './components/form'
import {FullscreenScroll}                              from './components/fullscreen-scroll';
import {GlassBusForm, GlassBusSlider}                  from "./components/glass-bus";
import {Header}                                        from './components/header';
import {HeaderMenu}                                    from './components/header-menu';
import {MatelacJuxtapose, MatelacGallery, MatelacForm} from "./components/matelac";
import {ModalWindowFullScreen}                                       from './components/modal-window-fullscreen';
import {PageFilter}                                                  from './components/page-filter';
import {InitPartnersPage}                                            from "./components/partners";
import {ProductsModal, ProductsSlider, ProductsTabs}                 from './components/products';
import {NewsLoad}                                                    from './components/news';
import {MediaVideo}                                                  from './components/media-video';
import {ProductsSearch}                                              from "./components/products-new";
import {ProjectsForm, ProjectSlider, ProjectsPage, ProjectTopSlider} from "./components/projects";
import {SearchPage}                                                  from "./components/search-page";
import {WidgetTabs}                                                  from "./components/widgets-tabs";


$(function () {

   // инициализация функционала хедера
   new Header();

   // инициализация функционала главного меню
   new HeaderMenu();

   // инициализация функционала постраничной прокрутки
   new FullscreenScroll();

   // инициализация функционала фильтра на страницах
   new PageFilter();

   // инициализация функционала табов на детальной странице Продукции
   new ProductsTabs();

   // инициализация функционала слайдера на детальной странице Продукции
   new ProductsSlider();

   // инициализация функционала модалки на детальной странице Продукции
   new ProductsModal();


   //Обновленные страницы продукции
   new ProductsSearch();

   // инициализация функционала модальных окон
   let modal = new ModalWindowFullScreen();

   // инициализация функционала работы инпута в футере
   new FooterSearch();

   // инициализация функционала работы формы на странице Карьера
   new CareerForm();

   // инициализация функционала загрузки новостей
   new NewsLoad();

   // инициализация функционала модального окна с видео
   new MediaVideo();

   // инициализация функционала страницы Партнеры
   new InitPartnersPage(modal);

   // инициализация функционала страницы Виджеты
   new WidgetTabs();

   // инициализация функционала страницы Поиска по сайту
   new SearchPage();

   //Matelac Crystal Page
   new MatelacJuxtapose();
   new MatelacGallery();
   new MatelacForm();


   //Glass Bus Page
   new GlassBusSlider();
   new GlassBusForm();

   //Страница проектов
   new ProjectTopSlider();
   new ProjectSlider();
   new ProjectsPage(modal);
   new ProjectsForm();


   // Инициализация плейсхолдеров и масок
   initMaskedInput();
   initPlaceholders();


   //плавный скролл к якорю
   /*$('a[href*="#"]').click(function() {
      let $page = $('html, body');

      $page.animate({
         scrollTop: $($.attr(this, 'href')).offset().top - 45
      }, 500);
      return false;
   });*/
})


