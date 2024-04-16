import { MenuOptions } from "../../interface";

export enum ESetupAndInstallationKind {
  Software = "1",
  Computer = "2",
  VoipPhone = "3",
}

export const SETUP_KIND: MenuOptions = {
  className: "SETUP_KIND",
  message: "Qual o tipo de instação você precisa?",
  options: {
    [ESetupAndInstallationKind.Software]: "Software",
    [ESetupAndInstallationKind.Computer]: "Computadores",
    [ESetupAndInstallationKind.VoipPhone]: "Telefonia IP",
  },
};

export const SETUP_EQUIPMENT_ID: MenuOptions = {
  className: "SETUP_EQUIPMENT_ID",
  message: "Por favor, informe o número de tombamento do equipamento",
};

export const SETUP_EQUIPMENT_BLOCK_LOCATION: MenuOptions = {
  className: "SETUP_EQUIPMENT_BLOCK_LOCATION",
  message: "Por favor, informe em qual bloco está o equipamento",
};

export const SETUP_EQUIPMENT_HALL_LOCATION: MenuOptions = {
  className: "SETUP_EQUIPMENT_HALL_LOCATION",
  message: "Por favor, informe em qual sala está o equipamento",
};

export const SETUP_EQUIPMENT_MORE_DETAILS: MenuOptions = {
  className: "SETUP_EQUIPMENT_MORE_DETAILS",
  message: "Por favor, insira informações adicionais.",
};
