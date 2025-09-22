import { UserModel } from "../Models/user.model.js";
import { ArticleModel } from "../Models/article.model.js";
import { CommentModel } from "../Models/comment.model.js";
import { TagModel } from "../Models/tag.model.js";

// crear
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;

    const newUser = await UserModel.create({
      username,
      email,
      password,
      role,
      profile,
    });
    return res.status(201).json({
      ok: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// todos
export const getAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find().populate("articles");
    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate("articles");
    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// actualizar
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role, profile } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password,
        role,
        profile,
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      msg: "Actualización exitosa",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// eliminar
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await ArticleModel.deleteMany({ author: id });
    await TagModel.updateMany({ tags: id }, { $pull: { tags: id } });
    await CommentModel.deleteMany({ author: id });
    await UserModel.findById(id, {
      deleted: true,
    });

    return res.status(200).json({
      ok: true,
      msg: "Eliminación exitosa",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
