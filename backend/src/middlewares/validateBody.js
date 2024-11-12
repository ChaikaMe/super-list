import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
  try {
    if (typeof req.body.superpowers === "string") {
      req.body.superpowers = JSON.parse(req.body.superpowers);
    }
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, "Bad Request", {
      errors: err.details,
    });
    next(error);
  }
};
