import * as $                 from 'jquery';
import {initFormWithValidate} from "../form";

export class MatelacForm {
   constructor() {
      this.$forms = $('.matelac-modal .form');

      if (!this.$forms.length) return false;

      this.init();
   }

   init = () => {
      this.initValidation();

      this.$forms.on('submit', this.onSubmit);
   }

   initValidation = () => {
      this.$forms.each(function () {
         initFormWithValidate($(this));
      })
   }

   onSubmit = (e) => {
      e.preventDefault();

      let $formData = {};

      $(this).find('input, textarea, select').each(function() {
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
         url: this.$form.attr('action'),
         type: 'POST',
         dataType: 'text',
         data: data,
         success: (res) => {
            this.successForm()
         },
         error: (res) => {
            this.errorForm()
         },
         timeout: 30000
      });
   }

   successForm = () => {
      this.clearForm();

      this.$formMessage.find('.message-icon.error').addClass('hide');
      this.$formMessage.find('.message-title').text('Отлично!');
      this.$formMessage.find('.message-subtitle').text('Ваши данные успешно отправлены');


      this.$form.addClass('form-hide');


   }

   errorForm = () => {
      this.$form.addClass('form-hide');

      this.$formMessage.find('.message-icon.success').addClass('hide');
      this.$formMessage.find('.message-title').text('Ошибка');
      this.$formMessage.find('.message-subtitle').text('Попробуйте еще раз');

      setTimeout(() => {
         this.$form.removeClass('form-hide');
         this.$formMessage.find('.message-icon.success').removeClass('icon-hide');

      }, 4000)
   }

   clearForm = () => {
      this.$form[0].reset();
      this.$form.find('.field').removeClass('success').addClass('empty');
   }

}


