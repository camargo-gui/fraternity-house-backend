import { ResidentReportDTO } from "resident/DTO/residents-report-dto";

export default function ResidentReport(
  report: ResidentReportDTO[]
): string {
  const residentCards = report.map((report) => `
            <div style="border: 1px solid #ccc; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <img src="${report.url_image}" alt="Foto do morador" style="width: 100px; height: 100px; border-radius: 50%; margin-right: 20px; float: left; object-fit: cover">
              <h3 style="color: #0056b3">${report.name}</h3>
              <p><strong>CPF: </strong> ${report.cpf}</p>
              <p><strong>Nome do pai: </strong> ${report.Screening?.father_name}</p>
              <p><strong>Nome da mãe: </strong> ${report.Screening?.mother_name}</p>
              <p><strong>Plano de Saúde: </strong> ${report.Screening?.health_insurance}</p>
              <p><strong>Renda: </strong> ${report.Screening?.income}</p>
              <p><strong>Data de Entrada: </strong> ${report.Screening?.entry_date.toLocaleDateString()}</p>
            </div>`).join("");

  const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Lista de Moradores</title>
          </head>
          <body>
            <div style="background-color: #f4f4f4; padding: 20px">
              <div
                style="
                  max-width: 800px;
                  margin: auto;
                  background: white;
                  padding: 20px;
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #333;
                "
              >
                <h2 style="color: #0056b3">Lista de Moradores</h2>
                ${residentCards}
              </div>
            </div>
          </body>
        </html>`;

  return html;
}
