import * as $  from 'jquery';
import 'juxtaposejs/build/js/juxtapose.min.js';


export class MatelacJuxtapose {
   constructor() {
      this.$elem = $('#juxtapose');

      if (!this.$elem.length) return false

      this.init();
   }

   init = () => {
      let slider = new juxtapose.JXSlider('#juxtapose',
         [
            {
               src: './img/agc/matelac/clear.jpg',
               label: 'Matelac Silver Clear'
            },
            {
               src: './img/agc/matelac/crystal.jpg',
               label: 'Matelac Silver Crystalvision'
            }
         ],
         {
            animate: true,
            showLabels: true,
            showCredits: true,
            startingPosition: "50%",
            makeResponsive: true
         });
   }
}


