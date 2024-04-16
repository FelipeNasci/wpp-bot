import EmailService from "../email";
import { Ticket } from "./interface";
import { ticket as ticketConfig } from "../../../config";

export class GticTicket implements Ticket {
  private static instance: GticTicket;
  private constructor() {}

  async create(data: any) {
    const text = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const html = Object.entries(data)
      .map(([key, value]) => `<b>${key}</b>: ${value}`)
      .join("<br/>");

    const subject = `${data.unidade} - ${data.servico} - ${data.tipoServico}`;
    const to = ticketConfig.gtic.email;
    const from = { name: data.name, email: data.email };
    EmailService.send({ from, to, subject, text, html });
  }

  public static getInstance() {
    if (!this.instance) this.instance = new GticTicket();
    return this.instance;
  }
}
