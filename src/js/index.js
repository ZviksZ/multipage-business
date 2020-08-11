import * as $                                        from 'jquery';
import {CareerForm}                                  from './components/career-form';
import {FooterSearch}                                from './components/footer-search';
import {initMaskedInput, initPlaceholders}           from './components/form'
import {FullscreenScroll}                            from './components/fullscreen-scroll';
import {Header}                                      from './components/header';
import {HeaderMenu}                                  from './components/header-menu';
import {ModalWindowFullScreen}                       from './components/modal-window-fullscreen';
import {PageFilter}                                  from './components/page-filter';
import {InitPartnersPage}                            from "./components/partners";
import {ProductsModal, ProductsSlider, ProductsTabs} from './components/products';
import {NewsLoad}                                    from './components/news';
import {MediaVideo}                                  from './components/media-video';

$(function () {

   // инициализация функционала хедера
   new Header();

   // инициализация функционала главного меню
   new HeaderMenu();

   // инициализация функционала постраничной прокрутки
   new FullscreenScroll()

   // инициализация функционала фильтра на страницах
   new PageFilter()

   // инициализация функционала табов на детальной странице Продукции
   new ProductsTabs()

   // инициализация функционала слайдера на детальной странице Продукции
   new ProductsSlider()

   // инициализация функционала модалки на детальной странице Продукции
   new ProductsModal()

   // инициализация функционала модальных окон
   new ModalWindowFullScreen()

   // инициализация функционала работы инпута в футере
   new FooterSearch()

   // инициализация функционала работы формы на странице Карьера
   new CareerForm()

   // инициализация функционала загрузки новостей
   new NewsLoad()

   // инициализация функционала модального окна с видео
   new MediaVideo()

   // инициализация функционала страницы Партнеры
   new InitPartnersPage()


   // Инициализация плейсхолдеров и масок
   initMaskedInput();
   initPlaceholders();
})


