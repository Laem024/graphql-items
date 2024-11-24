import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item])
  async items() {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { nullable: true })
  async item(@Args('id') id: number) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  async createItem(
    @Args('nombre') nombre: string,
    @Args('descripcion') descripcion: string,
  ) {
    return this.itemsService.create({ nombre, descripcion });
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('id') id: number,
    @Args('nombre', { nullable: true }) nombre?: string,
    @Args('descripcion', { nullable: true }) descripcion?: string,
  ) {
    return this.itemsService.update(id, { nombre, descripcion });
  }

  @Mutation(() => Boolean)
  async deleteItem(@Args('id') id: number) {
    await this.itemsService.remove(id);
    return true;
  }
}
