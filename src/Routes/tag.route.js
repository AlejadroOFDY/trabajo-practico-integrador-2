import { Router } from "express";

import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../Controllers/tag.controller.js";

const router = Router();

router.post("/", createTag);
router.get("/", getAllTags);
router.get("/:id", getTagById);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;
