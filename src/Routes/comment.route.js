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

import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  createCommentValidation,
  validator,
  authMiddleware,
  createComment
);
router.get("/", authMiddleware, getAllComments);
router.get(
  "/:id",
  getCommentByIdValidation,
  validator,
  authMiddleware,
  getCommentById
);
router.put(
  "/:id",
  updateCommentValidation,
  validator,
  authMiddleware,
  updateComment
);
router.delete(
  "/:id",
  deleteCommentValidation,
  validator,
  authMiddleware,
  deleteComment
);

export default router;
