import express from 'express';
import {verifyToken as auth} from '../middleware/auth.js';
import { CategoryController } from '../controller/category.controller.js';

const router = express.Router();

router.use(auth);

router.get("/", CategoryController.list);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.remove);

export default router;