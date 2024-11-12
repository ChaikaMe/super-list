import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
  const { heroId } = req.params;
  if (!isValidObjectId(heroId)) {
    return next(createHttpError(400, "Bad Request: Invalid ID"));
  }
  next();
};
