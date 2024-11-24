import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findOne(id: number): Promise<Item> {
    return this.itemRepository.findOneBy({ id });
  }

  create(item: Partial<Item>): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    return this.itemRepository.save(newItem);
  }

  async update(id: number, item: Partial<Item>): Promise<Item> {
    await this.itemRepository.update(id, item);
    return this.itemRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
