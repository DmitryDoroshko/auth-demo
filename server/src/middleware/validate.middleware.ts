import { flattenError, ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: flattenError(result.error),
      });
    }

    req.body = result.data; // now safely typed
    next();
  };