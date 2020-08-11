import * as $                    from 'jquery';


export class MediaVideo {
   constructor() {
      this.$videoLink = $('.media-list .item-with-video .bg-wrap');
      this.$modal = $('#media-video-modal');

      if (!this.$videoLink.length) {
         return false
      }

      this.init();
   }

   init = () => {
      this.initHandlers();
   }

   initHandlers = () => {
      this.$videoLink.on('click', this.openModal)
      this.$modal.find('.close').on('click', this.closeModal)
   }

   openModal = (e) => {
      e.preventDefault();

      let videoId = $(e.currentTarget).attr('data-video');

      let videoTemplate = '<div class="thumb-wrap"><iframe width="560" height="315" src="https://www.youtube.com/embed/'+ videoId + '" frameborder="0" allowfullscreen></iframe></div>';

      this.$modal.find('.modal-content').html(videoTemplate);
   }

   closeModal = (e) => {
      this.$modal.find('.modal-content').html('');
   }


}
