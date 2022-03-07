import HttpError from './HttpError';

export default class NoContent extends HttpError {
  status: number;

  message: string;

  constructor() {
    super();
    this.status = 204;
    Object.setPrototypeOf(this, NoContent.prototype);
  }
}
