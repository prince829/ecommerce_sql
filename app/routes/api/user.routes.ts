import express, { Request } from "express";
import { existsSync, mkdirSync } from "fs";
const router = express()
import multer from "multer"
import { UserController } from "../../modules/webservices/User.controller.js";

const storage = multer.diskStorage({
    destination: function (_req: Request, _file, callback) {
        if (!existsSync('./public/uploads/profile_pic')) {
            mkdirSync('./public/uploads/profile_pic');
        }

        callback(null, "./public/uploads/profile_pic")
    },
    filename: function (_req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});
const uploadFile = multer({
    storage: storage
})

const userController = new UserController();

router.get('/video/stream', async (req, res) => {

    try {
        const success = await userController.videoStream(req, res);
        res.status(200).send(success);
    }
    catch (error: any) {
        res.status(error.status).send(error);
    }
});

router.post('/user/signup', async (req, res) => {

    try {
        const success = await userController.signup(req, res);
        res.status(success.status).send(success);
    }
    catch (error: any) {
        res.status(error.status).send(error);
    }
});
router.post('/user/signin', async (req, res) => {

    try {
        const success = await userController.signIn(req, res);
        res.status(success.status).send(success);
    }
    catch (error: any) {
        res.status(error.status).send(error);
    }
});
// router.all('/user*', global.auth.authenticateAPI)
router.get('/user/details', async (req, res) => {

    try {
        const success = await userController.profileDetails(req, res);
        res.status(success.status).send(success);
    }
    catch (error: any) {
        res.status(error.status).send(error);
    }
});
router.post('/user/update', uploadFile.any(), async (req, res) => {

    try {
        const success = await userController.updateProfile(req, res);
        res.status(success.status).send(success);
    }
    catch (error: any) {
        res.status(error.status).send(error);
    }
});

export default router