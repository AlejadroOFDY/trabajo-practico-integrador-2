import { body, param } from "express-validator";
import { TagModel } from "../models/tag.model.js";

// Id
export const getTagByIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("No se encontró la etiqueta");
      }
    }),
];

// Crear
export const createTagValidation = [
  body("name")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres inclusive")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("El nombre no puede contener espacios");
      }
    })
    .custom(async (value) => {
      const existingTag = await TagModel.findOne({ name: value });
      if (existingTag) {
        throw new Error("Nombre de etiqueta registrado");
      }
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede exceder los 200 caracteres"),
];

// Actualizar
export const updateTagValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("No se encontró la etiqueta");
      }
    }),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El campo no puede estar vacío")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres inclusive")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("El nombre no puede contener espacios");
      }
    })
    .custom(async (value, { req }) => {
      const existingTag = await TagModel.findOne({
        name: value,
        _id: { $ne: req.params.id },
      });
      if (existingTag) {
        throw new Error("Nombre de etiqueta registrado");
      }
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede exceder los 200 caracteres"),
];

// Eliminar
export const deleteTagValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("No se encontró la etiqueta");
      }
    }),
];
