export class OnlyNumbers {
  static apply(value: string): string {
    return value.replace(/\D/g, '');
  }
}
