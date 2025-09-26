import { CommentModel } from "../Models/comment.model.js";

// crear
export const createComment = async (req, res) => {
  try {
    const { content, author, article } = req.body;

    const newComment = await CommentModel.create({
      content,
      author,
      article,
    });
    return res.status(201).json({
      ok: true,
      data: newComment,
    });
  } catch (error) {
    console.log(error);
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

// my Comment
export const getMyComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const myComment = await CommentModel.findOne({ author: userId });
    return res.status(200).json({
      ok: true,
      data: myComment,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// get Comment By Article
export const getCommentByArticle = async (req, res) => {
  try {
    const articleId = req.params;
    const comments = await CommentModel.find({
      article: articleId,
    }).populate("author");
    return res.status(200).json({ ok: true, data: comments });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error Interno del Servidor",
    });
  }
};

// actualizar
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author, article } = req.body;
    const comment = await CommentModel.findByIdAndUpdate(
      id,
      {
        content,
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
