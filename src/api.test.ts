import * as api from './api'
import { strict as assert } from 'assert';

export default async () => {
	assert.rejects(api.getDocument('invalid'));
	assert(Array.isArray(await api.getDocument('docabc')));
}

