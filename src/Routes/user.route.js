import { Router } from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controllers/user.controller.js";

import { validator } from "../Middlewares/validator.js";

import {
  getUserByIdValidation,
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
} from "../Middlewares/Validations/user.validations.js";

import { authMiddleware } from "../Middlewares/auth.middleware.js";

import { adminMiddleware } from "../Middlewares/Validations/admin.middleware.js";

const router = Router();

router.post("/", createUserValidation, validator, createUser);
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get(
  "/:id",
  getUserByIdValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  getUserById
);
router.put(
  "/:id",
  updateUserValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  updateUser
);
router.delete(
  "/:id",
  deleteUserValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  deleteUser
);

export default router;
