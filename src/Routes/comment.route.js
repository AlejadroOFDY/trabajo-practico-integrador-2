import { Router } from "express";

import {
  createComment,
  getAllComments,
  getCommentById,
  getCommentByArticle,
  getMyComment,
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
import { ownerOrAdminMiddleware } from "../Middlewares/ownerOrAdmin.middleware.js";

const router = Router();

router.post(
  "/",
  createCommentValidation,
  validator,
  authMiddleware,
  createComment
);
router.get("/comments/article/:articleId", authMiddleware, getCommentByArticle);
router.get("/my", authMiddleware, getMyComment);
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
  ownerOrAdminMiddleware,
  updateComment
);
router.delete(
  "/:id",
  deleteCommentValidation,
  validator,
  authMiddleware,
  ownerOrAdminMiddleware,
  deleteComment
);

export default router;
