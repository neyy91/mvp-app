import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  schema: 'test',
  name: 'items',
  orderBy: {
    id: 'ASC',
  },
})
export class ItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('integer')
  price: number;

  @Column('integer')
  owner: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  constructor(fields: ItemsEntity) {
    Object.assign(this, fields);
  }
}
