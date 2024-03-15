export async function call (url, method = 'POST', params, data = false, convertDataToJSON = true) {
	const options = { method, headers: { Authorization: 'Bearer 0123456789' } };
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
	const response = await fetch(endpoint, options);
	const res = await response.json();
	return res;
}

export async function apiGetCrewMembers (params) {
	const url = 'https://challenge-api.view.agentur-loop.com/api/';
	return await call(url, 'GET', { ...params, limit: 5 });
}
