import HttpError from './HttpError';

export default class Conflict extends HttpError {
  status: number;

  message: string;

  constructor(message?: string) {
    super();
    this.status = 409;
    this.message = message;
  }
}
