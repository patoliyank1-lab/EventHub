/**
 * @throws Error with statusCode 400.
 */
class BadRequestError extends Error {
  statusCode: number;
  constructor(message = "Bad Request") {
    super(message);
    this.message = message;
    this.statusCode = 400;
  }
}

/**
 * @throws Error with statusCode 401.
 */
class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message = "Unauthorized") {
    super(message);
    this.message = message;
    this.statusCode = 401;
  }
}

/**
 * @throws Error with statusCode 404.
 */
class NotFoundError extends Error {
  statusCode: number;
  constructor(message = "item not found.") {
    super(message);
    this.message = message;
    this.statusCode = 404;
  }
}

/**
 * @throws Error with statusCode 409.
 */
class ConflictError extends Error {
  statusCode: number;
  constructor(message = "duplicate item found.") {
    super(message);
    this.message = message;
    this.statusCode = 409;
  }
}

export { BadRequestError, UnauthorizedError, NotFoundError, ConflictError };