import { Router } from "express";

import { register, login, logout } from "../Controllers/auth.controller.js";

import { validator } from "../Middlewares/validator.js";

import { createUserValidation } from "../Middlewares/Validations/user.validations.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/register", createUserValidation, validator, register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

export default router;
