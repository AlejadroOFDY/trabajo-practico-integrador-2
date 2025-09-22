import { Router } from "express";

import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from "../Controllers/comment.controller.js";

import { validator } from "../Middlewares/validator.js";

import {
  getCommentByIdValidation,
  createCommentValidation,
  updateCommentValidation,
  deleteCommentValidation,
} from "../Middlewares/Validations/comment.validations.js";

const router = Router();

router.post("/", createCommentValidation, validator, createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentByIdValidation, validator, getCommentById);
router.put("/:id", updateCommentValidation, validator, updateComment);
router.delete("/:id", deleteCommentValidation, validator, deleteComment);

export default router;
