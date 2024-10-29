import { Ticket as TicketModel } from "../../domain";

export interface Ticket {
  create: (data: TicketModel) => Promise<void>;
}
