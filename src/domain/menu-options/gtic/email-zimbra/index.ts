import { MenuOptions } from "../../interface";

export enum EZimbraKindService {
  InstitutionalEmail = "1",
  PasswordRecovery = "2",
}

export const ZIMBRA_KIND_SERVICE: MenuOptions = {
  className: "ZIMBRA_KIND_SERVICE",
  message: "Qual o tipo de serviço você gostaria?",
  options: {
    [EZimbraKindService.InstitutionalEmail]: "Criação de email institucional",
    [EZimbraKindService.PasswordRecovery]: "Alteração de senha",
  },
};

export const ZIMBRA_MORE_DETAILS: MenuOptions = {
  className: "ZIMBRA_MORE_DETAILS",
  message:
    "Por favor, insira informações pertinentes a sua solicitação como: Email institucional ao qual você deseja suporte",
};
