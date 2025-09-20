import { CommentModel } from "../Models/comment.model.js";

// crear
export const createComment = async (req, res) => {
  try {
    const { cotent, author, article } = req.body;

    const newComment = await CommentModel.create({
      cotent,
      author,
      article,
    });
    return res.status(201).json({
      ok: true,
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// todos
export const getAllComments = async (req, res) => {
  try {
    const comment = await CommentModel.find();
    return res.status(200).json({
      ok: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// id
export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findById(id);
    return res.status(200).json({
      ok: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// actualizar
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { cotent, author, article } = req.body;
    const comment = await CommentModel.findByIdAndUpdate(
      id,
      {
        cotent,
        author,
        article,
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      msg: "Actualización exitosa",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// eliminar
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await CommentModel.findByIdAndDelete(id);

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
