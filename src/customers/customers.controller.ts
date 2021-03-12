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
import { CustomerActiveValidationPipe } from './pipes/customer-active-validation.pipe';
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

  @Patch('/:id/update')
  updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
    @Body('notes') notes: string,
    @Body('email') email: string[],
    @Body('phoneNumber') phoneNumber: string[],
    @Body('address') address: string,
    @Body('reference') reference: string,
    @Body('preference') preference: string,
    @Body('active', CustomerActiveValidationPipe) active: CustomerStatus,
    @GetUser() user: User,
  ): Promise<Customer> {
    return this.customersService.updateCustomer(
      id,
      name,
      notes,
      email,
      phoneNumber,
      address,
      reference,
      preference,
      active,
      user,
    );
  }
}
