import api from './api.test'

(async () => {
	await api();
})()
	.then(() => console.log('PASSED'))
	.catch((error) => console.error(error));

