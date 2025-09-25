import { Router } from "express";

import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../Controllers/tag.controller.js";

import { validator } from "../Middlewares/validator.js";

import {
  getTagByIdValidation,
  createTagValidation,
  updateTagValidation,
  deleteTagValidation,
} from "../Middlewares/Validations/tag.validations.js";

import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { adminMiddleware } from "../Middlewares/Validations/admin.middleware.js";

const router = Router();

router.post(
  "/",
  createTagValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  createTag
);
router.get("/", authMiddleware, getAllTags);
router.get("/:id", getTagByIdValidation, validator, authMiddleware, getTagById);
router.put(
  "/:id",
  updateTagValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  updateTag
);
router.delete(
  "/:id",
  deleteTagValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  deleteTag
);

export default router;
