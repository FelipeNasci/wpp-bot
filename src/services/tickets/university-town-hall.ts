import { Ticket } from "./interface";
import { ticket as ticketConfig } from "../../../config";
import { Http } from "../http";
import { LOCATION, ELocation } from "../../domain/menu-options/sign-up";
import { Ticket as TicketModel } from "../../domain";
import FormData from "form-data";

export class UniversityTownHallTicket implements Ticket {
  private static instance: UniversityTownHallTicket;
  private constructor() {}

  async create(ticket: TicketModel) {
    const { url } = ticketConfig.universityTownHall;
    const form = prepareRequest(ticket);

    await Http.getInstance().post(url, form);
  }

  public static getInstance() {
    if (!this.instance) this.instance = new UniversityTownHallTicket();
    return this.instance;
  }
}

const getLocation = (locationUnit: string) => {
  const { options } = LOCATION;

  const rioTinto = options[ELocation.RTT];
  const mamanguape = options[ELocation.MME];

  return { [rioTinto]: "1", [mamanguape]: "3" }[locationUnit];
};

const prepareRequest = (ticket: TicketModel) => {
  const formData = new FormData();

  const location = getLocation(ticket.destination.location);
  const subject = `Solicitação de manutenção - ${ticket.information.serviceType} | ${ticket.destination.location} - ${ticket.destination.block} - ${ticket.destination.specificPlace} `;
  const priority = "low";

  const form = {
    name: ticket.user.name,
    email: ticket.user.email,
    priority: priority,
    custom1: ticket.user.department,
    custom2: ticket.user.register,
    custom3: ticket.user.phone,
    custom4: ticket.destination.block,
    custom5: ticket.destination.block,
    custom6: ticket.destination.specificPlace,
    custom7: ticket.information.serviceType,
    category: location,
    message: ticket.information.description,
    subject: subject,
    hx: "3",
    hy: "",
  };

  Object.entries(form).forEach(([key, value]) => formData.append(key, value));

  return formData;
};
