import * as $  from 'jquery';
import Choices from "choices.js";

export default class ParkingChoices {
    constructor() {
        this.$select = document.querySelector('select.select-custom');
        if ($('select.select-custom').length) {
            this.init();
        }

    }
    init() {
        const choice = new Choices(this.$select, {
            searchEnabled: false,
            itemSelectText: '',
            classNames: {
                containerOuter: 'choices choices-parking'
            }
        });
        this.onSelectChange();
    }
    onSelectChange() {
        this.$select.addEventListener('change', (e) => {
            location.href = e.currentTarget.value
        })
    }
}
