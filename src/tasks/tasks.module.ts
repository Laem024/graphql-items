import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../items/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]), // Importa la entidad para que esté disponible en TasksService
  ],
  providers: [TasksService], // Registra TasksService como proveedor
  exports: [TasksService], // (Opcional) Exporta si necesitas usarlo en otros módulos
})
export class TasksModule {}
