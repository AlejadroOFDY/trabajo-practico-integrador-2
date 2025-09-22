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

const router = Router();

router.post("/", createArticleValidation, validator, createArticle);
router.get("/", getAllArticles);
router.get("/:id", getArticleByIdValidation, validator, getArticleById);
router.put("/:id", updateArticleValidation, validator, updateArticle);
router.delete("/:id", deleteArticleValidation, validator, deleteArticle);

export default router;
