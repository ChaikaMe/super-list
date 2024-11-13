import createHttpError from "http-errors";
import {
  createHero,
  deleteHero,
  getHeroById,
  getHeroes,
  updateHero,
} from "../services/heroes.js";
import { parsePaginationParams } from "../utils/pagination/parsePaginationParams.js";
import { photoHandler } from "../middlewares/photoHandler.js";

export const getHeroesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const responce = await getHeroes({ page, perPage });
  res.status(200).json(responce);
};

export const getHeroByIdController = async (req, res) => {
  const { heroId } = req.params;
  const hero = await getHeroById(heroId);

  if (!hero) {
    throw createHttpError(404, "Hero not found...");
  }

  res.status(200).json(hero);
};

export const createHeroController = async (req, res) => {
  const photoUrls = await photoHandler(req.files);
  const hero = await createHero({ ...req.body, images: photoUrls });

  res.status(201).json(hero);
};

export const deleteHeroController = async (req, res, next) => {
  const { heroId } = req.params;

  const hero = await deleteHero(heroId);

  if (!hero) {
    next(createHttpError(404, "Hero not found"));
    return;
  }

  res.status(204).send();
};

export const patchHeroController = async (req, res, next) => {
  const photoUrls = await photoHandler(req.files);
  const { heroId } = req.params;
  const updates = {
    ...req.body,
    images: photoUrls,
  };
  const result = await updateHero(heroId, updates);

  if (!result) {
    next(createHttpError(404, "Hero not found"));
    return;
  }

  res.json(result.hero);
};
