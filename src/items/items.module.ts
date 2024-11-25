import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE', // Nombre del cliente RabbitMQ
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'], // URL de RabbitMQ
          queue: 'items_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ], // Registra la entidad Item
  providers: [ItemsResolver, ItemsService], // Declara el servicio y el resolver
  exports: [TypeOrmModule], // Exporta TypeOrmModule para que otros módulos puedan usar el repositorio
})
export class ItemsModule {}
