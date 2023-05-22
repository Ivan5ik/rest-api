import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'my-user',
  timestamps: true,
  underscored: true,
})
export class Auth extends Model<Auth> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'lastSignIn',
  })
  lastSignIn: string;
}
