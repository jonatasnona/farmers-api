import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'DocumentValidator', async: false })
export class DocumentValidator implements ValidatorConstraintInterface {
  isValidCpf(cpf: string): boolean {
    return /^\d{11}$/.test(cpf);
  }

  isValidCnpj(cnpj: string): boolean {
    return /^\d{14}$/.test(cnpj);
  }

  validate(document: string): boolean {
    return this.isValidCpf(document) || this.isValidCnpj(document);
  }

  defaultMessage(): string {
    return 'Invalid document!';
  }
}
