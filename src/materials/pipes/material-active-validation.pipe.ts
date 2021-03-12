import { BadRequestException, PipeTransform } from '@nestjs/common';
import { MaterialStatus } from '../material-status.enum';

export class MaterialActiveValidationPipe implements PipeTransform {
  readonly allowedActive = [MaterialStatus.ACTIVE, MaterialStatus.INACTIVE];
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
