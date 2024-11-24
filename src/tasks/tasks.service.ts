import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/item.entity';
import { LessThan } from 'typeorm';


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Ejecuta a la medianoche diariamente
  async cleanOldItems() {
    this.logger.log('Iniciando limpieza de registros antiguos...');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await this.itemRepository.delete({
      fechaCreacion: LessThan(thirtyDaysAgo),
    });

    this.logger.log(`Registros eliminados: ${result.affected}`);
  }
}
