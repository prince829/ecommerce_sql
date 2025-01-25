import { model, Schema } from "mongoose";
import { CategoryDocument, CategoryModelAggregate } from "../../../interface/CategoryInterface.js";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const categorySchema=new Schema<CategoryDocument>({
    title:{type:String,default:""},
    status:{type:String,default:"Active",enum:["Active","Inactive"]},
    isDeleted:{type:Boolean,default:false}
},{versionKey:false,timestamps:true});

categorySchema.plugin(aggregatePaginate)

export const categoryModel = model<CategoryDocument,CategoryModelAggregate>("Category", categorySchema);
export type { CategoryDocument };
