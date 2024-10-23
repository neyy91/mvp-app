import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  schema: 'test',
  name: 'users',
  orderBy: {
    id: 'ASC',
  },
})
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  password: string;

  @Column('varchar')
  nickname: string;

  @Column('integer')
  balance: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  constructor(fields: UsersEntity) {
    Object.assign(this, fields);
  }
}
