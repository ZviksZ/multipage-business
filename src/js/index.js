import * as $  from 'jquery';
import { Header } from './components/header';
import { HeaderMenu } from './components/header-menu';
import { FullscreenScroll } from './components/fullscreen-scroll';
import { ModalWindowFullScreen } from './components/modal-window-fullscreen';


$(function () {
   // инициализация функционала хедера
   new Header();

   // инициализация функционала главного меню
   new HeaderMenu();

   // инициализация функционала постраничной прокрутки
   new FullscreenScroll()

   // инициализация функционала модальных окон
   new ModalWindowFullScreen()
})


