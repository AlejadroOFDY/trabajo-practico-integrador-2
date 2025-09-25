import { ArticleModel } from "../Models/article.model.js";
import { TagModel } from "../Models/tag.model.js";

export const extraTag = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const articulo = await ArticleModel.findById(articleId);
    const tag = await TagModel.findById(tagId);

    const tagAgreggate = await ArticleModel.findByIdAndUpdate(articleId, {
      $addToSet: { tags: tagId },
    });
    return res.status(200).json({ ok: true, msg: "Operación exitosa" });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteTagFromArticle = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const articulo = await ArticleModel.findById(articleId);
    const tag = await TagModel.findById(tagId);

    const deleteTag = await ArticleModel.findByIdAndUpdate(articleId, {
      $pull: { tags: tagId },
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
