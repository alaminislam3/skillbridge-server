import Router, { Request, Response } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { ReviewRoutes } from "../modules/Review/review.route";

const router = Router();

const routerManager = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/tutors",
    route: TutorRoutes,
  },
  {
    path: "/createcategory",
    route: CategoryRoutes
  },
  {
    path : "/booking",
    route : BookingRoutes
  },
  {
    path : "/review",
    route : ReviewRoutes
  }
];

routerManager.forEach((r)=> router.use (r.path, r.route));

export default router;
