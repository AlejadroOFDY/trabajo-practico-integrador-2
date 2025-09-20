import { Schema, model, Types } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      uniqe: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TagModel = model("Tag", TagSchema);
