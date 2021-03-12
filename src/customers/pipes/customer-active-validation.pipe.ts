import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CustomerStatus } from '../customer-status.enum';

export class CustomerActiveValidationPipe implements PipeTransform {
  readonly allowedActive = [CustomerStatus.ACTIVE, CustomerStatus.INACTIVE];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isActiveValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isActiveValid(active: any) {
    const idx = this.allowedActive.indexOf(active);

    return idx !== -1;
  }
}
