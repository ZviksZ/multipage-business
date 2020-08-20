import * as $                    from 'jquery';

export class ProductsModal {
   constructor() {
      this.$modal = $('#products-modal');
      if (!this.$modal.length) return false;

      this.$moreBtn = this.$modal.find('.more-btn');
      this.$addressItems = this.$modal.find('.address-item');

      this.init();
   }

   init = () => {

      this.initHandlers();
      this.getUserGeo()
   }

   initHandlers = () => {
      this.$moreBtn.on('click', this.showFullList);
   }

   getUserGeo = () => {
     /* var startPos;
      var geoSuccess = function(position) {
         startPos = position;

         console.log(startPos.coords)
         let lat = startPos.coords.latitude;
         let long = startPos.coords.longitude;

         let geocoder = new google.maps.Geocoder();

         var latlng = new google.maps.LatLng(+lat, +long);
         console.log(lat)
         console.log(long)

         $.ajax({
            type: 'GET',
            dataType: "json",
            url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyBLlGR7bVSqktIomcOH2UedzgcdzVlccnk",
            data: {},
            success: function(data) {
               console.log(data)
            },
            error: function () { console.log('error'); }
         });


      };
      var geoError = function(position) {
         console.log('Error occurred. Error code: ' + error.code);
      };


      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);*/
   }

   showFullList = (e) => {
      e.preventDefault();

      this.$modal.addClass('show-full-list')
   }

}
