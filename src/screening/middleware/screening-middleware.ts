import { NextFunction, Request, Response } from "express";
import { screeningSchema } from "screening/schemas/screening-schema";

export class ScreeningMiddleware {
  execute = (req: Request, res: Response, next: NextFunction) => {
    const screening = req.body.screening;
    const {error} = screeningSchema.validate(screening);
    console.log(error);
    if(!screening || error) {
      return res.status(400).json({message: ["Campos obrigatórios não preenchidos"]});
    }

    next();
  };
}