import * as $                                                from 'jquery';
import {initFormWithValidate, initRangePicker, validateForm} from "../form";

export class GlassBusForm {
   constructor() {
      this.$form = $('#glass-bus-form');

      if (!this.$form.length) return false;

      this.$currentStep = '1';

      this.init();
   }

   init = () => {
      initFormWithValidate(this.$form);
      this.initDateFields();

      this.initHandlers();
   }

   initDateFields = () => {
      const $dateFrom = this.$form.find('#date-from');
      const $dateTo = this.$form.find('#date-to');

      const dateMin = new Date();
      dateMin.setDate(dateMin.getDate() + 3);


      initRangePicker($dateFrom, $dateTo, {
         minDate: dateMin
      });


   }

   initHandlers = () => {
      this.$form.on('submit', this.onSubmit);
      this.$form.find('.step-btn').on('click', this.changeStep);
      this.$form.find('[name="isWorker"]').on('click', this.toggleStepFields);
      this.$form.find('.glass-unit-types .type input').on('change', this.glassUnitsTypes);
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
         this.$form.find('.glass-unit-items .item[data-type="' + type +'"]').removeClass('hide');
      } else {
         this.$form.find('.glass-unit-items .item[data-type="' + type +'"]').addClass('hide');
      }

   }

   onSubmit = (e) => {
      e.preventDefault();

      let currentForm = $(e.currentTarget);

      let $formData = {};

      currentForm.find('input, textarea, select').each(function() {
         $formData[this.name] = $(this).val();
      });

      console.log($formData)

      let data = {
         sub:49,
         cc:72,
         f_name:$formData.career_name,
         f_phone:$formData.career_phone,
         f_file:$formData.career_file,
         catalogue:1,
         posting:1,
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


