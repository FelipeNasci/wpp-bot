import { MenuOptions } from "../interface";

export enum EUserType {
  Professor = "1",
  TAE = "2",
  Student = "3",
  Other = "4",
}

export enum ELocation {
  RTT = "1",
  MME = "2",
}

export const FULL_NAME: MenuOptions = {
  className: "FULL_NAME",
  message:
    "Qual o seu nome completo?",
};

export const USER_TYPE: MenuOptions = {
  className: "USER_TYPE",
  message: "Qual o seu vínculo com a UFPB?",
  options: {
    [EUserType.Professor]: "Professor",
    [EUserType.TAE]: "TAE",
    [EUserType.Student]: "Aluno",
    [EUserType.Other]: "Outro",
  },
};

export const LOCATION: MenuOptions = {
  className: "LOCATION",
  message: "Para qual unidade você gostaria de atendimento?",
  options: {
    [ELocation.RTT]: "Rio Tinto",
    [ELocation.MME]: "Mamanguape",
  },
};

export const EMAIL: MenuOptions = {
  className: "EMAIL",
  message:
    "Agora precisamos saber o seu email 😄, lembre-se que todas as nossas comunicações serão por ele.",
};
