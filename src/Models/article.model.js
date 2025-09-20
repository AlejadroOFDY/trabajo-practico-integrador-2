import { Schema, Types, model } from "mongoose";

const ArticleSchema = new Schema(
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
      enum: ["published", "archived"],
      defaultValue: "published",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ArticleModel = model("Article", ArticleSchema);
