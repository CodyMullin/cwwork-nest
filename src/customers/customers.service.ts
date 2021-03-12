import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CustomerStatus } from './customer-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRespository: CustomerRepository,
  ) {}

  async getCustomers(
    filterDto: GetCustomerFilterDto,
    user: User,
  ): Promise<Customer[]> {
    return this.customerRespository.getCustomers(filterDto, user);
  }

  async getCustomerById(id: number, user: User): Promise<Customer> {
    const found = await this.customerRespository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }

    return found;
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    user: User,
  ): Promise<Customer> {
    return this.customerRespository.createCustomer(createCustomerDto, user);
  }

  async deleteCustomer(id: number, user: User): Promise<void> {
    const result = await this.customerRespository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }
  }

  //   async updateCustomer(
  //     id: number,
  //     name: string,
  //     description: string,
  //     salesCost: string,
  //     purchaseCost: string,
  //     installCost: string,
  //     category: string,
  //     measurement: string,
  //     active: MaterialStatus,
  //     user: User,
  //   ): Promise<Material> {
  //     const material = await this.getMaterialById(id, user);

  //     material.id = id;
  //     material.name = name;
  //     material.description = description;
  //     material.salesCost = salesCost;
  //     material.purchaseCost = purchaseCost;
  //     material.installCost = installCost;
  //     material.category = category;
  //     material.measurement = measurement;
  //     material.active = active;

  //     await material.save();
  //     return material;
  //   }
}
