import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  @EventPattern('item_created')
  handleItemCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log(`Received item_created message: ${JSON.stringify(data)}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg); // Confirmar el mensaje
  }

  @EventPattern('item_updated')
  handleItemUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log(`Received item_updated message: ${JSON.stringify(data)}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg); // Confirmar el mensaje
  }
}
