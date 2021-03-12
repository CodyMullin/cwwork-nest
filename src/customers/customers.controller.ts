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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
// import { CustomerActiveValidationPipe } from './pipes/customer-active-validation.pipe';
import { Customer } from './customer.entity';
import { CustomerStatus } from './customer-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('customers')
@UseGuards(AuthGuard())
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getCustomers(
    @Query(ValidationPipe) filterDto: GetCustomerFilterDto,
    @GetUser() user: User,
  ): Promise<Customer[]> {
    return this.customersService.getCustomers(filterDto, user);
  }

  @Get('/:id')
  getCustomerById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Customer> {
    return this.customersService.getCustomerById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @GetUser() user: User,
  ): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDto, user);
  }

  @Delete('/:id')
  deleteCustomer(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.customersService.deleteCustomer(id, user);
  }

  //   @Patch('/:id/update')
  //   updateCustomer(
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
