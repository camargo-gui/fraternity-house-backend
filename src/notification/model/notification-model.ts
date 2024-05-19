import { NotificationDTO } from "../DTO/notification-dto";
import { prismaClient } from "client/prisma-client";

export class NotificationModel {
  create = async (notification: NotificationDTO) => {
    return prismaClient.notification.create({
      data: notification,
    });
  };

  getAllByEmployeeId = async (employeeId: number) => {
    try {
      return prismaClient.notification.findMany({
        where: {
          employeeId,
        },
        orderBy: [{ updatedAt: "desc" }],
      });
    } catch (error) {
      console.error("Error fetching notifications by employee id: ", error);
      throw error;
    }
  };

  markAsReadByEmployeeId = (employeeId: number) => {
    return prismaClient.notification.updateMany({
      where: { employeeId, wasRead: false },
      data: { wasRead: true },
    });
  };

  deleteReadNotifications = (daysOld: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysOld);

    return prismaClient.notification.deleteMany({
      where: { wasRead: true, updatedAt: { lte: date } },
    });
  };
}
