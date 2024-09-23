import { Request, Response } from "express";
import {
  getProperties,
  getProperyCities,
  getLatestProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../services/PropertyService";
import { searchPaginatedPropertiesForAdmin } from "../services/SearchPropertyAdminService";
import logger from "../utils/logger";
import { PropertyInput } from "models/Property";
import { PropertyValidation } from "schemas/PropertySchema";

export const getPropertiesHandler = async (req: Request, res: Response) => {
  try {
    const properties = await getProperties();
    return res.send(properties);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const getProperyCitiesHandler = async (req: Request, res: Response) => {
  try {
    const skip = req.query.skip as string;
    const limit = req.query.limit as string;

    const parsedSkip = parseInt(skip || "0");
    const parsedLimit = parseInt(limit || "0");

    const properties = await getProperyCities(parsedSkip, parsedLimit);
    return res.send(properties);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const getLatestPropertiesHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const limit = req.query.limit as string;
    const parsedLimit = Number(limit) > 0 ? Number(limit) : 10;
    const properties = await getLatestProperties(parsedLimit);
    return res.send(properties);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const getPropertyHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await getProperty(id);
    if (!property) return res.sendStatus(404);

    return res.send(property);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const createPropertyHandler = async (
  req: Request<{}, {}, PropertyValidation["body"]>,

  res: Response
) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const propertyFormData: PropertyInput = req.body;

    const property = await createProperty(imageFiles, propertyFormData);
    if (!property) return res.sendStatus(404);

    return res.send(property);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const updatePropertyHandler = async (
  req: Request<{ id: string }, {}, PropertyValidation["body"]>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const imageFiles = req.files as Express.Multer.File[];
    const propertyFormData: PropertyInput = req.body;

    const property = await updateProperty(id, imageFiles, propertyFormData);

    if (!property) return res.sendStatus(404);

    return res.send(property);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const deletePropertyHandler = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;

    const property = await deleteProperty(propertyId);

    if (!property) return res.sendStatus(404);

    return res.send(property);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const searchPaginatedPropertiesForAdminHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const propertyName = req.query.propertyName as string;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const limit = 5;
    const skip = (pageNumber - 1) * limit;

    const properties = await searchPaginatedPropertiesForAdmin(
      propertyName,
      pageNumber,
      skip,
      limit
    );
    return res.send(properties);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};
