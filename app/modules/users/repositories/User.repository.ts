
import { AbstractClass } from "../../../helper/abstractClass/AbstractClass.repository.js";
import { Request } from "express";
import bcrypt from "bcryptjs";
// import { roleModel } from "../../roles/models/Role.model.js";
import _ from "underscore";
import moment from "moment";
import { UserDocument } from "../../../interface/UserInterface.js";
import User from "../models/User.model.js";
import { WhereOptions } from "sequelize";

export class UserRepository extends AbstractClass<UserDocument> {
    constructor() {
        super(User)
    };
    async fineOneWithRole(params:any):Promise<{status:number,data:any,message:string}> {
        try {
            let user = await User.findOne({where:{"email":params.email,'roleId':params.role,"isDeleted":false,"status":"Active"},include:"role",raw:true})
            if (!user) {
                return {
                    "status": 500,
                    data: null,
                    "message": 'Authentication failed. User not found.'
                }
            }
            // const { role, ...userData } = user.get({ plain: true });
            // let data:any=userData;
            // data.role=role
            if (!bcrypt.compareSync(params.password, user.password)) {
                return {
                    "status": 500,
                    data: null,
                    "message": 'Authentication failed. Wrong password.'
                }
            } else {
                
                return {
                    "status": 200,
                    data: user,
                    "message": ""
                }
            }
        } catch (e) {
            throw e;
        }
    };

    // async getAllUser(req:Request): Promise<any> {
    //     try {
    //         let conditions:any = {};
    //         let and_clauses:any = [];

    //         // let roleData = await roleModel.find({ role: 'user' });
    //         // if (roleData.length > 0) {
    //         //     and_clauses.push({ role:  roleData[0]?._id  });
    //         // }
    //         and_clauses.push({ "isDeleted": false });

    //         if (_.isObject(req.body.search) && _.has(req.body.search, 'value')) {
    //             and_clauses.push({
    //                 $or: [
    //                     { 'full_name': { $regex: req.body.search.value.trim(), $options: 'i' } },
    //                     { 'email': { $regex: '^' + req.body.search.value.trim(), $options: 'i' } },
    //                     { 'phone': { $regex: req.body.search.value.trim(), $options: 'i' } }
    //                 ]
    //             });
    //         }

    //         if (req.body.columns && req.body.columns.length) {
    //             let statusFilter = _.findWhere(req.body.columns, { data: 'status' });
    //             if (statusFilter && statusFilter.search && statusFilter.search.value) {
    //                 and_clauses.push({
    //                     "status": statusFilter.search.value
    //                 });
    //             }

    //         }

    //         if (req.body.columns && req.body.columns.length) {
    //             let statusFilter = _.findWhere(req.body.columns, { data: 'status' });
    //             if (statusFilter && statusFilter.search && statusFilter.search.value) {
    //                 and_clauses.push({
    //                     "status": statusFilter.search.value
    //                 });
    //             }
    //         }

    //         conditions['$and'] = and_clauses;

    //         let sortOperator:any = { "$sort": {} };
    //         var sortOrder=1
    //         if (_.has(req.body, 'order') && req.body.order.length) {
    //             for (let order of req.body.order) {
    //                 let sortField = req.body.columns[+order.column].data;
    //                 if (order.dir == 'desc') {
    //                      sortOrder = -1;
    //                 } else if (order.dir == 'asc') {
    //                      sortOrder = 1;
    //                 }
    //                 sortOperator["$sort"][sortField] = sortOrder;
    //             }
    //         } else {
    //             sortOperator["$sort"]['_id'] = -1;
    //         }
    //         let aggregate = userModel.aggregate([
    //             {
    //                 $lookup: {
    //                     "from": "roles",
    //                     "let": { role: "$role" },
    //                     "pipeline": [
    //                         {
    //                             $match: {
    //                                 $expr: {
    //                                     $and: [
    //                                         { $eq: ["$_id", "$$role"] },
    //                                         { $eq: ["$isDeleted", false] }
    //                                     ]
    //                                 }
    //                             }
    //                         },

    //                     ],
    //                     "as": "user_role"
    //                 }
    //             },
    //             {
    //                 "$unwind": { path: "$user_role", preserveNullAndEmptyArrays: true }
    //             },
    //             {
    //                 $project: {
    //                     _id: "$_id",
    //                     full_name: "$full_name",
    //                     createdAt: "$createdAt",
    //                     status: "$status",
    //                     email: "$email",
    //                     phone: "$phone",
    //                     role: "$role",
    //                     profile_image: "$profile_image",
    //                     userRole: "$user_role.roleDisplayName",
    //                     isDeleted: "$isDeleted"
    //                 },
    //             },
    //             { $match: conditions },
    //             sortOperator
    //         ], { collation: { locale: "en", caseFirst: "upper" } });

    //         let options = { page: req.body.page, limit: req.body.length };
    //         let allUsers = await userModel.aggregatePaginate(aggregate, options);
    //         // console.log(allUsers,'allUsers');
            
    //         return allUsers;
    //     } catch (e) {
    //         console.log(e);
    //         throw (e);
    //     }
    // };
    // async getUserStat():Promise<{totalUsers:number,recentUsers:number,activeUsers:number}>{
    //     try{
    //         let matchCond:any = [];
    //         // let roleData = await roleModel.find({ $or: [{ role: "user" }] });
    //         // if (roleData.length > 0) {
    //         //     roleData.forEach((ele) => {
    //         //         matchCond.push({ role: ele._id });
    //         //     })
    //         // }

    //         let totalUsers = await userModel.find({ isDeleted: false, $or: matchCond }).countDocuments();
    //         let recentUsers = await userModel.find({ isDeleted: false, createdAt: { $gte: new Date(moment().subtract(24, 'hours').format()) }, $or: matchCond }).countDocuments();
    //         let activeUsers = await userModel.find({ isDeleted: false, status: 'Active', $or: matchCond }).countDocuments();

    //         return {
    //             totalUsers,
    //             recentUsers,
    //             activeUsers
    //         }
    //     }catch(err){
    //         console.log(err);
            
    //         throw err;
    //     }
    // };
}