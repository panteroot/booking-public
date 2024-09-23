// validate request against the schema
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { AnyZodObject, ZodError, ZodIssue } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      logger.error(e);
      return res.status(400).send(e.errors);
    }
  };

export default validate;
