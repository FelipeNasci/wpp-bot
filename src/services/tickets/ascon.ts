import EmailService from "../email";
import { Ticket } from "./interface";
import { ticket as ticketConfig } from "../../../config";

export class AsconTicket implements Ticket {
  private static instance: AsconTicket;
  private constructor() {}

  async create(data: any) {
    const text = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const html = Object.entries(data)
      .map(([key, value]) => `<b>${key}</b>: ${value}`)
      .join("<br/>");

    const subject = `Solicitação ${data.name} ${data.unidade}`;
    const to = ticketConfig.ascon.email;
    const from = { name: data.name, email: data.email };
    EmailService.send({ from, to, subject, text, html });
  }

  public static getInstance() {
    if (!this.instance) this.instance = new AsconTicket();
    return this.instance;
  }
}
