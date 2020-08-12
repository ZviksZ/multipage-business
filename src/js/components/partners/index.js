import * as $                           from 'jquery';
import {partners}                       from "./mockup-data.js";

export class InitPartnersPage {
   constructor(modal) {
      this.$modal = modal;
      this.$container = $('#partners');
      this.$typesList = $('#partners-types_list');
      this.$mapContainer = $('#partners-map');
      this.$companiesContainer = $('#partners-companies');
      this.$companiesContainerList = this.$companiesContainer.find('.partners-companies_list');
      this.$companiesContainerDesc = this.$companiesContainer.find('.partners-companies_desc');
      this.$tabs = this.$container.find('.partners-tab');


      this.$data = {};
      this.$gmarkersArray = [];
      this.$firstChange = false;

      this.$currentType = 'all';
      this.$currentView = 'map';

      if (!this.$container.length) {
         return false
      }

      this.init();
   }

   init = async () => {
      this.$data = await this.getData();

      this.initMap();
      this.initStartView(this.$data);
      this.initHandlers();
   }

   initMap = () => {
      this.$map = new google.maps.Map(document.getElementById('partners-map'), {
         center: {lat: 52.7122603, lng: 47.2996401},
         zoom: 4,
         zoomControl: true,

         mapTypeControl: false,
         scaleControl: false,
         streetViewControl: false,
         rotateControl: false,
         fullscreenControl: false,

         styles: [
            {
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#f5f5f5"
                  }
               ]
            },
            {
               "elementType": "labels",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "elementType": "labels.icon",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "elementType": "labels.text.fill",
               "stylers": [
                  {
                     "color": "#616161"
                  }
               ]
            },
            {
               "elementType": "labels.text.stroke",
               "stylers": [
                  {
                     "color": "#f5f5f5"
                  }
               ]
            },
            {
               "featureType": "administrative",
               "elementType": "geometry",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "featureType": "administrative.country",
               "stylers": [
                  {
                     "color": "#536aa6"
                  },
                  {
                     "visibility": "on"
                  }
               ]
            },
            {
               "featureType": "administrative.country",
               "elementType": "labels",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "featureType": "administrative.land_parcel",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "featureType": "administrative.land_parcel",
               "elementType": "labels.text.fill",
               "stylers": [
                  {
                     "color": "#bdbdbd"
                  }
               ]
            },
            {
               "featureType": "administrative.locality",
               "stylers": [
                  {
                     "color": "#536aa6"
                  }
               ]
            },
            {
               "featureType": "administrative.locality",
               "elementType": "geometry.fill",
               "stylers": [
                  {
                     "color": "#536aa6"
                  }
               ]
            },
            {
               "featureType": "administrative.neighborhood",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "featureType": "administrative.province",
               "stylers": [
                  {
                     "color": "#536aa6"
                  }
               ]
            },
            {
               "featureType": "administrative.province",
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#536aa6"
                  },
                  {
                     "weight": 1
                  }
               ]
            },
            {
               "featureType": "administrative.province",
               "elementType": "geometry.fill",
               "stylers": [
                  {
                     "color": "#536aa6"
                  },
                  {
                     "visibility": "on"
                  },
                  {
                     "weight": 1
                  }
               ]
            },
            {
               "featureType": "administrative.province",
               "elementType": "geometry.stroke",
               "stylers": [
                  {
                     "visibility": "on"
                  }
               ]
            },
            {
               "featureType": "landscape",
               "stylers": [
                  {
                     "color": "#e2e7f6"
                  }
               ]
            },
            {
               "featureType": "poi",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "featureType": "poi",
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#eeeeee"
                  }
               ]
            },
            {
               "featureType": "poi",
               "elementType": "labels.text.fill",
               "stylers": [
                  {
                     "color": "#757575"
                  }
               ]
            },
            {
               "featureType": "poi.park",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "featureType": "poi.park",
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#e5e5e5"
                  }
               ]
            },
            {
               "featureType": "poi.park",
               "elementType": "labels.text.fill",
               "stylers": [
                  {
                     "color": "#9e9e9e"
                  }
               ]
            },
            {
               "featureType": "road",
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#ffffff"
                  }
               ]
            },
            {
               "featureType": "road",
               "elementType": "labels.icon",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "featureType": "road.arterial",
               "elementType": "labels.text.fill",
               "stylers": [
                  {
                     "color": "#757575"
                  }
               ]
            },
            {
               "featureType": "road.highway",
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#dadada"
                  }
               ]
            },
            {
               "featureType": "road.highway",
               "elementType": "labels.text.fill",
               "stylers": [
                  {
                     "color": "#616161"
                  }
               ]
            },
            {
               "featureType": "road.local",
               "elementType": "labels.text.fill",
               "stylers": [
                  {
                     "color": "#9e9e9e"
                  }
               ]
            },
            {
               "featureType": "transit",
               "stylers": [
                  {
                     "visibility": "off"
                  }
               ]
            },
            {
               "featureType": "transit.line",
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#e5e5e5"
                  }
               ]
            },
            {
               "featureType": "transit.station",
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#eeeeee"
                  }
               ]
            },
            {
               "featureType": "water",
               "elementType": "geometry",
               "stylers": [
                  {
                     "color": "#c9c9c9"
                  }
               ]
            },
            {
               "featureType": "water",
               "elementType": "geometry.fill",
               "stylers": [
                  {
                     "color": "#feffff"
                  }
               ]
            },
            {
               "featureType": "water",
               "elementType": "labels.text.fill",
               "stylers": [
                  {
                     "color": "#9e9e9e"
                  }
               ]
            }
         ]
      });
   }


   initStartView = (data) => {
      for (let key in data) {
         let id = data[key].id;
         let title = data[key].title;

         this.$typesList.append(this.getTypeTemplate(id,title));

         for (let j = 0; j < data[key].partners.length; j++) {
            let partner = data[key].partners[j];

            let marker = new google.maps.Marker({
               position:
                  {
                     lat: +partner.latitude,
                     lng: +partner.longitude
                  },
               map: this.$map,
               category: id,
               title: partner.title
            });

            this.$gmarkersArray = [...this.$gmarkersArray, marker]



            marker.addListener('click', () => {
               let template = this.getPartnerDetailTemplate(partner);


               this.$modal.open('partners-modal', 'open-modal-fade-effect');


               $('#partners-modal').find('.modal-info').html(template);
            });

         }
      }

      this.$typesList.find('a[data-id="all"]').addClass('active');
      this.$container.find('.partners-tab[data-tab="map"]').addClass('active');
   }

   getData = () => {
      return partners.groups;
   }

   initHandlers = () => {
      this.$tabs.on('click', this.changeView);

      this.$container.on('click', '#partners-types_list a', this.changeType)
      this.$container.on('click', '.partners-type_list a', this.getCompanyDesc)
   }

   getCompanyDesc = (e) => {
      e.preventDefault();

      $('.partners-type_list a').removeClass('active');

      let id = $(e.currentTarget).attr('data-id');

      let item = this.$data[this.$currentType].partners.find(i => i.id === id);
      let template = this.getPartnerDetailTemplate(item);

      $(e.currentTarget).addClass('active');

      this.$companiesContainerDesc.html(template);

      if (window.innerWidth < 1000) {
         $('html, body').animate({
            scrollTop: this.$companiesContainerDesc.offset().top
         }, 50);
      }
   }

   changeView = (e) => {
      e.preventDefault();

      if ($(e.currentTarget).attr('data-tab') === 'list') {
         if (!this.$firstChange) {
            this.setCompaniesList();

            this.$firstChange = true;
         }
         this.$mapContainer.addClass('hide');
         this.$companiesContainer.removeClass('hide');

         this.$currentView = 'list';
      } else {
         this.$mapContainer.removeClass('hide');
         this.$companiesContainer.addClass('hide');

         this.partnersMapFilter(this.$currentType);

         this.$currentView = 'map';
      }

      this.$tabs.removeClass('active');
      $(e.currentTarget).addClass('active');
   }

   changeType = (e) => {
      e.preventDefault();

      this.$currentType = $(e.currentTarget).attr('data-id');

      this.setCompaniesList();

      if (this.$currentView === 'map') {
         this.partnersMapFilter(this.$currentType);
      }

      this.setActiveType();

      this.$companiesContainerDesc.html('');
   }

   setActiveType = () => {
      this.$container.find('#partners-types_list a').removeClass('active');
      this.$container.find('#partners-types_list a[data-id="' + this.$currentType +'"]').addClass('active');
   }

   partnersMapFilter = (category) => {
      var bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < this.$gmarkersArray.length; i++) {

         let marker = this.$gmarkersArray[i];

         if (marker.category == category || category == 'all') {
            marker.setVisible(true);
            bounds.extend(marker.getPosition());
         } else {
            marker.setVisible(false);
         }
         this.$map.fitBounds(bounds);
      }
   }

   setCompaniesList = () => {
      let template = this.getCompaniesTemplate()

      this.$companiesContainerList.html(template)
   }

   getCompaniesTemplate = () => {
      let partnersList = ``;
      let partnersTitle = ``;

      for (let key in this.$data) {
         if (key === this.$currentType) {
            partnersTitle = this.$data[key].title;

            for (let j = 0; j < this.$data[key].partners.length; j++) {
               partnersList += this.getPartnerTemplate(this.$data[key].partners[j].id, this.$data[key].partners[j].title);
            }
         }
      }

      return `<div class="partners-type_title">${partnersTitle}</div>
            <div class="partners-type_list" data-type="${this.$currentType}">
                ${partnersList}            
            </div> `;
   }

   getTypeTemplate = (id, title) => {
      return `<a href="" class="partners-types_item" data-id=${id}>${title}</a>`;
   }

   getPartnerTemplate = (id, title) => {
      return `<a data-id=${id}>${title}</a>`;
   }

   getPartnerDetailTemplate = (partnerItem) => {
      let img = partnerItem?.image || null;
      let title = partnerItem?.title || null;
      let description = partnerItem?.description || null;
      let officeFirst = partnerItem?.address && partnerItem?.address.split(';')[0] || null;
      let officeSecond = partnerItem?.address && partnerItem?.address.split(';')[1] || null;
      let phoneFirst = partnerItem?.phone && partnerItem?.phone.split(';')[0] || null;
      let phoneSecond = partnerItem?.phone && partnerItem?.phone.split(';')[1] || null;
      let email = partnerItem?.email || null;
      let link = partnerItem?.link || null;

      return `
        <div class="partners-company_detail">
         <img class=${!img ? 'hide' : ''} alt="${title} Logo" src="${img}" />
           <h3 class=${!title ? 'title hide' : 'title'}>${title}</h3>
           <span class=${!description ? 'hide' : ''}>${description}</span>
           <div class="company-contacts">
               <span class=${!officeFirst ? 'hide' : ''}>
               Офис: ${officeFirst}
               </span>
               <span class=${!officeSecond ? 'hide' : ''}>
               Офис: ${officeSecond}
               </span>

               <span class=${!phoneFirst ? 'hide' : ''}>
               Телефон: <a href="tel:${phoneFirst}" target="_blank">
               ${phoneFirst}
           </a>
               </span>
               <span class=${!phoneSecond ? 'hide' : ''}>
               Телефон: <a href="tel:${phoneSecond}" target="_blank">
               ${phoneSecond}
           </a>
               </span>
               <span class=${!email ? 'hide' : ''}>
               Email: <a href="mailto:${email}" target="_blank">${email}</a>
               </span>
               <span class=${!link ? 'hide' : ''}>
               Сайт: <a href="http://${link}" target="_blank">${link}</a>
               </span>
           </div>
         </div>
        
      
      `;
   }

}
