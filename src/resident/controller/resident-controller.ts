import AwsService from "common/services/aws-service";
import { Request, Response } from "express";
import { ResidentModel } from "resident/model/resident-model";

export class ResidentController {
  private model = new ResidentModel();

  create = async (req: Request, res: Response) => {
    try {
      const { cpf, rg, name, contact_phone, birthday } = req.body;
      const image = req.file;

      const residentExists = await this.model.getByCpf(cpf);
      if (residentExists) {
        return res.status(400).json({ message: "Morador já existe!" });
      }

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

      return res.status(201).json({ message: "Morador cadastrado!" });
    } catch (e) {
      return res.status(500).json({ message: ["Erro ao cadastrar morador! ", e]  });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const resident = req.body;
      await this.model.update(resident);
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json({ message: "Erro ao atualizar morador" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const cpf = req.body.cpf;
      await this.model.deleteByCpf(cpf);
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json({ message: "Erro ao excluir morador" });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const residents = await this.model.getAll();
      return res.status(201).send({
        residents,
      });
    } catch (e) {
      return res.status(500).send({ message: "Erro ao buscar morador" });
    }
  };

  getByCpf = async (req: Request, res: Response) => {
    try {
      const { cpf } = req.params;
      const resident = await this.model.getByCpf(cpf);

      if (!resident) {
        return res.status(404).send({ message: "Morador não encontrado!" });
      }

      return res.status(201).send({
        resident,
      });
    } catch (e) {
      return res.status(500).send({ message: "Erro ao buscar morador!" });
    }
  };
}
