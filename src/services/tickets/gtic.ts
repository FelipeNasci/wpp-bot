import EmailService from "../email";
import { Ticket } from "./interface";
import { ticket as ticketConfig } from "../../../config";
import { Ticket as TicketModel } from "../../domain";

export class GticTicket implements Ticket {
  private static instance: GticTicket;
  private constructor() {}

  async create(data: TicketModel & any) {
    console.log(JSON.stringify(data, null, 2));
    const text = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const html = Object.entries(data)
      .map(([key, value]) => `<b>${key}</b>: ${value}`)
      .join("<br/>");

    const subject = `${data.unidade} - ${data.information.category} - ${data.serviceType}`;
    const to = ticketConfig.gtic.email;
    const from = { name: data.user.name, email: data.user.email };
    EmailService.send({ from, to, subject, text, html });
  }

  public static getInstance() {
    if (!this.instance) this.instance = new GticTicket();
    return this.instance;
  }
}
