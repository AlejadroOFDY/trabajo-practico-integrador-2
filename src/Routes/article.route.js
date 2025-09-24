import { Router } from "express";

import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../Controllers/article.controller.js";

import { validator } from "../Middlewares/validator.js";

import {
  createArticleValidation,
  getArticleByIdValidation,
  updateArticleValidation,
  deleteArticleValidation,
} from "../Middlewares/Validations/article.validations.js";

import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { adminMiddleware } from "../Middlewares/Validations/admin.middleware.js";

const router = Router();

router.post(
  "/",
  createArticleValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  createArticle
);
router.get("/", authMiddleware, getAllArticles);
router.get(
  "/:id",
  getArticleByIdValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  getArticleById
);
router.put(
  "/:id",
  updateArticleValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  updateArticle
);
router.delete(
  "/:id",
  deleteArticleValidation,
  validator,
  authMiddleware,
  adminMiddleware,
  deleteArticle
);

export default router;
