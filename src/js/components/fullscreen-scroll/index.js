import * as $ from "jquery";
const ProgressBar = require("progressbar.js");

export class FullscreenScroll {
  constructor() {
    this.container = document.querySelector(".fullscreen-page");
    this.downBtn = document.querySelector("#screen-down-btn");
    this.$header = document.getElementById("header");

    if (!this.container) return;

    this.desktop = this.isDesktop();

    this.viewportHeight = window.innerHeight;
    this.translateY = 0;
    this.wrapperHeight = this.container.offsetHeight - window.innerHeight;
    this.lastBlockHeight = 0;

    this.currentSection = 1;
    this.stopScrolling = false;

    if (!this.desktop) {
      this.animateBlockMobile();
    }

    this.minScrollWheelInterval = 100;
    this.lastScrollWheelTimestamp = 0;
    this.lastScrollWheelDelta = 0;
    this.animating = false;

    this.init();
  }

  init = () => {
    this.initialize();

    this.initHandlers();

    window.addEventListener("resize", this.resize);
  };

  isDesktop = () => {
    return window.innerWidth >= 1000 ? true : false;
  };

  initHandlers = () => {
    let desktop = this.isDesktop();
    $(window).off("wheel", this.handleScroll);
    /*window.onmousewheel = null;
      window.removeEventListener('DOMMouseScroll', this.handleScroll);*/
    this.downBtn.removeEventListener("click", this.initFirstSectionDownBtn);

    if (desktop) {
      $(window).on("wheel", this.handleScroll);
      /*window.onmousewheel = this.handleScroll;
         window.addEventListener('DOMMouseScroll', this.handleScroll);*/
      this.downBtn.addEventListener("click", this.initFirstSectionDownBtn);
    }
  };

  initialize = () => {
    document
      .querySelectorAll(".fullscreen-page .section")
      .forEach((item, index) => {
        let newIndex = +index + 1;
        item.id = "fullscreen-section_" + newIndex;

        if (item.offsetHeight < this.viewportHeight) {
          this.lastBlockHeight += item.offsetHeight;
        }
      });
  };

  resize = () => {
    let desktop = this.isDesktop();

    this.viewportHeight = window.innerHeight;
    this.translateY = 0;
    this.wrapperHeight = this.container.offsetHeight - window.innerHeight;
    this.lastBlockHeight = 0;
    this.currentSection = 1;
    window.scrollY = 0;

    document.querySelectorAll(".fullscreen-page .section").forEach(item => {
      if (item.offsetHeight < this.viewportHeight) {
        this.lastBlockHeight += item.offsetHeight;
      }
    });
    this.animate(this.translateY);

    if (this.desktop !== desktop) {
      this.initHandlers();

      if (!this.desktop) {
        this.animateBlockMobile();
      }

      this.desktop = desktop;
    }
  };

  handleScroll = e => {
    const now = Date.now();
    const rapidSuccession =
      now - this.lastScrollWheelTimestamp < this.minScrollWheelInterval;
    const otherDirection = this.lastScrollWheelDelta > 0 !== e.deltaY > 0;
    const speedDecrease =
      Math.abs(e.deltaY) < Math.abs(this.lastScrollWheelDelta);

    const isHuman = otherDirection || !rapidSuccession || !speedDecrease;

    if (isHuman && !this.animating) {
      this.animating = true;
      const delta =
        e.wheelDelta ||
        -e.detail ||
        e.originalEvent.wheelDelta ||
        -e.originalEvent.detail ||
        -(e.originalEvent.deltaY * 25) ||
        null;
      const down = delta < 0;

      down ? this.next() : this.prev();
    }
    this.lastScrollWheelTimestamp = now;
    this.lastScrollWheelDelta = e.deltaY;
  };

  next = () => {
    this.currentSection += 1;
    this.animate(this.translateY - this.viewportHeight);
  };

  prev = () => {
    let y = this.translateY;

    this.currentSection -= 1;
    if (this.lastBlock) {
      y += this.lastBlockHeight;
    } else {
      y += this.viewportHeight;
    }

    if (this.translateY === 0) {
      y = 0;
    }

    this.animate(y);
  };

  animate = translateY => {
    if (translateY > 0) {
      return false;
    }

    if (translateY < -this.wrapperHeight) {
      translateY = -this.wrapperHeight;
      this.lastBlock = true;
    } else {
      this.lastBlock = false;
    }

    this.translateY = translateY;

    this.transform(this.translateY);
    this.changeHeaderOnScroll(this.translateY);
    this.animateBlockOnScroll();
  };

  transform = translateY => {
    this.container.style.transform = "translateY(" + translateY + "px)";

    setTimeout(() => {
      this.animating = false;
    }, 600);
  };

  changeHeaderOnScroll = translateY => {
    if (translateY < 0) {
      this.$header.classList.add("compact");
    } else {
      this.$header.classList.remove("compact");
    }
  };

  initFirstSectionDownBtn = e => {
    this.animate(-this.viewportHeight);
  };

  animateBlockOnScroll = () => {
    const $block = document.getElementById(
      "fullscreen-section_" + this.currentSection
    );
    const $blockId = "#fullscreen-section_" + this.currentSection;
    if ($block) {
      const animate = $block.dataset.animate;
      if (animate) {
        $block.querySelectorAll(".circle-item").forEach(function(item) {
          let bar = new ProgressBar.Circle(item, {
            strokeWidth: 2,
            easing: "easeInOut",
            duration: 1400,
            color: "#ba1946",
            trailColor: "rgba(255,255,255,0.3)",
            trailWidth: 2,
            svgStyle: null
          });

          bar.animate(1.0);

          item.querySelectorAll(".counter").forEach(function(counter) {
            counter.classList.add("circle-active");
          });
        });

        if ($block.querySelectorAll(".counter").length) {
          $($blockId)
            .find(".circle-active")
            .each(function() {
              $(this)
                .prop("Counter", 0)
                .animate(
                  {
                    Counter: $(this).text()
                  },
                  {
                    duration: 1500,
                    easing: "swing",
                    step: function(now) {
                      $(this).text(Math.ceil(now));
                    }
                  }
                );
            });
        }

        $block.removeAttribute("data-animate");
      }
    }
  };

  animateBlockMobile = () => {
    this.container.querySelectorAll(".circle-item").forEach(function(item) {
      let bar = new ProgressBar.Circle(item, {
        strokeWidth: 2,
        easing: "easeInOut",
        duration: 1400,
        color: "#ba1946",
        trailColor: "rgba(255,255,255,0.3)",
        trailWidth: 2,
        svgStyle: null
      });

      bar.animate(1.0);

      item.querySelectorAll(".counter").forEach(function(counter) {
        counter.classList.add("circle-active");
      });
    });

    if (this.container.querySelectorAll(".counter").length) {
      $(".circle-active").each(function() {
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text()
            },
            {
              duration: 1500,
              easing: "swing",
              step: function(now) {
                $(this).text(Math.ceil(now));
              }
            }
          );
      });
    }
  };
}
