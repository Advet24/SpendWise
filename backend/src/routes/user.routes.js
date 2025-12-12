import express from 'express';
import { getAllUser, getByEmail, getById, loginUser, registerUser } from '../controller/user.controller.js';
const router = express.Router();

router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.get('/' , getAllUser)
router.get('/:id' , getById)
router.get('/email/:email' , getByEmail)


export default router;