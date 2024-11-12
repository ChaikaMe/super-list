import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createHeroController,
  deleteHeroController,
  getHeroByIdController,
  getHeroesController,
  patchHeroController,
} from "../controllers/heroes.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createHeroSchema,
  updateHeroSchema,
} from "../validation/heroes.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/heroes", ctrlWrapper(getHeroesController));

router.get(
  "/heroes/:heroId",
  isValidId,
  ctrlWrapper(getHeroByIdController)
);

router.post(
  "/heroes",
  upload.array("images", 8),
  validateBody(createHeroSchema),
  ctrlWrapper(createHeroController)
);

router.delete(
  "/heroes/:heroId",
  isValidId,
  ctrlWrapper(deleteHeroController)
);

router.patch(
  "/heroes/:heroId",
  isValidId,
  upload.array("images", 8),
  validateBody(updateHeroSchema),
  ctrlWrapper(patchHeroController)
);

export default router;
