import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type ReviewPayload = {
  rating: number;
  comment: string;
  bookingId: string;
};

const createReview = async (payload: ReviewPayload, userId: string) => {

  // ✅ 1. bookingId validation
  if (!payload.bookingId) {
    throw new Error("bookingId is required");
  }

  // ✅ 2. user check
  const userCheck = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userCheck) {
    throw new Error("user isn't valid");
  }

  // ✅ 3. booking check
  const bookingCheck = await prisma.booking.findUnique({
    where: {
      id: payload.bookingId,
    },
  });

  if (!bookingCheck) {
    throw new Error("booking not found");
  }

  // ✅ 4. ownership check (security)
  if (bookingCheck.studentId !== userId) {
    throw new Error("You are not allowed to review this booking");
  }

  // ✅ 5. status check (best = COMPLETED)
  if (bookingCheck.status !== "CONFIRMED") {
    throw new Error("booking must be CONFIRMED first");
  }

  // ✅ 6. duplicate review check
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (existingReview) {
    throw new Error("Review already exists for this booking");
  }

  // ✅ 7. get TutorProfile (🔥 IMPORTANT FIX)
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: {
      userId: bookingCheck.tutorId, // booking এ আছে User.id
    },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }

  // ✅ 8. create review (FINAL)
  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      bookingId: payload.bookingId,
      studentId: userId,
      tutorId: tutorProfile.id, // ✅ CORRECT (TutorProfile.id)
    },
  });

  return result;
};
export const ReviewService = {
createReview    
};