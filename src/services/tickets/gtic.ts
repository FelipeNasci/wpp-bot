import EmailService from "../email";
import { Ticket } from "./interface";
import { ticket as ticketConfig } from "../../../config";
import { Ticket as TicketModel } from "../../domain";

export class GticTicket implements Ticket {
  private static instance: GticTicket;
  private constructor() {}

  private getRawText = (data: TicketModel) =>
    [
      `*Nome*: ${data?.user?.name}`,
      `*Tipo de vínculo*: ${data?.user?.userType}`,
      `*Local de atendimento:*: ${data?.destination?.location}`,
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
    const text = this.getRawText(ticket);
    const html = this.getHtmlText(text);

    const subject = `${ticket.destination.location} - ${ticket.information.category} - ${ticket.information.serviceType}`;
    const to = ticketConfig.gtic.email;
    const from = { name: ticket.user.name, email: ticket.user.email };

    EmailService.send({ from, to, subject, text, html });
  }

  public static getInstance() {
    if (!this.instance) this.instance = new GticTicket();
    return this.instance;
  }
}
