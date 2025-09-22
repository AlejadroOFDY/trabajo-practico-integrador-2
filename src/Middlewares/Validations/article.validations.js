import { body, param } from "express-validator";
import { ArticleModel } from "../../Models/article.model.js";
import { UserModel } from "../../Models/user.model.js";

// Id
export const getArticleByIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("No se encontró el artículo");
      }
    }),
];

// Crear
export const createArticleValidation = [
  body("title")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres inclusive"),
  body("content")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede exceder los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser 'published' o 'archived'"),
  body("author")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("No se encontró el autor");
      }
    }),
];

// Actualizar
export const updateArticleValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("No se encontró el artículo");
      }
    }),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El campo no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres inclusive"),
  body("content")
    .optional()
    .notEmpty()
    .withMessage("El campo no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El excerpt no puede exceder los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser 'published' o 'archived'"),
];

// Eliminar
export const deleteArticleValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("No se encontró el artículo");
      }
    }),
];
