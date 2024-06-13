import { screeningSchema } from "#/screening/schemas/screening-schema";
import { NextFunction, Request, Response } from "express";

export class ScreeningMiddleware {
  execute = (req: Request, res: Response, next: NextFunction) => {
    const screening = req.body.screening;
    const {error} = screeningSchema.validate(screening);
    if(!screening || error) {
      return res.status(400).json({message: ["Campos obrigatórios não preenchidos"]});
    }

    next();
  };
}