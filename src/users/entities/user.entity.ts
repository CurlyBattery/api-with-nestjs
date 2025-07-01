import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, Transform } from "class-transformer";

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Expose()
  public password: string;

  @Column({nullable: true})
  @Transform(value => {
    if(value !== null) {
      return value;
    }
  })
  public category: string;
}

export default UserEntity;
