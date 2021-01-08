import { BadRequest, NotFound } from './errors';
import { strict as assert } from 'assert';
import { promisify } from 'util';
import { type as ot } from 'ot-json0';


// because for some reason TS compiler break calling it with full path
const apply = promisify(ot.apply);

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
		return db.get(docId);
	}

	return Promise.reject(new NotFound('Document not found', { docId }));
};

export const updateDocument = async (docId, ot) => {
	let doc = await getDocument(docId);

	assert(Array.isArray(ot), new BadRequest('Invalid transformations', { ot }));
	doc = await apply(doc, ot)
		.catch((error) => {
			throw new BadRequest('Invalid transformations', { error: error.message });
		});


	db.set(docId, doc);

	return doc;
};
