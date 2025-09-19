import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
  "Comment",
  {
    content: {
      type: String,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    article: {
      type: Types.ObjectId,
      ref: "Article",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = model("Comment", CommentSchema);
