import { State } from "../controllers/chat-controller/interface";

export enum Actions {
  goBack = "voltar",
  exit = "sair",
}

export enum TicketDestination {
  Gtic = "gtic",
  Ascon = "ascon",
  AdministrativeConsultancy = "administrative_consultancy",
  UniversityTownHall = "university_town_hall",
}

export enum Location {
  Rtt = "Rio Tinto",
  Mme = "Mamanguape",
}

export enum UserType {
  Professor = "Professor",
  TAE = "TAE",
  Student = "Student",
  Other = "Other",
}

export type ChatUser = { phoneNumber: string; message: string };

export type ActiveUsers = {
  payload: {
    createdAt: Date;
    request: Request;
    currentState: State;
    previousStates?: State[];
  };
};

interface User {
  name?: string;
  register?: string;
  userType?: string;
  email?: string;
}

interface Destination {
  department?: `${TicketDestination}`;
  phone?: string;
  location?: `${Location}`;
  block?: string;
  room?: string;
  specificPlace?: string;
}

export type Ticket = {
  user?: User;
  destination?: Destination;

  serviceType?: string;
  equipment?: string;
  equipmentId?: string;
  description?: string;

  connectionType?: string;
};

export type Request = Ticket & Record<string, string>;
