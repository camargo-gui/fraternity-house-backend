import cron from "node-cron";
import { NotificationModel } from "../model/notification-model";

const notificationModel = new NotificationModel();

const scheduleCleanupReadNotifications = () => {
  cron.schedule("0 0 * * *", async () => {
    const daysOld = 15;
    try {
      await notificationModel.deleteReadNotifications(daysOld);
    } catch (error) {
      console.error("Erro ao excluir notificações lidas:", error);
    }
  });
};

export { scheduleCleanupReadNotifications };
