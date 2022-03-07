import HttpError from './HttpError';

export default class BadRequest extends HttpError {
  status: number;

  message: string;

  constructor(message?: string) {
    super();
    this.status = 400;
    this.message = message;
  }
}
