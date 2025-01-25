import express,{Request} from "express";
import { existsSync, mkdirSync } from "fs";
const router = express()
import multer from "multer"
import { UserController } from "../../modules/users/controllers/User.controller.js";

const storage = multer.diskStorage({
    destination: function (_req:Request, _file, callback) {
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
  });
  const request_param=multer();

const userController = new UserController();


// login render route
router.get('/', userController.login);

//For Admin Signin
router.post('/admin/login', async(req, res) => await userController.signin(req, res));

//Admin forgot password

router.post( '/admin/forgotpassword', request_param.any(), async(req,res)=>await userController.forgotPassword(req,res));
//Reset Password page
router.get(`/user/forget/reset/password/:id`, async(req,res)=>await userController.forgetResetPassword(req,res));

router.post(`/user/forget/reset/password/update`,request_param.any(), async(req,res)=>await userController.updateResetPassword(req,res));

router.all('/*',auth.authenticate);

// admin logout
router.get("/admin/logout", async(req, res) => await userController.logout(req, res));

// admin profile
router.get('/admin/profile/:id', request_param.any(), async(req,res)=>await userController.viewmyprofile(req,res));

// admin update profile
router.post('/admin/updateProfile', uploadFile.any(), async(req,res)=>await userController.updateAdminProfile(req,res));

//admin Security
router.get('/admin/security/:id', async(req,res)=>await userController.security(req,res));

//admin password change
router.post('/update/admin-password', request_param.any(), async(req,res)=>await userController.adminUpdatePassword(req,res));

//For Dashboard Rendering
router.get('/user/dashboard',async (req,res)=>await userController.dashboard(req,res));

router.get('/user/list',async(req, res) => await userController.list(req, res));

router.get("/user/view/:id", async(req, res) => await userController.details(req, res));

router.post('/user/getall', async (req, res) => {
  try {
      const success = await userController.getAll(req, res);
      res.send({
          "meta": success.meta,
          "data": success.data
      });
  } catch (error:any) {
      res.status(error.status).send(error);
  }
});
//Create User
router.post('/user/create',uploadFile.any(),async(req,res)=>await userController.insert(req,res));
//Update User
router.post('/user/update',uploadFile.any(),async(req,res)=>await userController.updateUser(req,res));
//Password chnage of any user
router.post('/user/change-password',uploadFile.any(),async(req,res)=>await userController.userUpdatePassword(req,res));
//Status change
router.get('/user/change-status/:id',async(req,res)=>await userController.statusChange(req,res));
//delete user
router.get('/user/delete/:id',async(req,res)=>await userController.delete(req,res));
//bulk delete
router.post("/user/delete/bulk", request_param.any(), async(req,res)=>await userController.bulkDelete(req,res)); 

export default router