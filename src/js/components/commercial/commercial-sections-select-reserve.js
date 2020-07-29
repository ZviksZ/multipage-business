import * as $      from 'jquery';
import {SVG}       from '@svgdotjs/svg.js';
import {declOfNum} from "../helpers";

export default class CommercialSectionsSelect {
   constructor($block) {
      this.$block = $block;
      this.$drawingBlock = $block.find('[data-drawing_block]');
      this.$drawing = $block.find('[data-drawing]');
      this.$tabsBlock = $block.find('[data-drawing_tabs]');
      this.$tabs = $block.find('[data-drawing_tabs] .rc_tab');
      this.$activeTab = this.$tabsBlock.find('[data-drawing_tab].rc_tab-active').attr('data-drawing_tab');

      this.filter = this.$activeTab

      if (!this.$drawing.length) return false;

      this.desktop = null;

      this.items = JSON.parse(this.$drawing.attr('data-items'));

      this.drawingItems = [];

      this.drawingOptions = {
         id: this.$drawing.attr('id'),
         image: this.$drawing.attr('data-image'),
         colorBase: 'rgba(255, 255, 255, 0)',
         colorFill: 'rgba(255, 255, 255, 0.7)',
         strokeBase: {color: '#EF1B34', opacity: 0.5, width: 2},
         strokeFill: {color: '#fff', opacity: 0.7, width: 2},
         width: 2560,
         height: 1155
      }

      this.init();
   }

   init() {
      this.$popupInfo = this.createPopup();
      this.$popupInfoContent = this.$popupInfo.find('.content');

      this.draw = this.drawingInit();
      this.addDrawingItems();
      this.drawingResize();
      this.initTabsChange()

      $(window)
         .on('mousemove', (e) => {
            this.setPopupPosition(e);
         })
         .on('resize', (e) => {

            this.drawingResize();
            this.initEventsHandler();
         });

      // закрытие тултипа
      $('body').on('click', '[data-close-popup-info]', () => {
         this.hidePopup();
         return false;
      });

      // при скроле удаляем кнопку Перемещайте генплан на моб.версии
      this.$drawingBlock.on('scroll', () => {
         if (this.$block.find('.move-button').length) {
            this.$block.find('.move-button').remove();
         }
      });

      this.initEventsHandler();
      this.refreshDrawingItems()
   }

   /**
    * Обработчик событий клика по табам
    */
   initTabsChange() {
      $('body').off('click', '[data-drawing_tabs] .rc_tab');

      $('body').on('click', '[data-drawing_tabs] .rc_tab', (e) => {
         e.preventDefault();

         this.$tabs.removeClass('rc_tab-active');
         e.currentTarget.classList.add('rc_tab-active');

         this.filter = e.currentTarget.dataset['drawing_tab']

         this.refreshDrawingItems()

         /*this.$activeTab = e.currentTarget.dataset['drawing_tab'];
         this.filteredItems = this.items.filter(i => i[this.$activeTab] === true);*/

        /* this.addDrawingItems();
         this.drawingResize();*/
      });
   }
   /**
    * Обработчик событий холста
    * для десктопа и мобильной версии разные события
    */
   initEventsHandler() {
      const desktop = this.isDesktop();
      if (desktop !== this.desktop) this.desktop = desktop;

      this.$block.off('mouseenter', '.item');
      this.$block.off('mouseleave', '.item');
      this.$block.off('click', '.item');

      if (this.desktop) {
         this.$block
            .on('mouseenter', '.item', e => {
               const id = e.currentTarget.dataset['id'];
               this.handlerMouseenter(this.drawingItems[id]);
            })
            .on('mouseleave', '.item', e => {
               const id = e.currentTarget.dataset['id'];
               this.handlerMouseleave(this.drawingItems[id]);
            })
            .on('click', '.item', e => {
               const id = e.currentTarget.dataset['id'];
               this.handlerClick(this.drawingItems[id]);
               return false;
            });

      } else {
         console.log('initMobile');
         this.$block.on('click', '.item', e => {
            const id = e.currentTarget.dataset['id'];
            this.handlerClickMobile(this.drawingItems[id]);
            return false;
         });
      }

      this.drawingItems.forEach((item) => {
         item.off('click');
         item.off('mouseenter');
         item.off('mouseleave');

         if (this.desktop) {
            item
               .on('mouseenter', () => {
                  this.handlerMouseenter(item);
               })
               .on('mouseleave', () => {
                  this.handlerMouseleave(item);
               })
               .on('click', () => {
                  this.handlerClick(item);
               });

         } else {
            console.log('initMobile');
            item.on('click', () => {
               this.handlerClickMobile(item);
               return false;
            });
         }

      })
   }

