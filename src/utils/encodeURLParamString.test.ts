import { describe, expect, it } from 'vitest';
import { encodeURLParamString } from './encodeURLParamString';

describe('encodeURLParamString', () => {
  it('encodes a single key-value pair', () => {
    const result = encodeURLParamString([{ key: 'query', value: 'test' }]);
    expect(result).toBe('&query=test');
  });

  it('encodes multiple key-value pairs', () => {
    const result = encodeURLParamString([
      { key: 'query', value: 'test' },
      { key: 'page', value: 1 },
    ]);
    expect(result).toBe('&query=test&page=1');
  });

  it('encodes special characters', () => {
    const result = encodeURLParamString([{ key: 'query', value: 'hello world' }]);
    expect(result).toBe('&query=hello%20world');
  });

  it('handles undefined values', () => {
    const result = encodeURLParamString([{ key: 'test', value: undefined }]);
    expect(result).toBe('&test');
  });

  it('encodes array values as comma-separated', () => {
    const result = encodeURLParamString([{ key: 'ids', value: [1, 2, 3] }]);
    expect(result).toBe('&ids=1%2C2%2C3');
  });

  it('handles empty array', () => {
    const result = encodeURLParamString([]);
    expect(result).toBe('');
  });

  it('handles mixed types', () => {
    const result = encodeURLParamString([
      { key: 'string', value: 'test' },
      { key: 'number', value: 42 },
      { key: 'array', value: ['a', 'b'] },
      { key: 'undefined', value: undefined },
    ]);
    expect(result).toBe('&string=test&number=42&array=a%2Cb&undefined');
  });
});
