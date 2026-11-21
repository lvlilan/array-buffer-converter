import ArrayBufferConverter from '../arrayBufferConverter';
import getBuffer from '../getBuffer';

describe('ArrayBufferConverter', () => {
  let converter;

  beforeEach(() => {
    converter = new ArrayBufferConverter();
  });

  test('создаётся с buffer = null', () => {
    expect(converter.buffer).toBeNull();
  });

  test('load сохраняет переданный ArrayBuffer', () => {
    const buffer = getBuffer();
    converter.load(buffer);
    expect(converter.buffer).toBe(buffer);
    expect(converter.buffer).toBeInstanceOf(ArrayBuffer);
  });

  test('toString возвращает пустую строку, если buffer не загружен', () => {
    expect(converter.toString()).toBe('');
  });

  test('toString конвертирует ArrayBuffer в строку', () => {
    converter.load(getBuffer());
    const result = converter.toString();
    expect(result).toBe('{"data":{"user":{"id":1,"name":"Hitman","level":10}}}');
  });

  test('toString возвращает валидный JSON', () => {
    converter.load(getBuffer());
    const result = converter.toString();
    const parsed = JSON.parse(result);
    expect(parsed.data.user.id).toBe(1);
    expect(parsed.data.user.name).toBe('Hitman');
    expect(parsed.data.user.level).toBe(10);
  });
});

describe('getBuffer', () => {
  test('возвращает ArrayBuffer', () => {
    const buffer = getBuffer();
    expect(buffer).toBeInstanceOf(ArrayBuffer);
  });

  test('размер буфера соответствует длине строки * 2', () => {
    const buffer = getBuffer();
    const expected = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}'.length * 2;
    expect(buffer.byteLength).toBe(expected);
  });

  test('содержимое буфера декодируется в исходную строку', () => {
    const buffer = getBuffer();
    const view = new Uint16Array(buffer);
    const str = String.fromCharCode(...view);
    expect(str).toBe('{"data":{"user":{"id":1,"name":"Hitman","level":10}}}');
  });
});
