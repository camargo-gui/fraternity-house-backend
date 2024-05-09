import { PrescriptionDetail } from "notification/scheduler/notification-reminder-scheduler";

export const buildEmailMessageForEmployee = (
  details: PrescriptionDetail[],
  employeeName: string
) => {
  let message = `
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #dddddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Olá ${employeeName},</h2>
          <p>Segue a lista de medicações que precisam ser preparadas:</p>
          <table>
            <tr>
              <th>Morador</th>
              <th>Medicamento</th>
              <th>Dosagem</th>
              <th>Hora</th>
              <th>Data de Fim</th>
            </tr>`;

  details.forEach((detail: PrescriptionDetail) => {
    message += `
            <tr>
              <td>${detail.residentName}</td>
              <td>${detail.medicineName}</td>
              <td>${detail.dosage}</td>
              <td>${detail.time}</td>
              <td>${detail.endDate}</td>
            </tr>`;
  });

  message += `
          </table>
          <p>Por favor, prepare as medicações conforme necessário.</p>
          <p>Atenciosamente,<br/>Vila da fraternidade</p>
        </body>
      </html>`;

  return message;
};
