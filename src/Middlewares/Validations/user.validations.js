import { body, param } from "express-validator";
import { UserModel } from "../../Models/user.model.js";
// Id
export const getUserByIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("No se encontró al usuario");
      }
    }),
];

// Crear
export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres inclusive")
    .custom(async (value) => {
      const existingUser = await UserModel.findOne({ username: value });
      if (existingUser) {
        throw new Error("Username registrado");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isEmail()
    .withMessage("El email debe ser válido")
    .custom(async (value) => {
      const existingEmail = await UserModel.findOne({ email: value });
      if (existingEmail) {
        throw new Error("Email registrado");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una minúscula")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una mayúscula")
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número"),
  body("profile.firstName")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isLength({ min: 2, max: 50 })
    .withMessage("El firstName debe tener entre 2 y 50 caracteres inclusive"),
  body("profile.lastName")
    .notEmpty()
    .withMessage("Faltan campos obligatorios")
    .isLength({ min: 2, max: 50 })
    .withMessage("El lastName debe tener entre 2 y 50 caracteres inclusive"),
  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biography no puede exceder los 500 caracteres"),
  body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("El avatarUrl debe ser una URL válida"),
];

// Actualizar
export const updateUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("No se encontró al usuario");
      }
    }),
  body("username")
    .optional()
    .notEmpty()
    .withMessage("El campo no puede estar vacío")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres inclusive")
    .custom(async (value, { req }) => {
      const existingUser = await UserModel.findOne({
        username: value,
        _id: { $ne: req.params.id },
      });
      if (existingUser) {
        throw new Error("Username registrado");
      }
    }),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("El campo no puede estar vacío")
    .isEmail()
    .withMessage("El email debe ser válido")
    .custom(async (value, { req }) => {
      const existingEmail = await UserModel.findOne({
        email: value,
        _id: { $ne: req.params.id },
      });
      if (existingEmail) {
        throw new Error("Email registrado");
      }
    }),
  body("profile.firstName")
    .optional()
    .notEmpty()
    .withMessage("El campo no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage("El firstName debe tener entre 2 y 50 caracteres inclusive"),
  body("profile.lastName")
    .optional()
    .notEmpty()
    .withMessage("El campo no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage("El lastName debe tener entre 2 y 50 caracteres inclusive"),
  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biography no puede exceder los 500 caracteres"),
  body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("El avatarUrl debe ser una URL válida"),
];

// Eliminar
export const deleteUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("Id inválida")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("No se encontró al usuario");
      }
    }),
];
