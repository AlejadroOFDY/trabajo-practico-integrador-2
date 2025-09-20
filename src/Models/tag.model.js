import { Schema, model, Types } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

TagSchema.virtual("article", {
  ref: "Article",
  localField: "_id",
  foreignField: "tags",
});

export const TagModel = model("Tag", TagSchema);
