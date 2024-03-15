import { dispatch } from '../../models/utils/event-bus';

export default (element) => {
	const el = element.querySelector('.crew__button__button');
	function onClick () {
		dispatch('loadmore');
	}

	function init () {
		el.addEventListener('click', onClick);
	}

	init();
};
