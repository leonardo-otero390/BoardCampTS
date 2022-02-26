class NoContent implements Error {
  status: number;

  name: string;

  message: string;

  stack?: string;

  constructor() {
    this.message = 'No Content';
    this.status = 204;
  }
}

export default NoContent;
