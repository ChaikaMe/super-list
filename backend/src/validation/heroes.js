import Joi from "joi";

export const createHeroSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).required(),
  real_name: Joi.string().min(3).max(50),
  origin_description: Joi.string().max(500),
  superpowers: Joi.array().items(Joi.string().min(3)),
  catch_phrase: Joi.string().max(100),
  images: Joi.array().items(Joi.string()),
});

export const updateHeroSchema = Joi.object({
  nickname: Joi.string().min(3).max(30),
  real_name: Joi.string().min(3).max(50),
  origin_description: Joi.string().max(500),
  superpowers: Joi.array().items(Joi.string().min(3)),
  catch_phrase: Joi.string().max(100),
  images: Joi.array().items(Joi.string()),
});