   drawingInit() {
      const draw = SVG().addTo(`#${this.drawingOptions.id}`);
      draw.viewbox(0, 0, this.drawingOptions.width, this.drawingOptions.height);

      const image = draw.image(this.drawingOptions.image);
      image.size('100%', '100%').move(0, 0);

      return draw;
   }

   drawingResize() {
      const kHW = this.drawingOptions.height / this.drawingOptions.width;
      const kWH = this.drawingOptions.width / this.drawingOptions.height;
      const blockWidth = this.$block.width();
      const blockHeight = this.$block.height();
      const kBlock = blockHeight / blockWidth;

      let widthDrawing = blockWidth;
      let heightDrawing = blockWidth * kHW;

      if (widthDrawing < 1000) {
         heightDrawing = 480;
         widthDrawing = heightDrawing * kWH;
      }

      let scale = widthDrawing / 1920 + 0.2;
      if (scale > 1) scale = 1;
      this.$block.find('.item').css({
         'transform': `translateX(-50%) translateY(-50%) scale(${scale})`
      });

      this.$drawing.css({
         width: `${widthDrawing}px`,
         height: `${heightDrawing}px`,
         marginLeft: `${-widthDrawing / 2}px`,
         marginTop: `${-heightDrawing / 2}px`
      });
   }

   /**
    * Добавлеине навигационных элементов секций
    * @returns {boolean}
    */
   addDrawingItems() {
      for (let i = 0; i < this.items.length; i++) {

         const item = this.items[i];

         if (!item.id) continue;

         this.addItemSVG(item);
         this.addItemBalloon(item);
      }
   }
   /**
    * Скрытие/показ точек, которые соответствуют активному табу
    * @returns {boolean}
    */
   refreshDrawingItems() {
      for (let i = 0; i < this.drawingItems.length; i++) {
         const item = this.drawingItems[i];

         if (!item?.data) continue;

         if (+item.data('items')[this.filter].count > 0) {
            item.show()
            this.$block.find(`.item[data-id=${item.data('id')}]`).show()
         } else {
            item.hide()
            this.$block.find(`.item[data-id=${item.data('id')}]`).hide()
         }
      }
   }

   /**
    * Добавление SVG элемента на холст
    * @param {Object} item - данные о секции
    */
   addItemSVG(item = {}) {
      const {
         id = null,
         name = '',
         nameType = '',
         nameTypeShort = '',
         deadline = '',
         href = '',
         coords = '',
         items = {}
      } = item;

      this.drawingItems[id] = this.draw.polygon(coords);
      this.drawingItems[id].fill(this.drawingOptions.colorBase);
      this.drawingItems[id].stroke(this.drawingOptions.strokeBase);
      this.drawingItems[id].style('cursor', 'pointer');
      this.drawingItems[id].data({
         id,
         href,
         coords,
         name,
         nameType,
         nameTypeShort,
         deadline,
         items
      });
   }

   /**
    * Добавление HTML балуна секции
    * @param {Object} item -  данные о секции
    */
   addItemBalloon(item = {}) {
      const {
         id = null,
         name = '',
         nameType = '',
         nameTypeShort = '',
         deadline = '',
         href = '',
         coords = '',
         position = {},
         items = {}
      } = item;

      const {left, top} = position;
      const style = `left: ${left}%; top: ${top}%;`;

      let itemTemplate = `
            <div class="item" style="${style}" data-id="${id}">
                <div class="content">
                    <div class="text">
                        ${nameTypeShort}
                        <span class="big">${name}</span>
                    </div>
                    <div class="text">
                        ${deadline}
                    </div>
                </div>
            </div>
        `;

      this.$drawing.append(itemTemplate);
   }

   /**
    * Обработчик наведения на объект
    * @param {Object} item - svg.js объект
    */
   handlerMouseenter(item) {
      item.fill(this.drawingOptions.colorFill);
      item.stroke(this.drawingOptions.strokeFill);
      this.setDataPopup(item);
      this.showPopup();
   }

   /**
    * Обработчик ухода курсора с объекта
    * @param {Object} item - svg.js объект
    */
   handlerMouseleave(item) {
      item.fill(this.drawingOptions.colorBase);
      item.stroke(this.drawingOptions.strokeBase);
      this.hidePopup();
   }

   /**
    * Обработчик клика на объект - десктоп
    * @param {Object} item - svg.js объект
    */
   handlerClick(item) {
      window.location.href = item.data('href');
      return false;
   }

