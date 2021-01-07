export class AppError extends Error {
	code: number;
	context: any;
}

export class NotFound extends AppError {
	constructor() {
		super('Not found');
		this.code = 404;
	}
}

export class EndpointNotFound extends AppError {
	constructor() {
		super('Endpoint not found');
		this.code = 404;
	}
}

export class InternalServer extends AppError {
	constructor(message, context) {
		super(message || 'Internal server error');
		this.code = 500;
		this.context = context;
	}
}
