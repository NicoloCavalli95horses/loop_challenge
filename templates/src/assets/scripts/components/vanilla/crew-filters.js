import { dispatch } from '../../models/utils/event-bus';

export default (element) => {
	const elements = element.querySelectorAll('.team__inner__filters__item');
	let last = null;

	/**
	 * DEV NOTE:
	 * not clear if we allow the user to filter the data using more than one filter at the same time
	 * this implementation assumes that only one filter can be applied
	 */

	function onClick (data, el) {
		if (last) {
			last.classList.remove('active');
		}
		el.classList.add('active');
		last = el;
		dispatch('filter', data);
	}

	function init () {
		elements.forEach((el) => {
			const data = el.dataset.filter;
			if (data === 'false') {
				el.classList.add('active');
				last = el;
			}
			el.addEventListener('click', () => onClick(data, el));
		});
	}

	init();
};
