import { Request, Response } from "express";
import { UserRepository } from "../repositories/User.repository.js";
import jwt from 'jsonwebtoken';
import _ from "underscore";
import { config } from "../../../config/config.js";
import { RoleRepository } from "../../roles/repository/Role.repository.js";
import bcrypt from 'bcryptjs';
import { Mailer } from "../../../helper/Mailer.js";
import { Types } from "mongoose";
import { existsSync, unlinkSync } from "fs"
import { IResponse } from "../../../helper/IResponse.js";

export class UserController {
    private userRepo = new UserRepository();
    private roleRepo = new RoleRepository();
    protected mailer = new Mailer();
    constructor() {
    }
    /**
     * //@Method:login
     * //Decsription:To render login page
     */
    async login(req: Request, res: Response) {
        try {
            if (req.session && req.session.token) {
                res.redirect("/user/dashboard");
            } else {
                res.render("modules/user/login.ejs", { user_id: null })

            }
        } catch (err: any) {
            throw err;
        }
    };
    /* @Method: signin
     // @Description: user Login
    */
    async signin(req: Request, res: Response) {
        try {
            req.body.email = req.body.email.trim().toLowerCase();
            let roles = await this.roleRepo.getByField({"role":'admin'});
            req.body.role = roles?.id;
            let userData = await this.userRepo.fineOneWithRole(req.body);
            console.log(userData,'userData');
            
            if (userData.status == 500) {
                req.flash('error', userData.message);
                return res.redirect('/');
            }
            let user = userData.data;
            if (user.status == 'Inactive') {
                req.flash('error', "Account was set inactive by the Administrator");
                return res.redirect('/');
            } else
                if (user.status == 'Banned') {
                    req.flash('error', "Account was Banned by the Administrator");
                    return res.redirect('/');
                } else
                    if (!_.isEmpty(user) && user['role.id']) {
                        const payload = {
                            id: user.id
                        };
                        let token = jwt.sign(payload, config.server.jwtSecret, {
                            expiresIn: config.server.jwt_expiresin.toString() // token expiration time
                        });
                        if(req.session)
                        req.session.token = token;
                        req.user = user;

                        req.flash('success', "You have successfully logged in");
                        return res.redirect('/user/dashboard');
                    } else {
                        req.flash('error', 'Authentication failed. You are not a valid user.');
                        return res.redirect('/');
                    }
        } catch (e: any) {
            req.flash('error', e.message);
            return res.redirect('/');
        }
    };
    /**
     * //@Method:getAll
     * //@Description:To get All Data
     */
    async getAll(req: Request, _res: Response): Promise<IResponse> {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let currentPage = 1;
            if (start > 0) {
                currentPage = Math.floor((start + length) / length);
            }
            req.body.page = currentPage;
            let user = await this.userRepo.getAllUser(req);
            // let data = {
            //     "recordsTotal": user.totalDocs,
            //     "recordsFiltered": user.totalDocs,
            //     "data": user.docs
            // };

            return {
                status: 200,
                data: user,
                success: true,
                message: `Data fetched successfully.`
            };
        } catch (err: any) {
            return { status: 500, success:false, message: err.message }
        }
    };
    /**
     * //@Method:insert
     * //@Description:To insert user into DB
     */
    async insert(req: Request | any, res: Response) {
        try {
            if (req.user && req.user.role.role != "admin") {
                req.flash("error", "You are not authorized");
                res.redirect('/admin/logout')
            } else {
                let roleDetails = await this.roleRepo.getByField({ role: "user" });
                if (!_.isEmpty(roleDetails)) {
                    req.body.role = roleDetails?._id;
                };

                // let random_pass = Math.random().toString(36).substr(2, 9);
                const readable_pass = req.body.password;
                let hash_password = bcrypt.hashSync(readable_pass, bcrypt.genSaltSync(10));
                req.body.password = hash_password

                req.body.email = req.body.email.trim().toLowerCase();

                if (_.has(req.body, 'first_name') && _.has(req.body, 'last_name')) {
                    req.body.full_name = req.body.first_name + " " + req.body.last_name;
                }
                if (req.body.phone && req.body.phone != '') {
                    req.body.phone = req.body.phone.replace(/\s/g, '')
                }

                var chk = { isDeleted: false, email: req.body.email };
                let checkEmail = await this.userRepo.getByField(chk);

                if (!_.isEmpty(checkEmail)) {
                    req.flash('error', "Sorry, account already exist with this email.");
                    res.redirect('/user/list');
                } else {

                    if (req.files && req.files.length) {
                        req.body.profile_image = req.files[0].filename;
                    }
                    let saveUser = await this.userRepo.save(req.body);
                    if (_.isObject(saveUser) && saveUser._id) {
                        let emailData = { name: saveUser.first_name, email: saveUser.email, password: readable_pass };
                        if (req.body.email_credential && req.body.email_credential == 'true') {
                            let sendMail = await this.mailer.sendMail(`${config.server.project_name}<${config.email.userName}>`, saveUser.email, `Signup`, 'admin-user-signup', emailData);
                            console.log('sendMail', sendMail);
                        }

                        req.flash('success', 'Account created successfully');
                        res.redirect('/user/list');
                    } else {
                        req.flash('error', "Failed to create new account");
                        res.redirect('/user/list');
                    }
                }
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/user/list");
        }
    };
    /* @Method: Logout
 // @Description: User Logout
 */
    async logout(req: Request, res: Response) {
        try {
            if(req.session){
                req.session = null;
                // req.session.destroy(function (err:any) {
                    res.redirect('/');
                // });
            }else{
                res.redirect('/'); 
            }
            
        } catch (e) {
            console.log(e);
            res.redirect('/');
        }
    };

    /* @Method: viewmyprofile
    // @Description: To get Admin Profile Info from db
    */
    async viewmyprofile(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            let user = await this.userRepo.getById(id);
            console.log(req.user, 'user');
            if (!_.isEmpty(user)) {
                res.render('modules/user/admin-account.ejs', {
                    page_name: 'admin-settings',
                    page_title: 'Account',
                    user: req.user,
                    response: user
                });
            }
        } catch (e: any) {
            return res.status(500).send({
                message: e.message
            });
        }
    };
    /**
     * //@Method:security
     * //@Description:To render admin security page
     */
    async security(req: Request, res: Response) {
        try {
            res.render('modules/user/admin-security.ejs', {
                page_name: 'admin-security',
                page_title: 'Security',
                user: req.user,
                current_token: req.session?.token
            });


        } catch (err: any) {
            return res.status(500).send({
                message: err.message
            });
        }
    };
    /**
     * //@Method:updateAdminProfile
     * //@Description:To update admin profile
     */
    async updateAdminProfile(req: Request | any, res: Response) {
        try {
            if (req.user && req.user.role.role != "admin") {
                req.flash("error", "You are not authorized");
                res.redirect('/admin/logout')
            } else {
                const id = new Types.ObjectId(req.body.id as string)
                req.body.email = req.body.email.trim().toLowerCase();
                let userAvail = await this.userRepo.getByField({ email: req.body.email, _id: { $ne: id }, isDeleted: false });
                if (userAvail) {
                    req.flash('error', "Email address already taken for some other account.");
                    res.redirect(`/admin/profile/${id}`);
                } else {
                    if (req.files && req.files.length) {
                        req.body.profile_image = req.files[0].filename
                    }

                    let userUpdate = await this.userRepo.updateById(req.body, id);
                    if (!_.isEmpty(userUpdate) && userUpdate?._id) {
                        req.flash('success', "Profile updated successfully.");
                        res.redirect('/user/dashboard');
                    } else {
                        req.flash('error', "Failed to update profile.");
                        res.redirect(`/admin/profile/${id}`);
                    }
                }
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/user/dashboard")
        }
    };
    /**
     * //@Method:adminUpdatePassword
     * //@Description:To update admin password
     */
    async adminUpdatePassword(req: Request, res: Response) {
        try {
            if (req.user && req.user.role.role != "admin") {
                req.flash("error", "You are not authorized");
                res.redirect('/admin/logout')
            } else {
                let user: any = await this.userRepo.getById(req.body.id);
                if (!_.isEmpty(user)) {
                    if (!bcrypt.compareSync(req.body.old_password, user.password)) {
                        req.flash('error', "Sorry old password mismatched!");
                        res.redirect(`/admin/security/${user._id}`);
                    } else {

                        if (req.body.password != req.body.old_password) {
                            let new_password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                            let userUpdate = await this.userRepo.updateById({
                                "password": new_password
                            }, user._id);

                            if (userUpdate && userUpdate._id) {
                                // req.flash('success', "Your password has been changed successfully.");
                                if(req.session){
                                    req.session = null;
                                    // req.session.destroy(function (err:any) {
                                        res.redirect('/')
                                    // });
                                }
                               
                                // res.redirect(namedRouter.urlFor("user.login"));

                            } else {
                                req.flash('error', "Failed to update password.");
                                res.redirect("/user/dashboard");
                            }
                        } else {
                            req.flash('error', "Your New Password And Old Password should not match.");
                            res.redirect(`/admin/security/${user._id}`);
                        }
                    }
                } else {
                    req.flash('error', "Something went wrong! No user found.");
                    res.redirect(`/admin/security/${user._id}`);
                }
            }
        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/user/dashboard");
        }
    };
    /**
     * //@Method:forgotPassword
     * //@Description:Admin forgot password 
     */
    async forgotPassword(req:Request,res:Response){
        try{
            console.log(req.body,'bdyyy');
            
            req.body.email = req.body.email.trim().toLowerCase().toString();
            let roleDetails = await this.roleRepo.getDistinctDocument( '_id', { role: { $in: ["admin"] } });
            let user = await this.userRepo.getByField({ email: req.body.email, role: { $in: roleDetails } });
            if (!user) {
                req.flash('error', "User not found");
                return res.redirect('/');
            } else {
                let user_details = await this.userRepo.updateById({ is_forgot_password_mail_active: true },user._id);
                if (!user_details) {
                    req.flash('error', "User not found");
                    return res.redirect('/');
                } else {

                    let emailData = { name: user.first_name,reset_password_link:`${config.server.admin_url}/user/forget/reset/password/${user_details._id}`, project_name:process.env.APP_NAME };
                   
                    let sendMail = await this.mailer.sendMail(`${config.server.project_name}<${config.email.userName}>`, user_details.email, `Reset Password`, 'admin-user-change-password', emailData);
                    console.log('sendMail', sendMail);

                    if (sendMail) {
                        req.flash('success', "Mail sent to your email address with new password");
                        return res.redirect('/');
                    } else {
                        req.flash('error', "Failed to trigger mail");
                        return res.redirect('/');
                    }
                }
            }

        }catch(err:any){
            console.log(err,'errr');
            
            req.flash("error",err.message);
            res.redirect("/");
        }
    };
    /**
     * //@Method:forgetResetPassword
     * //@Description:To render reset password page  for admin
     */
    async forgetResetPassword(req:Request,res:Response){
        try{
            res.render("layouts/loginLayout.ejs",{
                user_id:req.params.id,
                project_name:"Basic Setup Admin"
           })
        }catch(err:any){
            return res.status(500).send({message:err.message})
        }
    };
    /**
     * //@Method:updateResetPassword
     * //@Description:To update reeset password
     */
    async updateResetPassword(req:Request,res:Response){
        try{
            const checkUser=await this.userRepo.getById(req.body.id);
            
            if(checkUser){
                if(checkUser.is_forgot_password_mail_active !=true){
                    req.flash("error","Please request for forget password first");
                    res.redirect('/');
                }else{
                if(req.body.password !=req.body.confirm_password){
                    req.flash("error","Password and confirm password should be same");
                    res.redirect(`/user/forget/reset/password/${checkUser._id}`);
                }else{
                    req.body.password=bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
                    const updateUser=await this.userRepo.updateById({"password":req.body.password,"is_forgot_password_mail_active":false},checkUser._id);
                    if(!_.isEmpty(updateUser)){
                        req.flash("success","Password chnaged successfully");
                        res.redirect('/')
                    } else{
                        req.flash("error","Something went wrong");
                        res.redirect(`user.forget.reset.password/${checkUser._id}`);
                    } 
                }
               
            }
            }else{
                req.flash("error","User not found");
                res.redirect('/');  
            }

        }catch(err:any){
            req.flash("error",err.message);
            res.redirect('/');
        }
    }
    /**
     * //@Method:details
     * //@Description:To fetch details of any user
     */
    async details(req: Request, res: Response) {
        try {
            let details = await this.userRepo.getById(req.params.id as string);
            if (!_.isEmpty(details)) {
                res.render('modules/user/user-details.ejs', {
                    page_name: 'user-management',
                    page_title: 'Details',
                    user: req.user,
                    response: details
                });
            } else {
                req.flash('error', "Sorry User not found!");
                res.redirect("/user/list");
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/user/list");
        }
    };
    /**
     * //@Method:updateUser
     * //@Description:To update any user's details
     */
    async updateUser(req: Request | any, res: Response) {
        try {
            req.body.email = req.body.email.trim().toLowerCase();
            let chkEmail = {
                isDeleted: false,
                email: { $regex: '^' + req.body.email + '$', $options: 'i' },
                _id: { $ne: new Types.ObjectId(req.body.id) }
            };
            let checkEmail = await this.userRepo.getByField(chkEmail);
            if (!_.isEmpty(checkEmail)) {
                req.flash('error', "Email already used for another account.");
                res.redirect(`/user/view/${req.body.id}`);
            } else {
                let accountDetails = await this.userRepo.getById(req.body.id);
                if (!accountDetails) {
                    req.flash('error', "User not found");
                    res.redirect(`/user/view/${req.body.id}`);
                } else {
                    if (req.files && req.files.length) {
                        if (accountDetails.profile_image != '') {
                            if (existsSync('./public/uploads/profile_pic/' + accountDetails.profile_image))
                                unlinkSync('./public/uploads/profile_pic/' + accountDetails.profile_image)
                        }
                        req.body.profile_image = req.files[0].filename;
                    }
                    if (req.body.first_name && req.body.last_name) {
                        req.body.full_name = `${req.body.first_name} ${req.body.last_name}`
                    }
                    req.body.phone = req.body.phone.replace(/\s/g, '')
                    let userUpdate = await this.userRepo.updateById(req.body, new Types.ObjectId(req.body.id));
                    if (_.isObject(userUpdate) && userUpdate._id) {
                        req.flash('success', 'User updated successfully.');
                        res.redirect(`/user/view/${req.body.id}`);

                    } else {
                        req.flash('error', 'Failed to update User account.');
                        res.redirect(`/user/view/${req.body.id}`);
                    }
                }
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/user/list")
        }
    };
    /**
     * //@Method:userUpdatePassword
     * //@Description:To update user's password
     */
    async userUpdatePassword(req: Request, res: Response) {
        try {
            if (req.user && req.user.role.role != "admin") {
                req.flash("error", "You are not authorized");
                res.redirect('/admin/logout')
            } else {
                let user = await this.userRepo.getById(req.body.id);
                if (user && user._id) {
                    // console.log("new_password", req.body);
                    let new_password = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));

                    let userUpdate = await this.userRepo.updateById({
                        "password": new_password
                    }, user._id);

                    if (userUpdate && userUpdate._id) {
                        let emailData = { name: user.full_name, password: req.body.newPassword };
                        let sendMail = await this.mailer.sendMail(`${config.server.project_name}<${config.email.userName}>`, userUpdate.email, `Change Password`, 'user-change-password', emailData);
                        console.log('sendMail', sendMail);
                        //  console.log(mailsend,'mailsend');
                        req.flash('success', "Account password has been changed successfully.");
                    } else {
                        req.flash('error', "Failed to update password.");
                    }
                    res.redirect(`/user/view/${userUpdate?._id}`);
                } else {
                    req.flash('error', "Something went wrong! No account found.");
                    res.redirect("/user/list");
                }
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect("/user/list");
        }
    };
    /**
     * //@Method:statusChange
     * //@Description:To chnage status of any user
     */
    async statusChange(req: Request, res: Response) {
        try {
            if (req.user && req.user.role.role != "admin") {
                req.flash("error", "You are not authorized");
                res.redirect('/admin/logout')
            } else {
                const checkUser = await this.userRepo.getById(req.params.id as string);
                if (!checkUser) {
                    req.flash("error", "User not found");
                    res.redirect("/user/list");
                } else {
                    const status = checkUser.status == "Active" ? "Inactive" : "Active";
                    const updateUser = await this.userRepo.updateById({ "status": status }, checkUser._id);
                    if (!updateUser) {
                        req.flash("error", "Something went wrong");
                        res.redirect("/user/list");
                    } else {
                        req.flash("success", "Status chnaged updated successfully");
                        res.redirect("/user/list");
                    };
                }
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect('/user/list')
        }
    };
    /**
     * //@Method:delete
     * //@Description:To delete any user
     */
    async delete(req: Request, res: Response) {
        try {
            if (req.user && req.user.role.role != "admin") {
                req.flash("error", "You are not authorized");
                res.redirect('/admin/logout')
            } else {
                const checkUser = await this.userRepo.getById(req.params.id as string);
                if (!checkUser) {
                    req.flash("error", "User not found");
                    res.redirect("/user/list");
                } else {
                    if (existsSync('./public/uploads/profile_pic/' + checkUser.profile_image))
                        unlinkSync('./public/uploads/profile_pic/' + checkUser.profile_image)
                    const updateUser = await this.userRepo.updateById({ "isDeleted": true }, checkUser._id);
                    if (!updateUser) {
                        req.flash("error", "Something went wrong");
                        res.redirect("/user/list");
                    } else {
                        req.flash("success", "Status chnaged updated successfully");
                        res.redirect("/user/list");
                    };
                }
            }

        } catch (err: any) {
            req.flash("error", err.message);
            res.redirect('/user/list');
        }
    };
    /**
     * //@Method:bulkDelete
     * //@Description:To bulk delete user
     */
    async bulkDelete(req:Request, res:Response) {
        try {
            // console.log(req.body);
            if ((_.has(req.body, 'id')) && (!_.isEmpty(req.body.id))) {
                let userDelete = await this.userRepo.bulkDelete(req.body.id);

                res.status(200).send({ status: 200, data: userDelete, message: 'Users deleted successfully.' })
            } else {
                res.status(400).send({ status: 400, message: 'Please select a user first.' })
            }
        } catch (e:any) {
            return res.status(500).send({ message: e.message });
        }
    };
}