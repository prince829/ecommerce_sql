import { AggregatePaginateModel, Document, Types } from "mongoose"

export interface CategoryDocument extends Document{
   title:string;
   status:string;
   isDeleted:boolean;
   _id:Types.ObjectId|string
};
export interface CategoryModelAggregate extends AggregatePaginateModel<CategoryDocument>{}