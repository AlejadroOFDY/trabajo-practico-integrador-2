import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
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
    versionKey: false,
  }
);

export const CommentModel = model("Comment", CommentSchema);
