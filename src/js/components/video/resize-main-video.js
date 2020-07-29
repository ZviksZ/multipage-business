import * as $ from "jquery";

export default class ResizeMainVideo {
   constructor() {
      this.$block = $('#main-video');

      if (!this.$block) {
         return false;
      }

      this.init();
   }

   init() {
      this.resizeVideo();

      $(window)
         .on('resize', (e) => {
            this.resizeVideo();
         });
   }

   resizeVideo() {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      //масштибирование видео
      if (this.$block.length) {
         var kHW = 0.5625;
         var kWH = 1.9;
         var kWindow = windowHeight / windowWidth;

         var widthVideo;
         var heightVideo;
         if (kWindow < kHW) {
            widthVideo = windowWidth;
            heightVideo = windowWidth * kHW;
         } else {
            widthVideo = windowHeight * kWH;
            heightVideo = windowHeight;
         }

         //console.log(widthVideo)
         this.$block.css({
            "width": widthVideo + "px",
            "height": heightVideo + "px",
            "marginLeft": -widthVideo / 2 + "px",
            "marginTop": -heightVideo / 2 + "px"
         });
      }
   }
}
