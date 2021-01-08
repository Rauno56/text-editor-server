import { BadRequest, NotFound } from './errors';
import { strict as assert } from 'assert';

const db = new Map();

const assertValidId = (id: string) => {
	assert.equal(typeof id, 'string', new BadRequest('Expecting a string', { id }));
	assert.equal(id.length, 6, new BadRequest('Invalid length', { length: id.length }));
	return ;
};

const USER_ID = {
	A: 'user12',
	B: 'user13',
};

db.set('docabc', [
	{ u: USER_ID.A, t: 'block of text here' },
	{ u: USER_ID.B, t: ' & another one from another user' },
]);

db.set('docdef', [
	{ u: USER_ID.B, t: 'Hello, ' },
	{ u: USER_ID.A, t: 'World' },
	{ u: USER_ID.B, t: '!' },
]);

export const getDocument = async (docId) => {
	assertValidId(docId);

	if (db.has(docId)) {
		return db.get(docId) || Promise.reject();
	}

	return Promise.reject(new NotFound('Document not found', { docId }));
};
