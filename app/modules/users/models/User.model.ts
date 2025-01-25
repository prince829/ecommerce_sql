import { UserDocument, userStatus } from "../../../interface/UserInterface.js";
const registerType = ["Normal", "Phone", "Google", "Facebook", "Apple"];
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Table,
  Model,
} from "sequelize-typescript";
import Role from "../../roles/models/Role.model.js";
@Table({
  tableName: "users_info",
  timestamps: true, // Optional: adds createdAt and updatedAt fields
})
export default class User extends Model<UserDocument> implements UserDocument{
  @Index
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "" })
  declare first_name: string;
  @Index
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "" })
  declare last_name: string;
  @Index
  @Column({ type: DataType.STRING, get(){
    const firstName = this.getDataValue("first_name");
    const lastName = this.getDataValue("last_name");
    return `${firstName} ${lastName}`;},
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    },
  })
  declare full_name: string;
  @Index
  @Column({type:DataType.STRING,defaultValue:"",allowNull:false})
  declare email:string;
  @Index
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false})
  declare roleId: number;
  @BelongsTo(() => Role)
  declare  role: Role; //To directly fetch data by include true in repo
  @Index
  @Column({ type: DataType.STRING, defaultValue: "", allowNull: false })
  declare phone: string;
  @Index
  @Column({ type: DataType.STRING, defaultValue: "", allowNull: true })
  declare dob: string;
  @Index
  @Column({ type: DataType.STRING, defaultValue: "", allowNull: false })
  declare  password: string;
  @Index
  @Column({ type: DataType.STRING, defaultValue: "", allowNull: true })
  declare profile_image: string;
  @Column({ type: DataType.STRING, defaultValue: "" })
  declare otp: string;
  @Column({ type: DataType.DATE, defaultValue: null, allowNull: true })
  declare  otp_updatedAt: Date;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare  is_forgot_password_mail_active: boolean;
  @Index
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isDeleted: boolean;
  @Index
  @Column({
    type: DataType.ENUM(...Object.values(userStatus)),
    defaultValue: "Active",
  })
  declare status: userStatus;
}
