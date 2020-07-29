export default class CustomControls {
   constructor() {
      this.$block = document.getElementById('video');
      this.$playPauseBtn = document.getElementById('playpause');
      this.$fullscreenBtn = document.getElementById('fullscreen');

      if (!this.$block) {
         return false;
      }

      this.togglePlayPause = this.togglePlayPause.bind(this);
      this.goFullscreen = this.goFullscreen.bind(this);

      this.init();
   }

   init() {
      this.$block.controls = false;

      this.initEvents();
   }

   initEvents() {
      this.$playPauseBtn.addEventListener('click', this.togglePlayPause);
      this.$fullscreenBtn.addEventListener('click', this.goFullscreen);
   }

   togglePlayPause() {
      let video = this.$block;
      let playpause = this.$playPauseBtn;

      if (video.paused || video.ended) {
         //playpause.title = "Пауза";
         //playpause.innerHTML = `<i class="icon-right-arrow-1"></i>`;
         video.play();
      } else {
         //playpause.title = "Воспроизвести";
         //playpause.innerHTML = `<i class="icon-right-arrow"></i>`;
         video.pause();
      }
   }

   goFullscreen() {
      let video = this.$block;
      if (video.mozRequestFullScreen) {
         video.mozRequestFullScreen();
      } else if (video.webkitRequestFullScreen) {
         video.webkitRequestFullScreen();
      }
   }
}
