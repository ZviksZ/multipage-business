import * as $                 from 'jquery';
import {initFormWithValidate} from "../form";

export class GlassBusForm {
   constructor() {
      this.$form = $('#glass-bus-form');

      if (!this.$form.length) return false;


      this.init();
   }

   init = () => {
      initFormWithValidate(this.$form);

      this.initHandlers();
   }

   initHandlers = () => {
      this.$form.on('submit', this.onSubmit);


      console.log(this.$form.find('.step-btn').length)
      this.$form.find('.step-btn').on('click', this.changeStep)
      this.$form.find('[name="isWorker"]').on('click', this.toggleStepFields)
   }

   changeStep = (e) => {
      e.preventDefault();
      let nextStep;


      this.$form.find('[data-step]').addClass('hide');

      if ($(e.currentTarget).attr('data-next')) {
         nextStep = $(e.currentTarget).attr('data-next');
      } else {
         nextStep = $(e.currentTarget).attr('data-prev');
      }

      this.$form.find('[data-step="' + nextStep + '"]').removeClass('hide')
   }

   toggleStepFields = (e) => {
      if ($(e.currentTarget).val() === 'true') {
         this.$form.find('.glass-bus-form-worker').addClass('disabled-fields').find('.field input').removeClass('validate');
      } else {
         this.$form.find('.glass-bus-form-worker').removeClass('disabled-fields').find('.field input').addClass('validate');
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


