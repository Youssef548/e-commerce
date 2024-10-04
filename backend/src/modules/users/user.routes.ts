// src/modules/users/user.routes.ts
import { Router } from "express";
import {
  getUsers,
  addUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
} from "./user.controller";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import { createUserShcema, deleteUserSchema, userSchema } from "./schema";

const router = Router();

router
  .post("/", validate(createUserShcema), addUser)
  .get("/", authenticate, authorizeAdmin, getUsers);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, validate(userSchema), updateCurrentUserProfile);

router.delete(
  "/:userId",
  authenticate,
  authorizeAdmin,
  validate(deleteUserSchema),
  deleteUserById
);
export default router;
