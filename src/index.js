import ArrayBufferConverter from './js/arrayBufferConverter';
import getBuffer from './js/getBuffer';

const converter = new ArrayBufferConverter();
converter.load(getBuffer());

export { converter, getBuffer };
