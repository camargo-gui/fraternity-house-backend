import { AuthRequest } from "common/entities/auth-request";
import AwsService from "common/services/aws-service";
import EmailService from "common/services/send-email-service";
import { EmployeeModel } from "employee/model/employee-model";
import { Request, Response } from "express";
import ResidentReport from "resident/email-templates/residents-report-email-template";
import { ResidentModel } from "resident/model/resident-model";
import { ScreeningModel } from "screening/model/screening-model";

export class ResidentController {
  private model = new ResidentModel();
  private screeningModel = new ScreeningModel();
  private employeeModel = new EmployeeModel();
  private emailService = new EmailService();

  create = async (req: Request, res: Response) => {
    try {
      const { cpf, rg, name, contact_phone, birthday } = req.body;
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

      await this.model.create({
        cpf,
        rg,
        name,
        contact_phone,
        birthday: new Date(birthday),
        url_image: resultadoUpload.Location,
      });

      return res.status(201).json({ message: ["Morador cadastrado!"] });
    } catch (e) {
      return res.status(500).json({ message: ["Erro ao cadastrar morador! "] });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { cpf, rg, name, contact_phone, birthday } = req.body;
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

      await this.model.update({
        cpf,
        rg,
        name,
        contact_phone,
        birthday: new Date(birthday),
        url_image: resultadoUpload.Location,
      });

      return res.status(201).send();
    } catch (e) {
      return res.status(500).json({ message: ["Erro ao atualizar morador"] });
    }
  };

  updateResidentsWithDeprecatedScreeningStatus = async (req: Request, res: Response) => {
    try {
      const screenings = await this.screeningModel.getScreeningWhereResidentsAreWithDeprecatedStatus();
      screenings.map(async (screening) => {
        await this.model.registerScreening(screening.id_resident);
      });
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json({ message: ["Erro ao atualizar status"] });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const cpf = req.body.cpf;
      await this.model.deleteByCpf(cpf);
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json({ message: ["Erro ao excluir morador"] });
    }
  };

  undelete = async (req: Request, res: Response) => {
    try {
      const cpf = req.body.cpf;
      await this.model.undeleteByCpf(cpf);
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json({ message: ["Erro ao reativar morador"] });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const residents = await this.model.getAll();
      return res.status(201).send({
        residents,
      });
    } catch (e) {
      return res.status(500).send({ message: ["Erro ao buscar morador"] });
    }
  };

  getByCpf = async (req: Request, res: Response) => {
    try {
      const { cpf } = req.params;
      const resident = await this.model.getByCpf(cpf);

      if (!resident) {
        return res.status(404).send({ message: ["Morador não encontrado!"] });
      }

      return res.status(201).send({
        resident,
      });
    } catch (e) {
      return res.status(500).send({ message: ["Erro ao buscar morador!"] });
    }
  };

  sendReport = async (req: AuthRequest, res: Response) => {
    try {
      const employee = await this.employeeModel.getById(req.id ?? 0);
      const residents = await this.model.getResidentsWithScreening();
      const template = ResidentReport(residents);
      await this.emailService.sendEmail(
        employee?.email ?? "",
        "Relatório de Moradores",
        template
      );
      return res
        .status(201)
        .send({ message: ["Relatório enviado com sucesso!"] });
    } catch (e) {
      return res.status(500).send({ message: ["Erro ao enviar relatório"] });
    }
  };
}
