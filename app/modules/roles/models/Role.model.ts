import {
  Table,
  Column,
  Model,
  DataType,
  Index,
  HasMany,
} from "sequelize-typescript";
import { RoleDocument } from "../../../interface/RoleInterface.js";
import User from "../../users/models/User.model.js";
@Table({
  tableName: "roles",
  timestamps: true,
})
export default class Role extends Model<RoleDocument> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  roleDisplayName!: string;
  @Index
  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  role!: string;
  @Column({ type: DataType.STRING, defaultValue: "", allowNull: true })
  desc!: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted!: boolean;
  @HasMany(() => User,{
    onDelete: 'RESTRICT', // Restrict deletion of parent if child exists
    onUpdate: 'CASCADE', // Optional: Update foreign key if parent key changes
    hooks:true,
  }) // One Role can have many Users
  users!: User[];
}
