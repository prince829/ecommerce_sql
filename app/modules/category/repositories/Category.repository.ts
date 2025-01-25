import _ from "underscore";
import { AbstractClass } from "../../../helper/abstractClass/AbstractClass.repository.js";
import { CategoryDocument, categoryModel } from "../models/category.model.js";
import moment from "moment";
import { Request } from "express";

export class CategoryRepository{
    // constructor(){
    //     super(categoryModel)
    // };
    async getAll(req:Request): Promise<any> {
        try {
            let conditions:any = {};
            let and_clauses:any = [];

            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.search) && _.has(req.body.search, 'value')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.search.value.trim(), $options: 'i' } }
                    ]
                });
            }

            if (req.body.columns && req.body.columns.length) {
                let statusFilter = _.findWhere(req.body.columns, { data: 'status' });
                if (statusFilter && statusFilter.search && statusFilter.search.value) {
                    and_clauses.push({
                        "status": statusFilter.search.value
                    });
                }

            }

            conditions['$and'] = and_clauses;

            let sortOperator:any = { "$sort": {} };
            var sortOrder=1
            if (_.has(req.body, 'order') && req.body.order.length) {
                for (let order of req.body.order) {
                    let sortField = req.body.columns[+order.column].data;
                    if (order.dir == 'desc') {
                         sortOrder = -1;
                    } else if (order.dir == 'asc') {
                         sortOrder = 1;
                    }
                    sortOperator["$sort"][sortField] = sortOrder;
                }
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }
            let aggregate = categoryModel.aggregate([
                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        createdAt: "$createdAt",
                        status: "$status",
                        isDeleted: "$isDeleted"
                    },
                },
                { $match: conditions },
                sortOperator
            ], { collation: { locale: "en", caseFirst: "upper" } });

            let options = { page: req.body.page, limit: req.body.length };
            let allUsers = await categoryModel.aggregatePaginate(aggregate, options);
            // console.log(allUsers,'allUsers');
            
            return allUsers;
        } catch (e) {
            console.log(e);
            throw (e);
        }
    };
    async getCategoryStat():Promise<{totalCategory:number,recentCategory:number,activeCategory:number}>{
        try{
          
            let totalCategory = await categoryModel.find({ isDeleted: false, }).countDocuments();
            let recentCategory = await categoryModel.find({ isDeleted: false, createdAt: { $gte: new Date(moment().subtract(24, 'hours').format()) }, }).countDocuments();
            let activeCategory = await categoryModel.find({ isDeleted: false, status: 'Active', }).countDocuments();

            return {
                totalCategory,
                recentCategory,
                activeCategory
            }
        }catch(err){
            console.log(err);
            
            throw err;
        }
    };
}