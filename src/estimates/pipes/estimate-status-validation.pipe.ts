import { BadRequestException, PipeTransform } from '@nestjs/common';
import { EstimateStatus } from '../estimate-status.enum';

export class EstimateActiveValidationPipe implements PipeTransform {
  readonly allowedActive = [
    EstimateStatus.ACCEPTED,
    EstimateStatus.PENDING,
    EstimateStatus.REJECTED,
  ];
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
