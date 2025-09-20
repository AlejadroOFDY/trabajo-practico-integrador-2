import { TagModel } from "../Models/tag.model.js";

// crear
export const createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newTag = await TagModel.create({
      name,
      description,
    });
    return res.status(201).json({
      ok: true,
      data: newTag,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// todos
export const getAllTags = async (req, res) => {
  try {
    const tag = await TagModel.find().populate("article");
    return res.status(200).json({
      ok: true,
      data: tag,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// id
export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await TagModel.findById(id).populate("article");
    return res.status(200).json({
      ok: true,
      data: tag,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// actualizar
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const tag = await TagModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      msg: "Actualización exitosa",
      data: tag,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// eliminar
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    await TagModel.findByIdAndDelete(id);

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
