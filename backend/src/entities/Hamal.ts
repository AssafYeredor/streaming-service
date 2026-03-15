import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Hamal {

  @PrimaryGeneratedColumn()
  hamal_id!: number;

  @Column({
    type: "varchar",
    length: 100
  })
  hamal_name!: string;

  @Column({
    type: "varchar",
    nullable: true
  })
  coordinate?: string;

}