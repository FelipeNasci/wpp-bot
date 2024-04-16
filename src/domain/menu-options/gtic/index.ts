import { MenuOptions } from "../interface";

export enum EGticOptions {
  InternetAccess = "1",
  EmailZimbra = "2",
  EmailGroup = "3",
  ItEquipments = "4",
  SetupAndInstallation = "5",
  ItManagement = "6",
}
export const GTIC: MenuOptions = {
  className: "GTIC",
  message: "No que a GTIC poderia te ajudar?",
  options: {
    [EGticOptions.InternetAccess]: "Acesso à internet",
    [EGticOptions.EmailZimbra]: "Email Zimbra",
    [EGticOptions.EmailGroup]: "Grupo de Email",
    [EGticOptions.ItEquipments]: "Equipamentos de TI",
    [EGticOptions.SetupAndInstallation]: "Instalação / Configuração",
    [EGticOptions.ItManagement]: "Gerência de TI",
  },
};
