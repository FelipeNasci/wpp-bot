import EmailService from "../email";
import { Ticket } from "./interface";
import { ticket as ticketConfig } from "../../../config";
import { Ticket as TicketModel } from "../../domain";

export class AsconTicket implements Ticket {
  private static instance: AsconTicket;
  private constructor() {}

  private getRawText = (data: TicketModel) =>
    [
      `Nome: ${data?.user?.name}`,
      `Tipo de vínculo: ${data?.user?.userType}`,
      `Unidade de atendimento: ${data?.destination?.location}`,
      `Detalhes: ${data?.information.description}`,
    ].join("\n");

  private getHtmlText = (text: string) =>
    text
      .split("\n")
      .map((line) => {
        const [key, value] = line.split(":");
        return `<b>${key}</b>: ${value}`;
      })
      .join("<br/>");

  async create(data: TicketModel) {
    const text = this.getRawText(data);
    const html = this.getHtmlText(text);

    const subject = `Novo chamado de ${data.user.name} | ${data.destination.location}`;
    const to = ticketConfig.ascon.email;
    const from = { name: data.user.name, email: data.user.email };
    console.log({ from, to, subject, text, html });
    EmailService.send({ from, to, subject, text, html });
  }

  public static getInstance() {
    if (!this.instance) this.instance = new AsconTicket();
    return this.instance;
  }
}
