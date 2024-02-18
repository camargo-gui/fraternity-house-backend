import { Request, Response } from "express";

export default class ExampleController {

  get = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      res.status(201).json({id});
    } catch (e) {
      res.status(500).send({
        error: "USR-01",
        message: "Failed to create user",
      });
    }
  };
}
