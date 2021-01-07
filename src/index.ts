import express from 'express';
import { errorMiddleware, loggerMiddleware, notFoundMiddleware } from './web';

const app = express();
const port = process.env.PORT || 80;

app.use(loggerMiddleware);

app.get('/health', (req, res) => {
	res.json({
		healthy: true,
	});
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
		console.log(`server started at port ${port}`);
});
