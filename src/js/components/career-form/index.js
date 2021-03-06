import * as $                    from 'jquery';
import {initFormWithValidate} from "../form";

export class CareerForm {
   constructor() {
      this.$form = $('#career_form');

      if (!this.$form) {
         return false
      }

      this.$fileBtn = this.$form.find('.career_file');
      this.$fileInput = this.$form.find('#career_file-input');
      this.$formMessage = this.$form.find('.form-message');

      this.init();
   }

   init = () => {
      initFormWithValidate(this.$form);

      this.initHandlers();
   }

   initHandlers = () => {
      this.$form.on('submit', this.onSubmit)
      this.$fileBtn.on('click', this.downloadFile);
      this.$fileInput.on('change', this.fileInputChange)
   }

   downloadFile = () => {
      this.$fileInput.click();
   }

   fileInputChange = (e) => {
      let file = e.target.value;

      let fileName = file.split("\\");

      this.$fileBtn.text(fileName[fileName.length - 1]);
   }

   onSubmit = async (e) => {
      e.preventDefault();

     /* let $formData = {};

      this.$form.find('input, textarea, select').each(function() {
         $formData[this.name] = $(this).val();
      });



      /!*let data = {
         isNaked: 1,
         f_name:$formData.career_name,
         f_phone: $formData.career_phone,
         f_rezume:  new FormData(file),
         catalogue: 1,
         cc: 44,
         sub: 38,
         posting: 1
      }*!/
      let form = $(e.currentTarget)*/


      let form = document.getElementById('career_form')
      let file = document.getElementById('career_file-input').files[0];
      let formData = new FormData(form);
      formData.append( 'f_rezume', file );

      try {
         await fetch('/netcat/add.php', {
            method: 'POST',
            body: formData
         });

         this.successForm()
      } catch (e) {
         this.errorForm()
      }



      this.successForm()

    /*  $.ajax({
         url: '/netcat/add.php',
         type: 'POST',
         data: formData,
         success: (res) => {
            this.successForm()
         },
         error: (res) => {
            this.errorForm()
         },
         timeout: 30000
      });*/
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
