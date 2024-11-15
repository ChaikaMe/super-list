import { Schema, model } from "mongoose";

const heroSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    real_name: {
      type: String,
    },
    origin_description: {
      type: String,
    },
    superpowers: {
      type: [String],
    },
    catch_phrase: {
      type: String,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const HeroesCollection = model("heroes", heroSchema);
