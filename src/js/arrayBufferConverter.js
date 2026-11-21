export default class ArrayBufferConverter {
  constructor() {
    this.buffer = null;
  }

  load(buffer) {
    this.buffer = buffer;
  }

  toString() {
    if (!this.buffer) return '';
    const view = new Uint16Array(this.buffer);
    return String.fromCharCode(...view);
  }
}
