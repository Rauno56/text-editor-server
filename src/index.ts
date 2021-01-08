import express from 'express';
import { errorMiddleware, loggerMiddleware, notFoundMiddleware } from './web';
import { getDocument } from './api';
import { strict as assert } from 'assert';

const app = express();
const port = process.env.PORT || 80;

app.use(loggerMiddleware);

app.get('/health', (req, res) => {
	res.json({
		healthy: true,
	});
});

app.get('/document/:docId', async (req, res) => {
	const { docId } = req.params;

	res.json(await getDocument(docId));
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
		console.log(`server started at port ${port}`);
});
