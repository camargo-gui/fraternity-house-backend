import { AuthRequest } from "common/entities/auth-request";
import { JWT } from "common/entities/jwt";
import { NextFunction, Response } from "express";

export class EmployeeAuthMiddleware {

  private jwt = new JWT();

  execute = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: "Token is required" });
      }
      const token = authorization.split(" ")[1];
      const decoded = this.jwt.verify(token);
      if (!decoded){
        return res.status(401).json({ message: "Invalid token" });
      }
      req.id = decoded.id;
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}