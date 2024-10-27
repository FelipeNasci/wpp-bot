import EmailService from "../email";
import { Ticket } from "./interface";
import { ticket as ticketConfig } from "../../../config";
import { Ticket as TicketModel } from "../../domain";

export class GticTicket implements Ticket {
  private static instance: GticTicket;
  private constructor() {}

  private getRawText = (data: TicketModel, { serviceType }) =>
    [
      `*Nome*: ${data?.user?.name}`,
      `*Tipo de vínculo*: ${data?.user?.userType}`,
      `*Local de atendimento:*: ${data?.destination?.location}`,
      serviceType ||
        `*Tipo de serviço*: ${data?.information?.serviceType} em ${data?.information.category}`,
      `*Detalhes*: ${data?.information.description}`,
    ].join("\n");

  private getHtmlText = (text: string) =>
    text
      .split("\n")
      .map((line) => {
        const [key, value] = line.split(":");
        return `<b>${key.replace("*", "").replace("*", "")}</b>: ${value}`;
      })
      .join("<br/>");

  async create(ticket: TicketModel) {
    const obj = {
      "Grupo de Email": {
        serviceType: "*Tipo de serviço*: Adicionar email ao grupo de email",
        subject: `${ticket.destination.location} - ${ticket.information.category}`,
      },
    };

    const ticke = obj[ticket.information.category];
    const text = this.getRawText(ticket, { serviceType: ticke?.serviceType });
    const html = this.getHtmlText(text);

    const subject =
      ticke?.subject ||
      `${ticket.destination.location} - ${ticket.information.category} - ${ticket.information.serviceType}`;
    const to = ticketConfig.gtic.email;
    const from = { name: ticket.user.name, email: ticket.user.email };

    console.log({ from, to, subject, text, html });
    EmailService.send({ from, to, subject, text, html });
  }

  public static getInstance() {
    if (!this.instance) this.instance = new GticTicket();
    return this.instance;
  }
}
