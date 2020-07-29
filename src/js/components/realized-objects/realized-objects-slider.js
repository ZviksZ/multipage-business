import Swiper from 'swiper/js/swiper.min';

export default class RealizedObjectsSlider {
    constructor() {
        this.$block = document.getElementById('ro-slider_block');
        if (!this.$block) return;

        this.$slider = document.getElementById('ro-slider');

        this.heightSliderBlock = this.getHeightSliderBlock();
        this.slider = this.initSlider();

        this.init();
    }

    init() {
        window.addEventListener('resize', () => {
            this.heightSliderBlock = this.getHeightSliderBlock();
        });
    }

    initSlider() {
        return new Swiper('#ro-slider', {
            effect: 'slide',
            loop: false,
            preloadImages: false,
            lazy: true,
            slidesPerView: 1,
            resistance: false,
            allowTouchMove: true,
            spaceBetween: 32,
            // followFinger: false,
            pagination: {
                el: '.ro-slider-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.ro-slider-button-next',
                prevEl: '.ro-slider-button-prev'
            },
            nextSlideMessage: '',
            prevSlideMessage: '',
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
}
