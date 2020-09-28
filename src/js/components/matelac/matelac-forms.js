import * as $                 from 'jquery';
import {initFormWithValidate} from "../form";

export class MatelacForm {
   constructor() {
      this.$forms = $('.modal-window.custom-form .form');

      if (!this.$forms.length) return false;

      this.init();
   }

   init = () => {
      this.initValidation();

      this.initHandlers();
   }

   initHandlers = () => {
      this.$forms.on('submit', this.onSubmit);
   }

   initValidation = () => {
      this.$forms.each(function () {
         initFormWithValidate($(this));
      })
   }

   onSubmit = (e) => {
      e.preventDefault();

      let currentForm = $(e.currentTarget);

      let $formData = {};

      currentForm.find('input, textarea, select').each(function() {
         $formData[this.name] = $(this).val();
      });


      let data = {};

      switch (currentForm.attr('action')) {
         case 'takeSample':
            data = {
               isNaked: 1,
               catalogue: 1,
               sub:  38,
               cc: 46,
               posting: 1,
               f_contact:$formData.feedback_name,
               f_company:$formData.company,
               f_phone:$formData.feedback_phone,
               f_email:$formData.feedback_email,
               f_count:$formData.countSamples,
            }
            break;
         case 'managerForm':
            data = {
               isNaked: 1,
               catalogue: 1,
               sub:  38,
               cc: 44,
               posting: 1,
               f_contact:$formData.feedback_name,
               f_company:$formData.company,
               f_phone:$formData.feedback_phone,
               f_time:$formData.feedback_time,
            }
            break;
         case 'questionForm':
            data = {
               isNaked: 1,
               catalogue: 1,
               sub:  38,
               cc: 48,
               posting: 1,
               f_contact:$formData.feedback_name,
               f_company:$formData.company,
               f_phone:$formData.feedback_phone,
               f_email:$formData.feedback_email,
               f_question:$formData.feedback_text,
            }
            break;
      }


      $.ajax({
         url: '/netcat/add.php',
         type: 'POST',
         dataType: 'text',
         data: data,
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


