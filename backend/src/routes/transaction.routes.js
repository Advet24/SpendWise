import express from 'express';
import {verifyToken as auth} from '../middleware/auth.js';
import { TransactionController } from '../controller/transaction.controller.js';

export const router = express.Router();



router.post("/", auth, TransactionController.create);
router.get("/", auth, TransactionController.getAll);
router.put("/:id", auth, TransactionController.update);
router.delete("/:id", auth, TransactionController.delete);

export default router;