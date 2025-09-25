import { Router } from "express";

import {
  createArticle,
  getAllArticles,
  getArticleById,
  getMyArticle,
  updateArticle,
  deleteArticle,
} from "../Controllers/article.controller.js";

import {
  extraTag,
  deleteTagFromArticle,
} from "../Controllers/articleTag.controller.js";

import { validator } from "../Middlewares/validator.js";

import {
  createArticleValidation,
  getArticleByIdValidation,
  updateArticleValidation,
  deleteArticleValidation,
} from "../Middlewares/Validations/article.validations.js";

import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../Middlewares/ownerOrAdmin.middleware.js";

const router = Router();

router.post(
  "/",
  createArticleValidation,
  validator,
  authMiddleware,
  createArticle
);
router.post(
  "/:articleId/tags/:tagId",
  validator,
  ownerOrAdminMiddleware,
  extraTag
);
router.get("/", authMiddleware, getAllArticles);
router.get("/my", authMiddleware, getMyArticle);
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
  ownerOrAdminMiddleware,
  updateArticle
);
router.delete(
  "/:id",
  deleteArticleValidation,
  validator,
  ownerOrAdminMiddleware,
  deleteArticle
);
router.delete(
  "/:articleId/tags/:tagId",
  validator,
  ownerOrAdminMiddleware,
  deleteTagFromArticle
);

export default router;
