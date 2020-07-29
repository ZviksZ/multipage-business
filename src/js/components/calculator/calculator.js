import * as $ from 'jquery';
import 'ion-rangeslider';
import { declOfNum, numberFormat, formatDate } from '../helpers';

/**
 * Калькуляторы выбора суммы и периода
 */
class Calculator {
	constructor($block, calculatorData) {
		// данные для расчетов
		this._calculatorData = calculatorData;

		this._settings = {
			sum_min: 3000,
			sum_max: 15000,
			sum_cur: 9000
		};
		this._items = this._calculatorData || {};

		// значения сроков для ползунков
		this._sliderTermValues = {
			day: {
				values: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
						18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
				defaultValue: 13,
				labels: ['день', 'дня', 'дней'],
			},
			week: {
				values: [8, 10, 12],
				defaultValue: 1,
				labels: ['неделя', 'недели', 'недель']
			}
		};

		// подписи для суммы возврата
		this._sumReturnLabels = {
			day: 'Возвращаете',
			week: 'Платеж раз в 2 недели'
		};

		// dom элементы
		this.$sliderSum = $block.find('[data-slider_sum]');
		this.$sliderTerm = $block.find('[data-slider_term]');
		this.$sum = $block.find('[data-sum]');
		this.$sumMax = $block.find('[data-sum_max]');
		this.$sumMin = $block.find('[data-sum_min]');
		this.$term = $block.find('[data-term]');
		this.$termLabel = $block.find('[data-term_label]');
		this.$termMax = $block.find('[data-term_max]');
		this.$termMin = $block.find('[data-term_min]');
		this.$termMaxLabel = $block.find('[data-term_max_label]');
		this.$termMinLabel = $block.find('[data-term_min_label]');
		this.$deadline = $block.find('[data-deadline]');
		this.$sumReturn = $block.find('[data-sum_return]');
		this.$sumReturnLabel = $block.find('[data-sum_return_label]');

		// значения калькулятора
		this._sum = 0;
		this._term = 0;
		this._termType = '';

		// ползунки
		this._sumSlider = this.initSumSlider();
		this._termSlider = this.initTermSlider();

		// обновляем параметры ползунка сроков
		this.updateTermSlider();
		// обновляем расчеты
		this.onChangeHandler();
	}

	get sum() {
		return this._sum;
	}

	set sum(value) {
		this._sum = +value;
	}

	get term() {
		return this._term;
	}

	set term(value) {
		this._term = this._sliderTermValues[this.termType]['values'][value]
	}

	get termType() {
		return this._termType;
	}

	set termType(value) {
		this._termType = value;
	}

	/**
	 * Инициализация ползунка выбора суммы
	 * @return {Object} объект проинициализированного ползунка
	 */
	initSumSlider() {
		const sumMin = +this._settings['sum_min'] || 3000;
		const sumMax = +this._settings['sum_max'] || 14000;
		this.sum = +this._settings['sum_cur'] || 7000;

		// обновляем termType в зависимости от суммы!
		this.termType = this.getCurrentTermType();

		this.$sumMin.html(numberFormat(sumMin));
		this.$sumMax.html(numberFormat(sumMax));

		this.$sliderSum.ionRangeSlider({
			skin: 'round',
			type: 'single',
			min: sumMin,
			max: sumMax,
			from: this.sum,
			step: 1000,
			grid: false,
			hide_min_max: true,
			hide_from_to: true,
			onChange: (data) => {
				this.sum = data.from;

				const currentTermType = this.getCurrentTermType();
				if (currentTermType !== this.termType) {
					this.termType = currentTermType;
					this.updateTermSlider();
				}

				this.onChangeHandler();
			},
		});

		return this.$sliderSum.data('ionRangeSlider');
	}

	/**
	 * Инициализация ползунка выбора пероида
	 * @return {Object} объект проинициализированного ползунка
	 */
	initTermSlider() {
		const values = this.getTermValues();

		this.$sliderTerm.ionRangeSlider({
			skin: 'round',
			type: 'single',
			values: values,
			grid: false,
			hide_min_max: true,
			hide_from_to: true,
			onChange: (data) => {
				this.term = data.from;
				this.onChangeHandler();
			},
		});

		return this.$sliderTerm.data('ionRangeSlider');
	}

	/**
	 * Обновление слайдера сроков
	 */
	updateTermSlider() {
		const values = this.getTermValues();
		const termMin = values[0];
		const termMax = values[values.length - 1];
		const termLabels = this._sliderTermValues[this.termType]['labels'];
		const defaultValue = this._sliderTermValues[this.termType]['defaultValue'];
		const sumReturnLabel = this._sumReturnLabels[this.termType];

		this.term = defaultValue;

		this.$termMin.html(termMin);
		this.$termMinLabel.html(declOfNum(termMin, termLabels));
		this.$termMax.html(termMax);
		this.$termMaxLabel.html(declOfNum(termMax, termLabels));
		this.$sumReturnLabel.html(sumReturnLabel);

		this._termSlider.update({
			values: values,
			from: defaultValue
		});
	}

	/**
	 * Получение массива доступных сроков для суммы
	 * @return {Array} значения для ползунка сроков
	 */
	getTermValues() {
		return this._sliderTermValues[this.termType]['values'] || [];
	}

	/**
	 * Получение типа срока в зависимости от суммы
	 * @return {String} значение текущего типа срока
	 */
	getCurrentTermType() {
		if (this._sum >= 3000 && this._sum < 10000) return 'day';
		return 'week';
	}

	/**
	 * Получение даты возврата займа - к выбранным дням/неделям прибавляем 1 день
	 * @return {String} - текст в формате 20 октября 2020
	 */
	getDeadlineDate() {
		const deadlineDate = new Date();
		let days = this.term;
		if (this.termType === 'week') days = days * 7;
		days = days + 1;
		deadlineDate.setDate(deadlineDate.getDate() + days);

		return formatDate(deadlineDate, 1);
	}

	/**
	 * Получение результатов расчетов в зависимости от суммы и срока
	 * @return {Object} объект с данными расчетов
	 */
	getLoanResults() {
		const sumReturn = numberFormat(this._calculatorData[`${this.sum}_${this.term}`]);
		const deadline = this.getDeadlineDate();
		return {
			sumReturn,
			deadline
		};
	}

	onChangeHandler() {
		const { sumReturn, deadline } = this.getLoanResults();
		const termTypeLabels = this._sliderTermValues[this.termType]['labels'];
		this.$sum.html(numberFormat(this.sum));
		this.$term.html(this.term);
		this.$termLabel.html(declOfNum(this.term, termTypeLabels));
		this.$sumReturn.html(sumReturn);
		this.$deadline.html(deadline);
	}
}

export default Calculator;