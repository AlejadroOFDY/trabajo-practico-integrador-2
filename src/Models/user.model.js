import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      defaultValue: "user",
    },
    profile: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      biography: {
        type: String,
      },
      avatarUrl: {
        type: String,
      },
      birthDate: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
