import { Schema, Types, model } from "mongoose";

const ArticleSchema = new Schema(
  "Article",
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    status: {
      type: String,
      enum: ("published", "archived"),
      defaultValue: "archived",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ArticleModel = model("Article", ArticleSchema);
