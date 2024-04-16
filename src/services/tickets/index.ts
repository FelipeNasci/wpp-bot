import { AdministrativeConsultancyTicket } from "./administrative-consultancy";
import { AsconTicket } from "./ascon";
import { GticTicket } from "./gtic";
import { UniversityTownHallTicket } from "./university-town-hall";

export const Ticket = {
  Gtic: GticTicket.getInstance(),
  Ascon: AsconTicket.getInstance(),
  AdministrativeConsultancy: AdministrativeConsultancyTicket.getInstance(),
  UniversityTownHall: UniversityTownHallTicket.getInstance(),
};
