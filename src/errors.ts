export class AppError extends Error {
	code: number;
	context: any;
	constructor(...args) {
		super(...args);
		/*
			This is required because:
			- https://github.com/microsoft/TypeScript/issues/13965
			- https://github.com/microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
		*/
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

export class NotFound extends AppError {
	constructor(message, context) {
		super(message || 'Not found');
		this.code = 404;
		this.context = context;
	}
}

export class EndpointNotFound extends AppError {
	constructor() {
		super('Endpoint not found');
		this.code = 404;
	}
}

export class BadRequest extends AppError {
	constructor(message, context) {
		super(message || 'Bad request');
		this.code = 400;
		this.context = context;
	}
}

export class InternalServer extends AppError {
	constructor(message, context) {
		super(message || 'Internal server error');
		this.code = 500;
		this.context = context;
	}
}
