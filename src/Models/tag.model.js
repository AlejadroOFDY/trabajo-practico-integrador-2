import { Schema, model, Types } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const TagModel = model("Tag", TagSchema);
