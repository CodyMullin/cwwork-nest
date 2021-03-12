import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CategoryStatus } from '../category-status.enum';

export class CategoryActiveValidationPipe implements PipeTransform {
  readonly allowedActive = [CategoryStatus.ACTIVE, CategoryStatus.INACTIVE];
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
