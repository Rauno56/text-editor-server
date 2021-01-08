import * as api from './api'
import { strict as assert } from 'assert';

const DOC_ID = 'docabc';

export default async () => {
	console.log('getDocument');
	await assert.rejects(() => api.getDocument('invalid'));
	assert(Array.isArray(await api.getDocument(DOC_ID)));

	console.log('updateDocument');
	const result = await api.updateDocument(DOC_ID, [ { p: [ 0, 't' ], od: 'block of text here', oi: 'block of text' } ]);
	assert.deepEqual(result, [
		{ u: 'user12', t: 'block of text' },
		{ u: 'user13', t: ' & another one from another user' }
	]);

	await assert.rejects(() => api.updateDocument(DOC_ID, ['lkjasd']), /invalid transformationsa/i);
	await assert.rejects(() => api.updateDocument(DOC_ID, 123), /invalid transformation/i);
}
