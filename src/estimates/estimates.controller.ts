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
import { EstimateActiveValidationPipe } from './pipes/estimate-status-validation.pipe';
import { Estimate } from './estimate.entity';
import { EstimateStatus } from './estimate-status.enum';
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

  @Patch('/:id/update')
  updateEstimate(
    @Param('id', ParseIntPipe) id: number,
    @Body('customerName') customerName: string,
    @Body('status', EstimateActiveValidationPipe) status: EstimateStatus,
    @GetUser() user: User,
  ): Promise<Estimate> {
    return this.estimatesService.updateEstimate(id, customerName, status, user);
  }
}
