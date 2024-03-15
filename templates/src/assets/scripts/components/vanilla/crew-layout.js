import { dispatch } from '../../models/utils/event-bus';

export default (element) => {
	const elements = element.querySelectorAll('.crew__layout__item');
	let last = null;

	function onClick (data, el) {
		if (last) {
			last.classList.remove('active');
		}
		el.classList.add('active');
		last = el;
		dispatch('layout', data);
	}

	function init () {
		elements.forEach((el) => {
			const data = el.textContent;
			if (data === 'auto') {
				el.classList.add('active');
				last = el;
			}
			el.addEventListener('click', () => onClick(data, el));
		});
	}

	init();
};
