import { AuthRequest } from "#/common/entities/auth-request";
import assert from "assert";
import { Request, Response } from "express";
import { NotificationDTO } from "../DTO/notification-dto";
import { NotificationModel } from "../model/notification-model";

export class NotificationController {
  private model: NotificationModel;

  constructor() {
    this.model = new NotificationModel();
  }

  public create = async (req: Request, res: Response) => {
    try {
      const notification: NotificationDTO = req.body;
      const createdNotification = await this.model.create(notification);
      return res.status(201).send(createdNotification);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public getAllByEmployeeId = async (req: AuthRequest, res: Response) => {
    try {
      const employeeId = req.id;
      assert(employeeId, "Employee id is required");

      const notifications = await this.model.getAllByEmployeeId(employeeId);
      return res.status(200).json({ notifications });
    } catch (error) {
      console.error("Error fetching notifications by employee id: ", error);
      return res.status(500).send();
    }
  };

  public markAsReadByEmployeeId = async (req: AuthRequest, res: Response) => {
    try {
      const employeeId = req.id;
      assert(employeeId, "Employee id is required");
      await this.model.markAsReadByEmployeeId(employeeId);
      return res.status(200).send();
    } catch (error) {
      console.error("Error marking notifications as read: ", error);
      return res.status(500).send();
    }
  };
}
