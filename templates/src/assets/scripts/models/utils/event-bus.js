// import Vue from 'vue'; // vue.js

const bus = document.createElement('eventbus'); // vanilla js
// const bus = new Vue(); // vue.js

/**
 * @param {string} event
 * @param {mixed} args
 */
export function dispatch (event, args) {
	bus.dispatchEvent(new CustomEvent(event, {
		detail: args,
	})); // vanilla js
	// bus.$emit(event, ...args); // vue.js
}

/**
 * @param {string} event
 * @param callback
 */
export function listen (event, callback) {
	bus.addEventListener(event, callback); // vanilla js
	// bus.$on(event, callback); // vue.js
}

/**
 * @param {string} event
 * @param callback
 */
export function unlisten (event, callback) {
	bus.removeEventListener(event, callback); // vanilla js
	// bus.$on(event, callback); // vue.js
}

/**
 * @param {Object}
 * @param {string} object.msg   - message to send
 * @param {number} object.time  - visibility time (ms)
 */
export function toastMsg ({ msg, time = 5000, error }) {
	const div = document.createElement('div');
	const p = document.createElement('p');
	p.textContent = msg;
	if (error) {
		div.classList.add('toast-msg', 'error');
	} else {
		div.classList.add('toast-msg');
	}
	div.appendChild(p);
	document.querySelector('body').appendChild(div);
	const t = setTimeout(() => {
		div.classList.add('fadeout-right');
		div.addEventListener('animationend', () => {
			div.remove();
			clearTimeout(t);
		});
	}, time);
}
