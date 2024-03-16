import { dispatch } from '../../models/utils/event-bus';

export default (element) => {
	const event = element.dataset.event;
	const elements = Array.from(element.children);
	const isSingleBtn = elements.length === 1;
	let last = null;

	function onClick (data, el) {
		if (data && el) {
			if (last) {
				last.classList.remove('active');
			}
			el.classList.add('active');
			last = el;
		}
		dispatch(event, data || null);
	}

	function init () {
		if (isSingleBtn) {
			elements[0].addEventListener('click', onClick);
			return;
		}
		elements.forEach((el) => {
			const data = el.dataset.value;
			if (data === 'default') {
				el.classList.add('active');
				last = el;
			}
			el.addEventListener('click', () => onClick(data, el));
		});
	}

	init();
};
