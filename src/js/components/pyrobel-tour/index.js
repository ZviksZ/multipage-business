import * as $                                                from 'jquery';
import {initFormWithValidate, initRangePicker, validateForm} from "../form";

export class PyrobelForm {
   constructor() {
      this.$form = $('#pyrobel-form');

      if (this.$form.length === 0) return false;


      this.init();
   }

   init = () => {
      initFormWithValidate(this.$form);

      this.initHandlers();

   }

   initHandlers = () => {
      this.$form.on('submit', this.onSubmit);
   }

   onSubmit = (e) => {
      e.preventDefault();

      let data = this.$form.serialize();


      $.ajax({
         url: this.$form.attr('action'),
         type: 'POST',
         dataType: 'text',
         data: data,
         success: (res) => {
            this.successForm(this.$form)
         },
         error: (res) => {
            this.errorForm(this.$form)
         },
         timeout: 30000
      });


   }

   successForm = (form) => {
      let hrefLink = form.attr('data-tour');

      location.href = hrefLink;
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
}


