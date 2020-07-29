import Swiper from 'swiper/js/swiper.min';

export class MainSlider {
    constructor() {
        this.$block = document.getElementById('main_slider_block');
        if (!this.$block) return;

        this.$slider = document.getElementById('main_slider');
        this.$pxl = document.getElementById('main_slider_block_pxl');

        this.heightSliderBlock = this.getHeightSliderBlock();
        this.slider = this.initSlider();

        this.init();
    }

    init() {
        this.onScrollHandler();

        window.addEventListener('scroll', () => {
            this.onScrollHandler();
        });

        window.addEventListener('resize', () => {
            this.heightSliderBlock = this.getHeightSliderBlock();
        });
    }

    initSlider() {
        return new Swiper('#main_slider', {
            effect: 'slide',
            loop: false,
            preloadImages: false,
            lazy: true,
            resistance: false,
            spaceBetween: 32,
            // followFinger: false,
            pagination: {
                el: '.main-slider-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.main-slider-button-next',
                prevEl: '.main-slider-button-prev'
            },
            nextSlideMessage: '',
            prevSlideMessage: '',
            autoplay: {
                delay: 10000,
            },
            on: {
                slideChange: () => {
                    // костыль для lazy load - ХЗ почему не работает нормально!
                    // this.slider.lazy.load();
                }
            }
        });
    }

    getHeightSliderBlock() {
        return +this.$block.offsetHeight;
    }

    onScrollHandler() {
        const top = pageYOffset * 0.2 + 'px';
        const percent = Math.round(pageYOffset / this.heightSliderBlock * 100) / 100;
        const opacity = percent * 1 - 0.2;
        this.$block.style.transform = `translateY(${top})`;

        if (percent > 0.2) {
            this.$pxl.classList.remove('hide');
            this.$pxl.style.opacity = `${opacity}`;

        } else {
            this.$pxl.classList.add('hide');
        }
    }
}
