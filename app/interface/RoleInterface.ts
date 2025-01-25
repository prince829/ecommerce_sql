import { Model } from "sequelize-typescript";

export interface RoleDocument extends Model {
    roleDisplayName: string;
    role: string;
    desc: string;
    isDeleted: boolean;
    id?:number;
} 