import { Ticket } from "../../services/tickets";
import { TicketDestination, Request } from "../../domain";

const create = async (ticket: Request) => {
  const ticketService = getTicketServiceInstance(ticket.destination.department);
  ticketService.create(ticket);
};

const getTicketServiceInstance = (destination: string) => {
  const mapTicketsService = {
    [TicketDestination.Gtic]: Ticket.Gtic,
    [TicketDestination.Ascon]: Ticket.Ascon,
    [TicketDestination.AdministrativeConsultancy]:
      Ticket.AdministrativeConsultancy,
    [TicketDestination.UniversityTownHall]: Ticket.UniversityTownHall,
  };

  const instance = mapTicketsService[destination];
  if (!instance) throw new Error("Invalid destination");
  return mapTicketsService[destination];
};

export const TicketController = { create };
