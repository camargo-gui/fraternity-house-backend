import { EmployeeModel } from "employee/model/employee-model";
import { Request, Response } from "express";

export class EmployeeController {

  private model = new EmployeeModel();


  create = async (req: Request, res:Response) => {
    try {
      const employee = req.body;
      const createdEmployee = await this.model.create(employee);
      return res.status(201).send(createdEmployee);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const employees = await this.model.getAll();
      return res.status(200).json({employees: employees});
    } catch (error) {
      return res.status(500).send();
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const employee = req.body;
      const updatedEmployee = await this.model.update(employee);
      return res.status(200).send(updatedEmployee);
    } catch (error) {
      return res.status(500).send();
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const document = req.params.document;
      await this.model.delete(document);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send();
    }
  };
}