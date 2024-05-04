import { JWT } from "common/entities/jwt";
import EmailService from "common/services/send-email-service";
import { htmlPasswordReset } from "employee/email-templates/reset-password-email-template";
import { EmployeeModel } from "employee/model/employee-model";
import { Request, Response } from "express";

export class EmployeeResetPasswordController {
  private model = new EmployeeModel();
  private jwt = new JWT();
  private emailService = new EmailService();

  sendEmail = async (req: Request, res: Response) => {
    try {
      const { document } = req.body;
      const employee = await this.model.getByDocument(document);
      if (employee) {
        const token = this.jwt.generateForgotPasswordToken(employee.id);
        const resetLink = `${process.env.APPLICATION_DOMAIN}/reset-password?token=${token}`;

        const html = htmlPasswordReset.replace("RESET_LINK", resetLink);
        this.emailService.sendEmail(employee.email, "Redefinir senha", html);
      }

      return res.status(201).json({
        message: [
          "Se o email for válido, você receberá um link de redefinição.",
        ],
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: ["Erro interno no servidor.", error],
      });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { password, passwordConfirmation, token } = req.body;
      const decoded = this.jwt.verify(token);

      if (password !== passwordConfirmation) {
        return res.status(400).json({
          message: ["Senhas não conferem."],
        });
      }

      if (decoded) {
        const employee = await this.model.getById(decoded.id);
        if (employee) {
          await this.model.updatePassword(employee.id, password);
          return res.status(200).json({
            message: ["Senha redefinida com sucesso."],
          });
        }
      }

      return res.status(400).json({
        message: ["Token inválido."],
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: ["Erro interno no servidor.", error],
      });
    }
  };
}
