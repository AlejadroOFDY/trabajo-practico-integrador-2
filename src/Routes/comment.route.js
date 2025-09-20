import { Router } from "express";

import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from "../Controllers/comment.controller.js";

const router = Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
