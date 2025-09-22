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

const router = Router();

router.post("/", createUserValidation, validator, createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserByIdValidation, validator, getUserById);
router.put("/:id", updateUserValidation, validator, updateUser);
router.delete("/:id", deleteUserValidation, validator, deleteUser);

export default router;
