import { OnlyNumbers } from './only-numbers.helper';

describe(OnlyNumbers.name, () => {
  it('should remove all non-numeric characters from a string', () => {
    const result = OnlyNumbers.apply('abc123def456');
    expect(result).toBe('123456');
  });

  it('should return an empty string if the input contains no numeric characters', () => {
    const result = OnlyNumbers.apply('abcdef');
    expect(result).toBe('');
  });

  it('should return the same string if the input contains only numeric characters', () => {
    const result = OnlyNumbers.apply('123456');
    expect(result).toBe('123456');
  });

  it('should handle an empty string input', () => {
    const result = OnlyNumbers.apply('');
    expect(result).toBe('');
  });

  it('should handle strings with special characters and spaces', () => {
    const result = OnlyNumbers.apply('12 34!@#$%^&*()56');
    expect(result).toBe('123456');
  });

  it('should handle strings with leading and trailing spaces', () => {
    const result = OnlyNumbers.apply('  123 456  ');
    expect(result).toBe('123456');
  });
});
