import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@ObjectType() // Este decorador hace que la clase sea reconocida como un tipo GraphQL
@Entity()
export class Item {
  @Field(() => Int) // Especifica el tipo GraphQL para el campo
  @PrimaryGeneratedColumn()
  id: number;

  @Field() // Decorador necesario para que GraphQL lo reconozca
  @Column()
  nombre: string;

  @Field()
  @Column()
  descripcion: string;

  @Field()
  @CreateDateColumn()
  fechaCreacion: Date;
}
