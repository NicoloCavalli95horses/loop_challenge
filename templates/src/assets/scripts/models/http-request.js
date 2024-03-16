import { toastMsg } from './utils/event-bus';

async function call ({ url, method = 'POST', params = {}, apiToken, data = false, convertDataToJSON = true } = {}) {
	const options = { method };
	if (apiToken) {
		options.headers = { Authorization: `Bearer ${apiToken}` };
	}
	if (method === 'POST' && data !== false) {
		if (convertDataToJSON) {
			options.body = JSON.stringify(data);
			options.headers = {
				...options.headers,
				'Content-Type': 'application/json',
			};
		} else {
			options.body = data;
		}
	}
	const urlParams = params ? new URLSearchParams(params) : undefined;
	const endpoint = params ? `${url}?${urlParams}` : url;
	try {
		const response = await fetch(endpoint, options);
		const res = await response.json();
		return res;
	} catch (error) {
		toastMsg({ msg: `unable to fetch data: ${error}`, error: true, time: 10000 });
		return error;
	}
}

export async function apiGetCrewMembers (params) {
	const API_TOKEN = '0123456789';
	const url = 'https://challenge-api.view.agentur-loop.com/api/';
	return await call({
		url,
		method: 'GET',
		params: { ...params, limit: 5 },
		apiToken: API_TOKEN,
	});
}
