import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'items_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [ConsumerService],
})
export class ConsumerModule {}
