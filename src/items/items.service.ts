// import { Injectable, Inject } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Item } from './item.entity';
// import { ClientProxy } from '@nestjs/microservices';

// @Injectable()
// export class ItemsService {
//   constructor(
//     @InjectRepository(Item)
//     private readonly itemRepository: Repository<Item>,
//     @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
//   ) {}

//   findAll(): Promise<Item[]> {
//     return this.itemRepository.find();
//   }

//   findOne(id: number): Promise<Item> {
//     return this.itemRepository.findOneBy({ id });
//   }

//   //   create(item: Partial<Item>): Promise<Item> {
//   //     const newItem = this.itemRepository.create(item);
//   //     return this.itemRepository.save(newItem);
//   //   }

//   async create(item: Partial<Item>): Promise<Item> {
//     const newItem = this.itemRepository.create(item);
//     const savedItem = await this.itemRepository.save(newItem);

//     // Enviar mensaje a RabbitMQ
//     this.rabbitClient.emit('item_created', savedItem);

//     return savedItem;
//   }

//   //   async update(id: number, item: Partial<Item>): Promise<Item> {
//   //     await this.itemRepository.update(id, item);
//   //     return this.itemRepository.findOneBy({ id });
//   //   }

//   async update(id: number, item: Partial<Item>): Promise<Item> {
//     await this.itemRepository.update(id, item);
//     const updatedItem = await this.itemRepository.findOneBy({ id });

//     // Enviar mensaje a RabbitMQ
//     this.rabbitClient.emit('item_updated', updatedItem);

//     return updatedItem;
//   }

//   async remove(id: number): Promise<void> {
//     await this.itemRepository.delete(id);
//   }
// }


import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  /**
   * Fetch all items from the database.
   * @returns A promise containing all items.
   */
  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  /**
   * Fetch a single item by its ID.
   * @param id - The ID of the item to fetch.
   * @returns A promise containing the item if found.
   */
  findOne(id: number): Promise<Item> {
    return this.itemRepository.findOneBy({ id });
  }

  /**
   * Create a new item and send a message to RabbitMQ.
   * @param item - Partial data of the item to create.
   * @returns A promise containing the created item.
   */
  async create(item: Partial<Item>): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    const savedItem = await this.itemRepository.save(newItem);

    // Log and send message to RabbitMQ
    this.logger.log(`Sending 'item_created' message: ${JSON.stringify(savedItem)}`);
    this.rabbitClient.emit('item_created', savedItem);

    return savedItem;
  }

  /**
   * Update an existing item by its ID and send a message to RabbitMQ.
   * @param id - The ID of the item to update.
   * @param item - Partial data to update the item.
   * @returns A promise containing the updated item.
   */
  async update(id: number, item: Partial<Item>): Promise<Item> {
    await this.itemRepository.update(id, item);
    const updatedItem = await this.itemRepository.findOneBy({ id });

    // Log and send message to RabbitMQ
    this.logger.log(`Sending 'item_updated' message: ${JSON.stringify(updatedItem)}`);
    this.rabbitClient.emit('item_updated', updatedItem);

    return updatedItem;
  }

  /**
   * Remove an item by its ID.
   * @param id - The ID of the item to remove.
   * @returns A promise that resolves once the item is deleted.
   */
  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);

    // Log the removal (optional, no message sent to RabbitMQ for deletions here)
    this.logger.log(`Item with ID ${id} has been removed.`);
  }
}
