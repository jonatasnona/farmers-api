import { DocumentValidator } from './document.validator';

describe(DocumentValidator.name, () => {
  let validator: DocumentValidator;

  beforeEach(() => {
    validator = new DocumentValidator();
  });

  describe('isValidCpf', () => {
    it('should return true for a valid CPF', () => {
      expect(validator.isValidCpf('12345678901')).toBe(true);
    });

    it('should return false for an invalid CPF', () => {
      expect(validator.isValidCpf('123')).toBe(false);
    });

    it('should return false for a CPF with non-numeric characters', () => {
      expect(validator.isValidCpf('1234567890a')).toBe(false);
    });
  });

  describe('isValidCnpj', () => {
    it('should return true for a valid CNPJ', () => {
      expect(validator.isValidCnpj('12345678000195')).toBe(true);
    });

    it('should return false for an invalid CNPJ', () => {
      expect(validator.isValidCnpj('123')).toBe(false);
    });

    it('should return false for a CNPJ with non-numeric characters', () => {
      expect(validator.isValidCnpj('1234567800019a')).toBe(false);
    });
  });

  describe('validate', () => {
    it('should return true for a valid CPF', () => {
      expect(validator.validate('12345678901')).toBe(true);
    });

    it('should return true for a valid CNPJ', () => {
      expect(validator.validate('12345678000195')).toBe(true);
    });

    it('should return false for an invalid document', () => {
      expect(validator.validate('123')).toBe(false);
    });

    it('should return false for a document with non-numeric characters', () => {
      expect(validator.validate('1234567890a')).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    it('should return the default error message', () => {
      expect(validator.defaultMessage()).toBe('Invalid document!');
    });
  });
});
