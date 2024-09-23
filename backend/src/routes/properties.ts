import express from "express";
import { Request, Response, NextFunction, RequestHandler } from "express";

import {
  getPropertiesHandler,
  getProperyCitiesHandler,
  getLatestPropertiesHandler,
  getPropertyHandler,
  createPropertyHandler,
  updatePropertyHandler,
  deletePropertyHandler,
  searchPaginatedPropertiesForAdminHandler,
} from "../controllers/PropertyController";
import { PropertySchema } from "../schemas/PropertySchema";
import validateResource from "../middleware/validateResource";
import { uploadImageWithMulter } from "../helpers/uploadImages";
import { validateAdminToken } from "../middleware/requireAuth";

const router = express.Router();

router.get("/", getPropertiesHandler);
router.get("/cities", getProperyCitiesHandler);
router.get("/latest", getLatestPropertiesHandler);
router.get(
  "/search",
  validateAdminToken,
  searchPaginatedPropertiesForAdminHandler
);
router.get("/:id", getPropertyHandler);

router.use(validateAdminToken);
router.post(
  "/",
  uploadImageWithMulter("imageFiles", 10),
  validateResource(PropertySchema),
  createPropertyHandler
);

router.patch(
  "/:id",
  uploadImageWithMulter("imageFiles", 10),
  validateResource(PropertySchema),
  updatePropertyHandler
);

router.delete("/:id", deletePropertyHandler);

export default router;
