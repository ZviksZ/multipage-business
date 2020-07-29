//import * as $  from 'jquery';

var $ = require('jquery');
window.jQuery = $;
require("@fancyapps/fancybox");

export default class ParkingGallery {
   constructor() {
      this.$bigGallery = $('.parking-gallery-big');
      this.$smallGallery = $('.parking-gallery-small');
      this.init();
   }
   init() {
      //$.fancybox.defaults.thumbs.autoStart = true;

      $('[data-fancybox]').fancybox({
         buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "download",
            "close"
         ],
      });

      this.initOnClickChangeImg()
   }

   initOnClickChangeImg() {
      this.$smallGallery.find('.item').on('click', function (e) {
         e.preventDefault();
         var img = $(this).attr('data-img');

         $(this).closest('.parking-gallery').find('parking-gallery-big')
            .css("background-image", img).attr("href", img)
      })
   }
}
