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

      this.initHandlers();
   }

   initHandlers = () => {
      this.$form.on('submit', this.onSubmit);
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
         isNaked: 1,
         catalogue: 1,
         sub:  38,
         cc: 47,
         posting: 1,
         f_contact:$formData.feedback_name,
         f_company:$formData.company,
         f_phone:$formData.feedback_phone,
         f_email:$formData.feedback_email,
         f_projectName:$formData.project_name,
         f_glass:$formData.glass,
         f_pererabotka:$formData.pererabotka,
         f_architrctor:$formData.architrctor,
         f_fasadCompany:$formData.fasadCompany,
         f_company2:$formData.company2,
         f_type:$formData.type,
         f_projectDesc:$formData.feedback_text,
      };


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


