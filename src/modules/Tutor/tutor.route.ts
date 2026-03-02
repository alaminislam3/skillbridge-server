import express from 'express';
import { TutorController } from './tutor.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.get("/", /* auth(UserRole.student, UserRole.admin), */TutorController.getAllTutorProfile)
router.get("/:id", auth(UserRole.student, UserRole.admin),TutorController.getSingleTutorProfile)
router.post("/createprofile", auth(UserRole.tutor),TutorController.createTutorProfile)
router.patch("/:id", auth(UserRole.tutor),TutorController.updateTutorProfile)


export const TutorRoutes = router;
