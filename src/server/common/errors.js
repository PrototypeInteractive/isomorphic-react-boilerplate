export class NotImplementedError extends Error {
  constructor(...args) {
    super(...args);

    this.type = this.constructor.name;
    Error.captureStackTrace(this, NotImplementedError);
  }
}

export class NotAuthorizedError extends Error {
  constructor(...args) {
    super(...args);

    this.type = this.constructor.name;
    Error.captureStackTrace(this, NotAuthorizedError);
  }
}

export class ValidationError extends Error {
  constructor(...args) {
    super(...args);

    this.type = this.constructor.name;
    Error.captureStackTrace(this, NotAuthorizedError);
  }
}
