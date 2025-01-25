import { Types } from "mongoose";
import { CategoryRepository } from "../repositories/Category.repository.js";
import { Request, Response } from "express";
import _ from "underscore";

export class CategoryController {
    private categoryRepo = new CategoryRepository();

    /**
     * //@Method:list
     * //@Description:To render list page
     */
    async list(req: Request, res: Response) {
        try {
            let getStat = await this.categoryRepo.getCategoryStat();
            let status = ""
            if (req.query && req.query.status) {
                status = (req.query.status as string)
            }
            res.render('modules/category/list.ejs', {
                page_name: 'category-management',
                page_title: "Category List",
                user: req.user,
                stats: getStat,
                status
            })

        } catch (err: any) {
            return res.status(500).send({ message: err.message })
        }
    };
    /**
     * //@Method:create
     * //@Description:To render create page of category
     */
    async create(req: Request, res: Response) {
        try {
            res.render('modules/category/add.ejs', {
                page_name: 'category-management',
                page_title: "Category List",
                user: req.user,
            })
        } catch (err: any) {
            return res.status(500).send({ message: err.message })
        }
    };
    /**
     * //@Method:getAll
     * //@Description:To get all record of category
     */
    async getAll(req: Request, _res: Response) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let currentPage = 1;
            if (start > 0) {
                currentPage = Math.floor((start + length) / length);
            }
            req.body.page = currentPage;
            let user = await this.categoryRepo.getAll(req);
            let data = {
                "recordsTotal": user.totalDocs,
                "recordsFiltered": user.totalDocs,
                "data": user.docs
            };

            return {
                status: 200,
                data: data,
                message: `Data fetched successfully.`
            };
        } catch (err: any) {
            return { status: 500, data: [], message: err.message }
        }
    };
    /**
     * //@Method:insert
     * //@Description:To insert any category
     */
    async insert(req: Request, res: Response) {
        try {
            const checkCategory = await this.categoryRepo.getByField({ "title": req.body.title, "isDeleted": false });
            if (checkCategory) {
                req.flash("error", "Category already exist");
                res.redirect('/category/create')
            } else {
                const saveCategory = await this.categoryRepo.save(req.body);
                if (!saveCategory) {
                    req.flash("error", 'Something went wrong');
                    res.redirect("/category/create");
                } else {
                    req.flash("success", 'category added successfully');
                    res.redirect("/category/list")
                };
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect('/category/list')
        }
    };
    /**
     * //@Method:update
     * //@Description:To update any category
     */
    async update(req: Request, res: Response) {
        try {
            const checkCategory = await this.categoryRepo.getByField({ "title": req.body.title, "isDeleted": false, _id: { $ne: new Types.ObjectId(req.body.id) } });
            if (checkCategory) {
                req.flash("error", "Category already exits");
                res.redirect(`/category/edit/${req.body.id}`);
            } else {
                const updateCategory = await this.categoryRepo.updateById(req.body, req.body.id);
                if (!updateCategory) {
                    req.flash("error", "Something went wrong");
                    res.redirect(`/category/edit/${req.body.id}`);
                } else {
                    req.flash("success", "Category added successfully");
                    res.redirect(`/category/list`);
                }
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect(`/category/edit/${req.body.id}`)
        }
    };
    /**
     * //@Method:edit
     * //@Description:To render edit page
     */
    async edit(req: Request, res: Response) {
        try {
            const checkCategory = await this.categoryRepo.getById(req.params.id as string);
            if (!checkCategory) {
                req.flash("error", 'Catgeory not found');
                res.redirect("/category/list");
            } else {
                res.render('modules/category/edit.ejs', {
                    page_name: 'category-management',
                    page_title: "Category Edit",
                    user: req.user,
                    response: checkCategory
                });

            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/category/list");
        }
    };
    /**
     * //@Method:statusChange
     * //@Description:To chnage status
     */
    async statusChange(req: Request, res: Response) {
        try {
            const checkCategory = await this.categoryRepo.getById(req.params.id as string);
            if (!checkCategory) {
                req.flash("error", "Category not found");
                res.redirect("/category/list");
            } else {
                const status = checkCategory.status == "Active" ? "Inactive" : "Active";
                const updateStatus = await this.categoryRepo.updateById({ status: status }, checkCategory._id);
                if (!updateStatus) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/category/list");
                } else {
                    req.flash("success", "Status changed successfully");
                    res.redirect("/category/list");
                }
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/category/list");
        }
    };
    /**
     * //@Method:delete
     * //@Description:To delete any any data
     */
    async delete(req: Request, res: Response) {
        try {
            const checkCategory = await this.categoryRepo.getById(req.params.id as string);
            if (!checkCategory) {
                req.flash("error", "Category not found");
                res.redirect("/category/list");
            } else {
                const updateStatus = await this.categoryRepo.updateById({ "isDeleted": true }, checkCategory._id);
                if (!updateStatus) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/category/list");
                } else {
                    req.flash("success", "Category deleted successfully");
                    res.redirect("/category/list");
                }
            }
        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/category/list");
        }
    };
    /**
     * //@Method:bulkDelete
     * //@Description:To delete multipule category at a time
     */
    async bulkDelete(req: Request, res: Response) {
        try {
            // console.log(req.body);
            if ((_.has(req.body, 'id')) && (!_.isEmpty(req.body.id))) {
                let userDelete = await this.categoryRepo.bulkDelete(req.body.id);

                return res.status(200).send({ status: 200, data: userDelete, message: 'Category deleted successfully.' })
            } else {
                return res.status(400).send({ status: 400, message: 'Please select a category first.' })
            }
        } catch (e: any) {
            return res.status(500).send({ message: e.message });
        }
    }
}