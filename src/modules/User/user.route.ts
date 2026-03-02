import express from 'express';
import { UserController } from './user.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/register",  UserController.registerUser)

router.post("/login" ,UserController.loginUser)

router.patch("/ban/:id", auth(UserRole.admin),UserController.banUser)


export const UserRoutes = router;
