import express from 'express';
import { AccountController } from '../controller/account.controller.js';
import { verifyToken as auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/',auth ,  AccountController.getAllAccount);
router.post('/add',auth ,  AccountController.createAccount);
router.get('/:id',auth , AccountController.getAccountById);
router.put('/:id',auth , AccountController.updateAccount);
router.delete('/:id',auth , AccountController.deleteAccount);

export default router;