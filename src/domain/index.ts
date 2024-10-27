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
    ticket: Request;
    currentState: State;
    previousStates?: State[];
  };
};

interface User {
  name?: string;
  register?: string;
  userType?: string;
  email?: string;
  department?: string;
}

interface Destination {
  department?: `${TicketDestination}`;
  phone?: string;
  location?: `${Location}`;
  block?: string;
  room?: string;
  specificPlace?: string;
}

interface GticData {
  category?: string;
  serviceType?: string;
  description?: string;
  connectionType?: string;
  equipmentKind?: string;
  equipmentId?: string;
}

interface Information extends GticData {}

export type Ticket = {
  user?: User;
  destination?: Destination;
  information?: Information;
  serviceType?: string;
  description?: string;
  equipment?: string;
  equipmentId?: string;

  connectionType?: string;
};

export type Request = Ticket & Record<string, string>;
