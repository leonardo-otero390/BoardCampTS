export default class NotFound extends Error {
  status: number;

  constructor(message?: string) {
    super();
    this.name = 'NotFoundError';
    this.status = 404;
    this.message = message;
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
