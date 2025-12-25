import express from 'express';
import { getAllUser, getByEmail, getById, loginUser, registerUser } from '../controller/user.controller.js';
const router = express.Router();

router.get('/', getAllUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/email/:email', getByEmail)
router.get('/:id', getById)


export default router;