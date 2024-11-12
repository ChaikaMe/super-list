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
  const heroes = await getHeroes({ page, perPage });
  res.status(200).json({
    status: res.statusCode,
    message: "Successfully found heroes!",
    data: heroes,
  });
};

export const getHeroByIdController = async (req, res) => {
  const { heroId } = req.params;
  const hero = await getHeroById(heroId);

  if (!hero) {
    throw createHttpError(404, "Hero not found...");
  }

  res.status(200).json({
    status: res.statusCode,
    data: hero,
    message: `Successfully found hero with id ${heroId}!`,
  });
};

export const createHeroController = async (req, res) => {
  const photoUrls = await photoHandler(req.files);
  const hero = await createHero({ ...req.body, images: photoUrls });

  res.status(201).json({
    status: 201,
    message: `Successfully created hero!`,
    data: hero,
  });
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
  // Додати логіку додавання та видалення конкретної фотографії та суперсили, вони зараз перезаписуються.

  if (!result) {
    next(createHttpError(404, "Hero not found"));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched Hero data!`,
    data: result.hero,
  });
};
