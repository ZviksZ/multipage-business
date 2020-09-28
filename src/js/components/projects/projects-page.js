import * as $ from "jquery";
import { projects } from "./mockup-ro-data.js";

export class ProjectsPage {
  constructor(modal) {
    this.$modal = modal;
    this.$container = $("#ro-section");
    if (!this.$container.length) return false;

    this.$tabs = this.$container.find(".ro-tab");
    this.$mapContainer = this.$container.find("#ro_map");
    this.$listContainer = this.$container.find("#ro_list");

    this.currentView = "list";
    this.gmarkersArray = [];

    this.isLast = false;
    this.isLoading = false;
    this.currentPos = 0;

    this.init();
  }

  init = async () => {
    let data = await this.getMapData();

    this.initMap();
    this.initProjectsView(data);
    this.initHandlers();

    $(window).on("scroll", this.onScroll);
  };

  getMapData = () => {
    return fetch(`${location.pathname}?nc_ctpl=36&isNaked=1`)
      .then(res => res.json())
      .catch(err => this.onError());
  };

  getData = () => {
    return fetch(
      `${location.pathname}?nc_ctpl=30&isNaked=1&curPos=${this.currentPos + 4}`
    )
      .then(res => res.json())
      .catch(err => this.onError());
  };

  onScroll = async () => {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
      if (!this.isLast && !this.isLoading) {
        this.addLoader();
        let data = await this.getData();
        if (!data || !data.length) {
          this.isLast = true;
        } else {
          this.currentPos += 4
          this.initProjectsTemplates(data);
        }

        this.removeLoader();
      }
    }
  };

  addLoader = () => {
    this.isLoading = true;
    if (this.$listContainer.find(".loader-wrap").length === 0) {
      this.$listContainer.append(`<div class="loader-wrap"><div class="loader"></div></div>`);
    }
  };
  removeLoader = () => {
    this.isLoading = false;
    if (this.$listContainer.find(".loader-wrap").length > 0) {
      this.$listContainer.find(".loader-wrap").remove();
    }
  };

  initProjectsView = data => {
    //let template = ``;

    let pinImage = new google.maps.MarkerImage(
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|E31A52",
      new google.maps.Size(30, 45),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34)
    );

    for (let i = 0; i < data.length; i++) {
      let project = data[i];

      //template += this.getProjectTemplate(project);

      let marker = new google.maps.Marker({
        position: {
          lat: +project.latitude,
          lng: +project.longitude
        },
        map: this.$map,
        title: project.name,
        icon: pinImage
      });

      this.gmarkersArray = [...this.gmarkersArray, marker];

      marker.addListener("click", () => {
        let template = this.getModalTemplate(project);
        this.$modal.open("projects-modal", "open-modal-fade-effect");
        $("#projects-modal")
          .find(".modal-info")
          .html(template);
      });
    }
    //this.$listContainer.append(template);
  };

  initProjectsTemplates = data => {
    let template = ``;
    for (let i = 0; i < data.length; i++) {
      template += this.getProjectTemplate(data[i]);
    }

    this.$listContainer.append(template);
  };

  initMap = () => {
    this.$map = new google.maps.Map(document.getElementById("ro_map"), {
      center: { lat: 52.7122603, lng: 47.2996401 },
      zoom: 4,
      zoomControl: true,

      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,

      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5"
            }
          ]
        },
        {
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#f5f5f5"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.country",
          stylers: [
            {
              color: "#ebebeb"
            },
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#bdbdbd"
            }
          ]
        },
        {
          featureType: "administrative.locality",
          stylers: [
            {
              color: "#ebebeb"
            }
          ]
        },
        {
          featureType: "administrative.locality",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ebebeb"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.province",
          stylers: [
            {
              color: "#ebebeb"
            },
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "geometry",
          stylers: [
            {
              color: "#ebebeb"
            },
            {
              visibility: "off"
            },
            {
              weight: 1
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ebebeb"
            },
            {
              visibility: "off"
            },
            {
              weight: 1
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "landscape",
          stylers: [
            {
              color: "#302e2f"
            }
          ]
        },
        {
          featureType: "poi",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#eeeeee"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "poi.park",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#e5e5e5"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#ebebeb"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#dadada"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        },
        {
          featureType: "transit",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [
            {
              color: "#e5e5e5"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#eeeeee"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#151515"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#151515"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#151515"
            }
          ]
        }
      ]
    });
  };

  initHandlers = () => {
    this.$tabs.on("click", this.changeView);
  };

  changeView = e => {
    e.preventDefault();

    if ($(e.currentTarget).attr("data-tab") === "list") {
      this.$mapContainer.addClass("hide");
      this.$listContainer.removeClass("hide");

      this.$currentView = "list";
    } else {
      this.$mapContainer.removeClass("hide");
      this.$listContainer.addClass("hide");

      this.$currentView = "map";
    }

    this.$tabs.removeClass("active");
    $(e.currentTarget).addClass("active");
  };

  getProjectTemplate = project => {
    let glasses = this.getProjectGlasses(project.glasses);
    return `
         <a href=${project.link} class="item">
             <div class="bg" style="background-image: url(${project.image})"></div>
             <div class="overlay"></div>
             <div class="content">
                 <div class="title">
                     ${project.name}
                 </div>
                 <div class="tags">
                     <span>${project.type}</span>
                 </div>
                 <div class="desc">
                    <div>Адрес: ${project.address}</div>
                    <div>Архитектор: ${project.architect}</div>   
                 </div>
                 <object type="owo/uwu">
                     <div class="glasses">
                         <span class="text">Стекло:</span>
                         ${glasses}
                     </div>
                 </object>

                 <div class="detail-link">
                     Подробнее
                     <img src="./img/agc/newsitem-read-more.svg" alt="">
                 </div>
             </div>
         </a>      
      `;
  };
  getProjectGlasses = glasses => {
    let glassesTemplate = ``;
    glasses.map(item => {
      glassesTemplate += `<a href=${item.link}>${item.name}</a>`;
    });
    return glassesTemplate;
  };
  getModalTemplate = project => {
    return `
         <div class="project-info" style="background-image: url(${project.image})">
                <div class="overlay"></div>
                <div class="project-content">
                   <div class="title">${project.name}</div>
                   <div class="type">${project.type}</div>
                   <div class="address">
                      <div>Адрес проекта:</div>
                      ${project.address}
                   </div>
                   
                </div>
                <a href=${project.link} class="detail-link">
                        Подробнее
                        <img src="./img/agc/newsitem-read-more.svg" alt="">                   
                    </a>
         
         </div>      
      `;
  };
}
