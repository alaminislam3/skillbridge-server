import express from 'express';
import { UserController } from './user.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/register",  UserController.registerUser)

router.post("/login" ,UserController.loginUser)

export const UserRoutes = router;
