import * as $                                                from 'jquery';
import {initFormWithValidate, initRangePicker, validateForm} from "../form";
import {types}                                               from './glass-bus-form-mockup.js'

export class GlassBusForm {
   constructor() {
      this.$form = $('#glass-bus-form');

      if (!this.$form.length) return false;

      this.$formSelectedTypes = $('#select-types-selected');
      this.$formAllTypes = $('#select-types-all');
      this.$unitTypes = $('#glass-unit-types');
      this.$unitItems = $('#glass-unit-items');

      this.$currentStep = '1';
      this.selectedTypes = 0;
      this.allTypes = 0;

      this.init();
   }

   init = () => {
      initFormWithValidate(this.$form);
      this.initDateFields();
      this.initFormTypes();
      this.initHandlers();

   }

   initFormTypes = () => {
      let types = this.getTypesData();

      for (let i = 0; i < types.length; i++) {
         this.$unitTypes.append(this.getTypeTemplate(types[i]));
         this.$unitItems.append(this.getItemTemplate(types[i]));


         let itemsTemplate = ``;
         for (let j = 0; j < types[i].elements.length; j++) {
            itemsTemplate += this.getItemTypeTemplate(types[i].elements[j]);

            this.allTypes += 1
         }
         this.$unitItems.find('[data-type="type-' + types[i].id + '"]').append(itemsTemplate);

      }


      this.$formAllTypes.text(this.allTypes)

   }

   getItemTemplate = (item) => {
      return `
         <div class="item" data-type="type-${item.id}">
             <div class="item-title">${item.type}</div>
          </div>
      `
   }

   getItemTypeTemplate = (item) => {
      return `      
         <div class="type">
              <input type="checkbox" name="${item.name}" id="glass-type-${item.id}">
              <label for="glass-type-${item.id}" class=""><span>${item.title}</span></label>
              <a href=${item.link} class="link" target="_blank">
                  <img src="./img/agc/info-2.svg" alt="">
              </a>
          </div>
      `
   }

   getTypeTemplate = (item) => {
      return `
         <div class="type">
             <input type="checkbox" name="policy" id="type-${item.id}" checked>
             <label for="type-${item.id}" class=""><span>${item.type}</span></label>
         </div>
      `
   }

   getTypesData = () => {
      $.ajax({
         url: '/getGlassTypes',
         type: 'GET',
         dataType: 'text',
         success: (res) => {
            console.log('success')
         },
         error: (res) => {
            console.log('error')
         },
         timeout: 30000
      });

      return types;
   }

   initDateFields = () => {
      const $dateFrom = this.$form.find('#date-from');
      const $dateTo = this.$form.find('#date-to');

      const dateMin = new Date();
      dateMin.setDate(dateMin.getDate());


      initRangePicker($dateFrom, $dateTo, {
         minDate: dateMin
      });


   }

   initHandlers = () => {
      this.$form.on('submit', this.onSubmit);
      this.$form.find('.step-btn').on('click', this.changeStep);
      this.$form.find('[name="isWorker"]').on('click', this.toggleStepFields);
      this.$form.find('.glass-unit-types .type input').on('change', this.glassUnitsTypes);
      this.$form.find('#glass-unit-items input').on('change', this.changeSelectedTypes);
      this.$form.find('#call-me').on('click', () => {
         this.$form.submit();
      });
   }

   changeSelectedTypes = (e) => {
      if ($(e.currentTarget).prop('checked')) {
         this.$formSelectedTypes.text(this.selectedTypes + 1);
         this.selectedTypes += 1;
      } else {
         this.$formSelectedTypes.text(this.selectedTypes - 1);
         this.selectedTypes -= 1;
      }
   }

   changeStep = (e) => {
      e.preventDefault();
      let nextStep;

      if ($(e.currentTarget).attr('data-next')) {
         nextStep = $(e.currentTarget).attr('data-next');

         validateForm(this.$form);
      } else {
         nextStep = $(e.currentTarget).attr('data-prev');
      }

      if (this.$form.find('[data-step="' + this.$currentStep + '"]').find('.field.error').length === 0) {
         this.$form.find('[data-step]').addClass('hide');
         this.$form.find('[data-step="' + nextStep + '"]').removeClass('hide');
         this.$form.find('.field.error').removeClass('error');

         this.$currentStep = nextStep;
      }

   }

   toggleStepFields = (e) => {
      if ($(e.currentTarget).val() === 'true') {
         this.$form.find('.glass-bus-form-worker').addClass('disabled-fields').find('.field').removeClass('error').find('input').removeClass('validate');
      } else {
         this.$form.find('.glass-bus-form-worker').removeClass('disabled-fields').find('.field input').addClass('validate');
      }
   }

   glassUnitsTypes = (e) => {
      let isChecked = $(e.currentTarget).prop('checked');
      let type = $(e.currentTarget).attr('id');

      if (isChecked) {
         this.$form.find('.glass-unit-items .item[data-type="' + type + '"]').removeClass('hide');
      } else {
         this.$form.find('.glass-unit-items .item[data-type="' + type + '"]').addClass('hide');

         let inputs = this.$form.find('.glass-unit-items .item[data-type="' + type + '"] input');
         inputs.each((index, item) => {
            if ($(item).prop('checked')) {
               $(item).prop('checked', false)
               this.$formSelectedTypes.text(this.selectedTypes - 1);
               this.selectedTypes -= 1;
            }
         })
      }

   }

   onSubmit = (e) => {
      e.preventDefault();

      let currentForm = $(e.currentTarget);

      let $formData = {};

      currentForm.find('input, textarea, select').each(function () {
         $formData[this.name] = $(this).val();
      });

      let data = {
         sub: 49,
         cc: 72,
         f_name: $formData.career_name,
         f_phone: $formData.career_phone,
         f_file: $formData.career_file,
         catalogue: 1,
         posting: 1,
      };


      $.ajax({
         url: currentForm.attr('action'),
         type: 'POST',
         dataType: 'text',
         data: $formData,
         success: (res) => {
            this.successForm(currentForm)
         },
         error: (res) => {
            this.errorForm(currentForm)
         },
         timeout: 30000
      });


   }

   successForm = (form) => {
      this.clearForm(form);

      form.find('.message-icon.error').addClass('hide');
      form.find('.message-title').text('Отлично!');
      form.find('.message-subtitle').text('Ваши данные успешно отправлены');

      form.addClass('form-hide');

      setTimeout(() => {
         form.find('.close-btn').click();
      }, 2000)
   }

   errorForm = (form) => {
      form.addClass('form-hide');

      form.find('.message-icon.success').addClass('hide');
      form.find('.message-title').text('Ошибка');
      form.find('.message-subtitle').text('Попробуйте еще раз');

      setTimeout(() => {
         form.removeClass('form-hide');
         form.find('.message-icon.success').removeClass('icon-hide');

      }, 4000)
   }

   clearForm = (form) => {
      form[0].reset();
      form.find('.field').removeClass('success').addClass('empty');
      form.find('.field input').val('');
   }

}


