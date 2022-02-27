export default class Conflict extends Error {
  status: number;

  constructor(message?: string) {
    super();
    this.status = 409;
    this.message = message;
    Object.setPrototypeOf(this, Conflict.prototype);
  }
}
