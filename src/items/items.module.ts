import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])], // Registra la entidad Item
  providers: [ItemsResolver, ItemsService],   // Declara el servicio y el resolver
  exports: [TypeOrmModule],                   // Exporta TypeOrmModule para que otros módulos puedan usar el repositorio
})
export class ItemsModule {}
