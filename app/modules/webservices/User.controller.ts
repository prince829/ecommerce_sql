
import { UserRepository } from "../users/repositories/User.repository.js";
import { IResponse } from "../../helper/IResponse.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { RoleRepository } from "../roles/repository/Role.repository.js";
import { Request, Response } from "express";
import { config } from "../../config/config.js";
import { CreateUser } from "../../interface/UserInterface.js";
import { existsSync, unlinkSync } from "fs"
const { createCipheriv, createDecipheriv } = await import('node:crypto');
import { launch, getStream, wss } from "puppeteer-stream";
import fs from "fs";
import voiceStream from './meidia.js';
import path from 'path';

export class UserController {
    protected userRepo = new UserRepository();
    protected roleRepo = new RoleRepository();
    /**
     * //@Method:signup
     * //@Description:For registering any user
     */
    async signup(req: Request<{}, {}, CreateUser>, _res: Response): Promise<IResponse> {
        try {
            let role = await this.roleRepo.getByField({ "role": "admin" });
            if (!role) {
                return { success: false, message: "Role not found", status: 400 }
            };
            req.body.email = req.body.email.toLowerCase().trim();
            const checkUser = await this.userRepo.getByField({ "email": req.body.email, "isDeleted": false });
            if (checkUser) {
                return { success: false, message: "User already exist", status: 202 }
            };
            if (req.body.password !== req.body.confirm_password)
                return { success: false, message: "Password and confirm password should be same", status: 400 };
            req.body.roleId = role.id;
            req.body.full_name = `${req.body.first_name} ${req.body.last_name}`
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            const saveUser = await this.userRepo.save(req.body);
            if (!saveUser) {
                return { success: false, message: "Something went wrong", status: 400 }
            } else {
                return { success: true, message: "Successfully registered", status: 200, data: saveUser }
            }


        } catch (err: any) {
            return { success: false, message: err.message, status: 500 }
        }
    };
    /**
    * //@Method:signIn
    * //@Description:For signin any user
    */
    async signIn(req: Request | any, res: Response): Promise<IResponse> {
        try {
            let { email, password } = req.body;
            // let roleData = await this.roleRepo.getByField({ "role": role });
            // if (!roleData) {
            //     return { success: false, message: "Role not found", status: 202 }
            // };

            req.body.email = req.body.email.toLowerCase().trim();
            let checkUser = await this.userRepo.getByField({ "email": email, "isDeleted": false, 'status': "Active" });
            if (!checkUser) {
                return { success: false, message: "User not found", status: 202 }
            } else {
                if (!bcrypt.compareSync(password, checkUser.password))
                    return { success: false, message: "Invalid password", status: 202 };
                let payload = {
                    id: checkUser._id
                }
                const token = jwt.sign(payload, config.server.jwtSecret, {
                    expiresIn: '30d',
                });
                return { success: true, message: "Loggedin successfully", status: 200, data: { user: checkUser, token } }
            }

        } catch (err: any) {
            return { success: false, message: err.message, status: 500 }
        }
    };
    /**
     * //@Method:profileDetails
     * //@Description:To fetch profile details of any user
     */
    async profileDetails(req: Request | any, res: Response): Promise<IResponse> {
        try {
            const checkUser = await this.userRepo.getById(req.user?._id);
            if (!checkUser) {
                return { success: false, message: "User not found", status: 202 }
            } else {
                return { success: true, message: "Profile details fetched successfully", status: 200, data: checkUser }
            }

        } catch (err: any) {
            return { success: false, message: err.message, status: 500 }
        }
    };
    /**
     * //@Method:updateProfile
     * //@Description:To update profile
     */
    async updateProfile(req: Request, _res: Response): Promise<IResponse> {
        try {
            if (req.files && req.files.length) {
                if (req.user?.profile_image != "" && existsSync('./public/uploads/profile_pic/' + req.user?.profile_image)) {
                    unlinkSync('./public/uploads/profile_pic/' + req.user?.profile_image);
                }
                const files: any = req.files
                req.body.profile_image = files[0].filename;
            }
            const updateuser = await this.userRepo.updateById(req.body, req.user?._id);
            if (!updateuser) {
                return { success: false, message: "Something went wrong", status: 400 }
            } else {
                return { success: true, message: "Profile details updated successfully", status: 200, data: updateuser }
            }
        } catch (err: any) {
            return { success: false, message: err.message, status: 500 }
        }
    };
    /**
     * //@Method:videoStream
     * //@Description:To stream video
     */
    async videoStream(req: Request, res: Response) {
        try {
            await voiceStream();


        } catch (err: any) {
            console.log(err, 'errrrrrrrr');

            return { status: 500, message: err.message }
        }
    }


}