import { AppError, EndpointNotFound } from './errors';
import httpLogger from 'pino-http';

const logger = httpLogger();
export const loggerMiddleware = (req, res, next) => {
	logger(req, res);
	next();
};

export const errorMiddleware = (err, req, res, next) => {
	const code = (err instanceof AppError && err.code) || 500;
	res.status(code);

	if (code >= 500) {
		err && req.log.error(err);

		return res.send({
			message: 'Internal server error',
		});
	} else {
		return res.send({
			message: err.message,
		});
	}
};

export const notFoundMiddleware = (req, res, next) => {
	return next(new EndpointNotFound());
};
