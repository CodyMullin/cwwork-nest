import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MaterialsModule } from './materials/materials.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { EstimatesModule } from './estimates/estimates.module';
import { RoomsModule } from './rooms/rooms.module';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MaterialsModule,
    AuthModule,
    CustomersModule,
    CategoriesModule,
    EstimatesModule,
    RoomsModule,
    WorkModule,
  ],
})
export class AppModule {}
