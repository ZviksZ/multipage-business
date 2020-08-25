import * as $                 from 'jquery';
import {initFormWithValidate} from "../form";

export class ProjectsForm {
   constructor() {
      this.$form = $('#projects-form');
      this.$projectsSection = $('#ro-section');
      if (this.$projectsSection.length === 0) return false;

      this.$glassSelect = this.$form.find('#glass-type');

      this.init();
   }

   init = () => {
      initFormWithValidate(this.$form);

      this.glassData = this.getGlassData();

      this.initGlassSelect();
      this.initHandlers();
   }

   initHandlers = () => {
      this.$form.on('submit', this.onSubmit);
   }

   initGlassSelect = () => {
      for (let i = 0; i < this.glassData.length; i++) {
         let item = this.glassData[i];
         this.$glassSelect.append(`<option value=${item.value}>${item.name}</option>`)
      }
   }

   getGlassData = () => {
      $.ajax({
         url: '/getGlassData',
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

      return [{name: '1', value: '1'}, {name: '2', value: '2'}, {name: '3', value: '3'}]
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


