import { MenuOptions } from "../../interface";

export enum EInternetAccessKind {
  SetupWifi = "1",
  CableInternetFailure = "2",
  WifiInternetFailure = "3",
}

export const INTERNET_ACCESS_KIND: MenuOptions = {
  className: "INTERNET_ACCESS_KIND",
  message: "Em qual tipo de conexão a GTIC pode te ajudar?",
  options: {
    [EInternetAccessKind.SetupWifi]: "CONECTAR A UFPB SEM FIOS",
    [EInternetAccessKind.CableInternetFailure]: "FALHA EM INTERNET CABEADA",
    [EInternetAccessKind.WifiInternetFailure]: "FALHA EM INTERNET WIFI",
  },
};
