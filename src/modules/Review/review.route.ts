import express from 'express';
import { ReviewController } from './review.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/", auth(UserRole.student),ReviewController.createReview)

export const ReviewRoutes = router;
