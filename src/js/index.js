import * as $                    from 'jquery';
import { Header }                from './components/header';
import { HeaderMenu }            from './components/header-menu';
import { FullscreenScroll }      from './components/fullscreen-scroll';
import { ModalWindowFullScreen } from './components/modal-window-fullscreen';
import { FooterSearch }          from './components/footer-search';
import { PageFilter }          from './components/page-filter';
import { ProductsTabs, ProductsSlider, ProductsModal }          from './components/products';


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
})


