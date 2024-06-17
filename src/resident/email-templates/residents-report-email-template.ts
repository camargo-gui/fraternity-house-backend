import { ResidentReportDTO } from "#/resident/DTO/residents-report-dto";
import { DataToSend } from "./../DTO/data-to-send";

export default function ResidentReport(
  report: ResidentReportDTO,
  dataToSend: DataToSend
): string {
  const divError = "<p style=\"color: red;\"><strong>Necessário realizar triagem </strong></p>";

  const residentCard = `
    <div style="border: 1px solid #ccc; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
      <img src="${report.url_image === "" ? "https://bucket-fraternity.s3.amazonaws.com/profile.jpg" : report.url_image}" alt="Foto do morador" style="width: 100px; height: 100px; border-radius: 50%; margin-right: 20px; float: left; object-fit: cover">
      <h3 style="color: #0056b3">${report.name}</h3>
      <p><strong>CPF: </strong> ${report.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>
      ${report.Screening === null ? divError : `
      <table style="width: 100%;">
        <tr>
          ${dataToSend.religion ? `<td style="padding: 5px;"><strong>Religião: </strong> ${report.Screening?.religion}</td>` : ""}
          ${dataToSend.smoking ? `<td style="padding: 5px;"><strong>Fumante: </strong> ${report.Screening?.smoking ? "Sim" : "Não"}</td>` : ""}
          ${dataToSend.father_name ? `<td style="padding: 5px;"><strong>Nome do pai: </strong> ${report.Screening?.father_name}</td>` : ""}
        </tr>
        <tr>
          ${dataToSend.entry_date ? `<td style="padding: 5px;"><strong>Data de Entrada: </strong> ${report.Screening?.entry_date ? new Date(report.Screening?.entry_date).toLocaleDateString() : ""}</td>` : ""}
          ${dataToSend.mother_name ? `<td style="padding: 5px;"><strong>Nome da mãe: </strong> ${report.Screening?.mother_name}</td>` : ""}
          ${dataToSend.source_of_income ? `<td style="padding: 5px;"><strong>Fonte de Renda: </strong> ${report.Screening?.source_of_income}</td>` : ""}
        </tr>
        <tr>
          ${dataToSend.income ? `<td style="padding: 5px;"><strong>Renda: </strong> R$${report.Screening?.income},00</td>` : ""}
          ${dataToSend.health_insurance ? `<td style="padding: 5px;"><strong>Plano de Saúde: </strong> ${report.Screening?.health_insurance}</td>` : ""}
          ${dataToSend.funeral_insurance ? `<td style="padding: 5px;"><strong>Seguro Funeral: </strong> ${report.Screening?.funeral_insurance}</td>` : ""}
        </tr>
        <tr>
          ${dataToSend.number_of_sibling ? `<td style="padding: 5px;"><strong>Número de irmãos: </strong> ${report.Screening?.number_of_sibling}</td>` : ""}
          ${dataToSend.number_of_children ? `<td style="padding: 5px;"><strong>Número de filhos: </strong> ${report.Screening?.number_of_children}</td>` : ""}
          ${dataToSend.number_of_grandchildren ? `<td style="padding: 5px;"><strong>Número de netos: </strong> ${report.Screening?.number_of_grandchildren}</td>` : ""}
        </tr>
        <tr>
          ${dataToSend.Responsible ? `<td style="padding: 5px;"><strong>Responsável: </strong> ${report.Screening?.Responsible?.name}</td>` : ""}
          ${dataToSend.Illnesses ? `<td style="padding: 5px;"><strong>Doenças: </strong> ${report.Screening?.Illnesses?.map((illness) => illness.name).join(", ")}</td>` : ""}
          ${dataToSend.SpecialNeeds ? `<td style="padding: 5px;"><strong>Necessidades Especiais: </strong> ${report.Screening?.SpecialNeeds?.map((specialNeed) => specialNeed.name).join(", ")}</td>` : ""}
        </tr>
      </table>
      `}
    </div>`;

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
            ${residentCard}
          </div>
        </div>
      </body>
    </html>`;

  return html;
}
