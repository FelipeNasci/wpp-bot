import { MenuOptions } from "../../interface";

export enum EEmailGroupKind {
  Tae = "1",
  Professor = "2",
  CenterCouncil = "3",
  Council = "4",
}

export const EMAIL_GROUP_KIND: MenuOptions = {
  className: "EMAIL_GROUP_KIND",
  message: "Qual o tipo de grupo você gostaria de ser inserido?",
  options: {
    [EEmailGroupKind.Tae]: "TAE",
    [EEmailGroupKind.Professor]: "Professor",
    [EEmailGroupKind.CenterCouncil]: "Conselho de centro",
    [EEmailGroupKind.Council]: "Conselho",
  },
};

export const EMAIL_GROUP_MORE_DETAILS: MenuOptions = {
  className: "EMAIL_GROUP_MORE_DETAILS",
  message:
    "Por favor, insira informações pertinentes a sua solicitação como: Email institucional ao qual você deseja suporte; Matrícula etc.",
};
