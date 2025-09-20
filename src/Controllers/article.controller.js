import { ArticleModel } from "../Models/article.model.js";

// crear
export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, status, author, tags } = req.body;

    const newArticle = await ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      author,
      tags,
    });
    return res.status(201).json({
      ok: true,
      data: newArticle,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// todos
export const getAllArticles = async (req, res) => {
  try {
    const article = await ArticleModel.find();
    return res.status(200).json({
      ok: true,
      data: article,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// id
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findById(id);
    return res.status(200).json({
      ok: true,
      data: article,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// actualizar
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, status, author, tags } = req.body;
    const article = await ArticleModel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        status,
        author,
        tags,
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      msg: "Actualización exitosa",
      data: article,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// eliminar
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await ArticleModel.findByIdAndDelete(id);

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
