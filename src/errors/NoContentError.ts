export default class NoContent extends Error {
  status: number;

  constructor() {
    super();
    this.status = 204;
    Object.setPrototypeOf(this, NoContent.prototype);
  }
}
