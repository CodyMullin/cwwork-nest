import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EstimatesService } from './estimates.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { GetEstimateFilterDto } from './dto/get-estimate-filter.dto';
// import { EstimateActiveValidationPipe } from './pipes/estimate-status-validation.pipe';
import { Estimate } from './estimate.entity';
// import { EstimateStatus } from './estimate-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('estimates')
@UseGuards(AuthGuard())
export class EstimatesController {
  constructor(private estimatesService: EstimatesService) {}

  @Get()
  getEstimates(
    @Query(ValidationPipe) filterDto: GetEstimateFilterDto,
    @GetUser() user: User,
  ): Promise<Estimate[]> {
    return this.estimatesService.getEstimates(filterDto, user);
  }

  @Get('/:id')
  getEstimateById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Estimate> {
    return this.estimatesService.getEstimateById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createEstimate(
    @Body() createEstimateDto: CreateEstimateDto,
    @GetUser() user: User,
  ): Promise<Estimate> {
    return this.estimatesService.createEstimate(createEstimateDto, user);
  }

  @Delete('/:id')
  deleteEstimate(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.estimatesService.deleteEstimate(id, user);
  }

  //   @Patch('/:id/update')
  //   updateMaterial(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body('name') name: string,
  //     @Body('description') description: string,
  //     @Body('salesCost') salesCost: string,
  //     @Body('purchaseCost') purchaseCost: string,
  //     @Body('installCost') installCost: string,
  //     @Body('category') category: string,
  //     @Body('measurement') measurement: string,
  //     @Body('active', MaterialActiveValidationPipe) active: MaterialStatus,
  //     @GetUser() user: User,
  //   ): Promise<Material> {
  //     return this.materialsService.updateMaterial(
  //       id,
  //       name,
  //       description,
  //       salesCost,
  //       purchaseCost,
  //       installCost,
  //       category,
  //       measurement,
  //       active,
  //       user,
  //     );
  //   }
}