   /**
    * Обработчик клика на объект - мобильные устройства
    * @param {Object} item - svg.js объект
    */
   handlerClickMobile(item) {
      console.log(item);
      // открываем попап
      this.setDataPopup(item);
      this.showPopup();
   }

   /**
    * Определение десктопа
    * @returns {boolean}
    */
   isDesktop() {
      return (window.innerWidth > 1000);
   }

   /**
    * Позиционирование тултипа
    * @param {Object} e - объект с параметрами курсора
    */
   setPopupPosition(e) {
      const mouseX = e.clientX + document.body.scrollLeft;
      const mouseY = e.clientY + document.body.scrollTop;

      let top = mouseY + 25;
      let left = mouseX + 15;
      const tooltipHeight = this.$popupInfo.height() + 30;
      const tooltipWidth = this.$popupInfo.width() + 15;

      //условия, чтобы тултип не ушел за вьюпорт
      if ( (mouseY + tooltipHeight) > $(window).height()) {
         top = top - tooltipHeight;
      }

      if ( (mouseX + tooltipWidth) > $(window).width()) {
         left = left - tooltipWidth;
      }

      const style = {
         left: `${left}px`,
         top: `${top}px`
      };

      this.$popupInfo.css(style);
   }

   /**
    * Показ тултипа
    */
   showPopup() {
      this.$popupInfo.addClass('show');
      setTimeout(() => {
         this.$popupInfo.addClass('show-effect');
      }, 5);
   }

   /**
    * Закрытие тултипа
    */
   hidePopup() {
      if (this.desktop) {
         this.$popupInfo.removeClass('show show-effect');
         this.clearPopup();

      } else {
         this.$popupInfo.removeClass('show-effect');
         setTimeout(() => {
            this.$popupInfo.removeClass('show');
            this.clearPopup();
         }, 400);
      }
   }

   /**
    * Создание тултипа
    * @return {HTMLElement} созданный тултип
    */
   createPopup() {
      $('body').append(`
            <div id="popup_info" class="popup-info">
                <div class="content"></div>
            </div>
        `);

      return $('#popup_info');
   }

   /**
    * Добавление данных в тултип
    * @param {Object} item - svg.js объект
    */
   setDataPopup(item = {}) {
      const href = item.data('href');
      const name = item.data('name');
      const nameType = item.data('nameType');
      const deadline = item.data('deadline');
      const apartments = item.data('apartments') || [];
      const items = item.data('items') || {};

      const headHTML = `
            <div class="head">
                <p class="text big">${nameType} ${name}</p>
                <p class="text">${deadline}</p>
                <a href="#" class="close hide-desktop" data-close-popup-info><i class="icon icon-close1"></i></a>
            </div>
        `;

      let apartmentsHTML = '';


      if (this.filter === "sale") {
         let countLabel = declOfNum(+items.sale.count, ['Помещение', 'Помещения', 'Помещений']);
         apartmentsHTML += `
                <div class="item item-sale-rent">
                     <div class="info">
                        <h4 class="title">Продажа</h4>
                        <span class="text medium mr">от ${items.sale.price} млн. ₽</span>
                        <span class="text small">от ${items.sale.area} м<sup>2</sup></span>
                    </div>
                    <div class="count">
                        <span class="text big color-main">${items.sale.count}</span>
                        <span class="text">${countLabel}</span>
                    </div>  
                </div>
            `;
      } else if (this.filter === "rent") {
         let countLabel = declOfNum(+items.rent.count, ['Помещение', 'Помещения', 'Помещений']);
         apartmentsHTML += `
                <div class="item item-sale-rent">
                        <div class="info">
                           <h4 class="title">Аренда</h4>
                           <span class="text medium mr">от ${items.rent.price} млн. ₽</span>
                           <span class="text small">от ${items.rent.area} м<sup>2</sup></span>
                       </div>
                       <div class="count">
                           <span class="text big color-main">${items.rent.count}</span>
                           <span class="text">${countLabel}</span>
                       </div> 
                </div>
            `;
      }

      apartmentsHTML = `<div>${apartmentsHTML}</div>`;

      const buttonHTML = `
            <div class="text-align-center hide-desktop">
                <a href="${href}" class="button inline margin-top margin-bottom-x2 no-margin-horizontal">Продолжить</a>
            </div>
        `;

      const popupHTML = headHTML + apartmentsHTML + buttonHTML;
      this.$popupInfoContent.html(popupHTML);
   }

   /**
    * Очистка HTML тултипа
    */
   clearPopup() {
      this.$popupInfoContent.html('');
   }
}
