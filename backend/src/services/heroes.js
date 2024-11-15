import { HeroesCollection } from "../db/models/heroModel.js";
import { calculatePaginationData } from "../utils/pagination/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";

export const getHeroes = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const heroesQuery = HeroesCollection.find();
  const heroesCount = await HeroesCollection.find()
    .merge(heroesQuery)
    .countDocuments();

  const heroes = await heroesQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(
    heroesCount,
    perPage,
    page
  );
  return { heroes: heroes, ...paginationData };
};

export const getHeroById = async (heroId) => {
  const hero = await HeroesCollection.findOne({ _id: heroId });
  return hero;
};

export const createHero = async (payload) => {
  const hero = await HeroesCollection.create(payload);
  return hero;
};

export const deleteHero = async (heroId) => {
  const hero = await HeroesCollection.findOneAndDelete({
    _id: heroId,
  });
  return hero;
};

export const updateHero = async (heroId, payload, options = {}) => {
  const rawResult = await HeroesCollection.findOneAndUpdate(
    { _id: heroId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    hero: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
