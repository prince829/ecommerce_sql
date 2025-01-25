import express, { Request } from "express";
const router = express()
import multer from "multer"
import { CategoryController } from "../../modules/category/controllers/Category.controller.js";
const request_param = multer();

const categoryController = new CategoryController();

router.all('/category*', auth.authenticate);

router.get('/category/list', async (req, res) => await categoryController.list(req, res));

router.get("/category/create", async (req, res) => await categoryController.create(req, res));

router.get("/category/edit/:id", async (req, res) => await categoryController.edit(req, res));


router.post('/category/getall', async (req, res) => {
  try {
    const success = await categoryController.getAll(req, res);
    res.send({
      "data": success.data
    });
  } catch (error: any) {
    res.status(error.status).send(error);
  }
});
router.post('/category/insert', request_param.any(), async (req, res) => await categoryController.insert(req, res));

router.post('/category/update', request_param.any(), async (req, res) => await categoryController.update(req, res));

//Status change
router.get('/category/change-status/:id', async (req, res) => await categoryController.statusChange(req, res));
//delete category
router.get('/category/delete/:id', async (req, res) => await categoryController.delete(req, res));
//bulk delete
router.post("/category/delete/bulk", request_param.any(), async (req, res) => await categoryController.bulkDelete(req, res));

export default router