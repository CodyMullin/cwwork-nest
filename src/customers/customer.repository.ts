import { Customer } from './customer.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerStatus } from './customer-status.enum';
import { GetCustomerFilterDto } from './dto/get-customer-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async getCustomers(
    filterDto: GetCustomerFilterDto,
    user: User,
  ): Promise<Customer[]> {
    const { active, search } = filterDto;
    const query = this.createQueryBuilder('customer');

    query.where('customer.userId = :userId', { userId: user.id });

    if (active) {
      query.andWhere('customer.active = :active', { active });
    }

    if (search) {
      query.andWhere(
        '(LOWER(customer.firstName) LIKE LOWER(:search) OR LOWER(customer.lastname) LIKE LOWER(:search) OR LOWER(customer.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const customers = query.orderBy('customer.name', 'ASC').getMany();
    return customers;
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    user: User,
  ): Promise<Customer> {
    const {
      name,
      notes,
      email,
      phoneNumber,
      address,
      reference,
      preference,
    } = createCustomerDto;

    const customer = new Customer();

    customer.name = name;
    customer.notes = notes;
    customer.email = email;
    customer.phoneNumber = phoneNumber;
    customer.address = address;
    customer.reference = reference;
    customer.preference = preference;
    customer.active = CustomerStatus.ACTIVE;
    customer.user = user;

    await customer.save();

    delete customer.user;
    return customer;
  }
}
