import { AuthRequest } from "#/common/entities/auth-request";
import AwsService from "#/common/services/aws-service";
import { EmployeeModel } from "#/employee/model/employee-model";
import { MedicationSheetModel } from "#/medication-sheet/model/medication-sheet-model";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class EmployeeController {

  private model = new EmployeeModel();
  private medicationSheetModel = new MedicationSheetModel();
  private client = new PrismaClient();

  create = async (req: Request, res:Response) => {
    try {
      const employee = req.body;
      const image = req.file;

      let resultadoUpload = { Location: "" };
      if (image) {
        const awsService = new AwsService();
        resultadoUpload = await awsService.uploadFile(
          process.env.BUCKET_NAME ?? "",
          image?.originalname ?? "",
          image?.buffer ?? ""
        );
      }

      employee.url_image = resultadoUpload.Location;

      const createdEmployee = await this.model.create(employee);
      return res.status(201).send(createdEmployee);
    } catch (error) {
      console.log("Erro: ", error);
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
      const image = req.file;

      let resultadoUpload = { Location: "" };
      if (image) {
        const awsService = new AwsService();
        resultadoUpload = await awsService.uploadFile(
          process.env.BUCKET_NAME ?? "",
          image?.originalname ?? "",
          image?.buffer ?? ""
        );
      }

      employee.url_image = resultadoUpload.Location;

      const updatedEmployee = await this.model.update(employee);
      return res.status(200).send(updatedEmployee);
    } catch (error) {
      console.log("Erro: ", error);
      return res.status(500).send();
    }
  };

  deleteByCpf = async (req: Request, res: Response) => {
    try {
      const document = req.params.document;
      const employee = await this.medicationSheetModel.getByResponsibleCpf(document, this.client);
      if (employee) {
        return res.status(400).send({message: ["Não é possível excluir um funcionário que está associado a uma ficha de medicação"]});
      }
      await this.model.deleteByCpf(document);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send();
    }
  };

  undeleteByCpf = async (req: Request, res: Response) => {
    try {
      const cpf = req.body.document;
      await this.model.undeleteByCpf(cpf);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send();
    }
  };

  getById = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.id;
      console.log("ID: ", id);
      const employee = await this.model.getById(Number(id));
      return res.status(200).send(employee);
    }
    catch (error) {
      return res.status(500).send();
    }
  };
}