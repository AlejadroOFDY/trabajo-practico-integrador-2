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

const router = Router();

router.post(
  "/",
  createArticleValidation,
  validator,
  authMiddleware,
  createArticle
);
router.get("/", authMiddleware, getAllArticles);
router.get(
  "/:id",
  getArticleByIdValidation,
  validator,
  authMiddleware,
  getArticleById
);
router.put(
  "/:id",
  updateArticleValidation,
  validator,
  authMiddleware,
  updateArticle
);
router.delete(
  "/:id",
  deleteArticleValidation,
  validator,
  authMiddleware,
  deleteArticle
);

export default router;
