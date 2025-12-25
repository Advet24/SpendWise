import express from 'express';
import {verifyToken as auth} from '../middleware/auth.js';
import { SubCategoryController } from '../controller/subcategory.controller.js';


const router = express.Router();

router.use(auth);

router.get("/:categoryId", SubCategoryController.getByCategory);
router.post("/", SubCategoryController.create);
router.put("/:id", SubCategoryController.update);
router.delete("/:id", SubCategoryController.delete);

export default router;
