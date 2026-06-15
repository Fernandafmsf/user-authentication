class HttpError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

class ValidationError extends HttpError {
  constructor(message, details = []) {
    super(message || 'Validation failed', 400);
    this.details = details;
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(message || 'Not Found', 404);
  }
}

export { HttpError, ValidationError, NotFoundError };
