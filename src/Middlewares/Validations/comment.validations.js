import { body, param } from "express-validator";
import { CommentModel } from "../../Models/comment.model.js";
import { UserModel } from "../../Models/user.model.js";
import { ArticleModel } from "../../Models/article.model.js";

// Id
export const getCommentByIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const comment = await CommentModel.findById(value);
      if (!comment) {
        throw new Error("No se encontró el comentario");
      }
    }),
];

// Crear
export const createCommentValidation = [
  body("content")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isLength({ min: 5, max: 500 })
    .withMessage("El contenido debe tener entre 5 y 500 caracteres inclusive"),
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
  body("article")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const article = await ArticleModel.findById(value);
      if (!article) {
        throw new Error("No se encontró el artículo");
      }
    }),
];

// Actualizar
export const updateCommentValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const comment = await CommentModel.findById(value);
      if (!comment) {
        throw new Error("No se encontró el comentario");
      }
    }),
  body("content")
    .optional()
    .notEmpty()
    .withMessage("El campo no puede estar vacío")
    .isLength({ min: 5, max: 500 })
    .withMessage("El contenido debe tener entre 5 y 500 caracteres inclusive"),
];

// Eliminar
export const deleteCommentValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const comment = await CommentModel.findById(value);
      if (!comment) {
        throw new Error("No se encontró el comentario");
      }
    }),
];
