
import { Model } from "sequelize-typescript";
export interface UserDocument extends Model {
    first_name: string;
    last_name: string;
    full_name: string;
    email:string;
    roleId:number;
    phone:string;
    dob:string;
    password:string;
    profile_image:string;
    otp:string;
    otp_updatedAt:Date;
    is_forgot_password_mail_active:boolean;
    isDeleted:boolean;
    status:string;
    id?:number;
};
export enum userStatus{
    Active="Active",
    Inactive="Inactive"
}
export type CreateUser={
    email:string
    password:string
    confirm_password:string;
    full_name?:string;
    first_name:string;
    last_name:string;
    roleId?:number

}