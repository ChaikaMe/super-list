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
import { parseSortParams } from "../utils/parseSortParams.js";

export const getHeroesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const responce = await getHeroes({
    page,
    perPage,
    sortBy,
    sortOrder,
  });
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
  const hero = await createHero({ ...req.body });
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
  const { heroId } = req.params;
  const photoUrls = req.files
    ? await photoHandler(req.files)
    : req.body.images;
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
