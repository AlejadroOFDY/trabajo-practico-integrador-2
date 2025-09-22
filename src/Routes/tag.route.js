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

const router = Router();

router.post("/", createTagValidation, validator, createTag);
router.get("/", getAllTags);
router.get("/:id", getTagByIdValidation, validator, getTagById);
router.put("/:id", updateTagValidation, validator, updateTag);
router.delete("/:id", deleteTagValidation, validator, deleteTag);

export default router;
