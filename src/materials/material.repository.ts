import { Material } from './material.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialStatus } from './material-status.enum';
import { GetMaterialFilterDto } from './dto/get-material-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Material)
export class MaterialRepository extends Repository<Material> {
  async getMaterials(
    filterDto: GetMaterialFilterDto,
    user: User,
  ): Promise<Material[]> {
    const { active, search } = filterDto;
    const query = this.createQueryBuilder('material');

    query.where('material.userId = :userId', { userId: user.id });

    if (active) {
      query.andWhere('material.active = :active', { active });
    }

    if (search) {
      query.andWhere(
        '(LOWER(material.name) LIKE LOWER(:search) OR LOWER(material.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const materials = query.getMany();
    return materials;
  }

  async createMaterial(
    createMaterialDto: CreateMaterialDto,
    user: User,
  ): Promise<Material> {
    const {
      name,
      description,
      salesCost,
      purchaseCost,
      installCost,
      category,
      measurement,
    } = createMaterialDto;

    const material = new Material();
    material.name = name;
    material.description = description;
    material.salesCost = salesCost;
    material.purchaseCost = purchaseCost;
    material.installCost = installCost;
    material.category = category;
    material.measurement = measurement;
    material.active = MaterialStatus.ACTIVE;
    material.user = user;

    await material.save();

    delete material.user;
    return material;
  }
}
