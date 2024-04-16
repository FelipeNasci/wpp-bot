import { MenuOptions } from "../../interface";

export enum EItManagement {
  Ssh = "1",
  FirewallPorts = "2",
  Vpn = "3",
  ServiceRequest = "4",
}

export const IT_MANAGEMENT: MenuOptions = {
  className: "IT_MANAGEMENT",
  message: "Qual o tipo de serviço você precisa?",
  options: {
    [EItManagement.Ssh]: "SSH",
    [EItManagement.FirewallPorts]: "Portas Firewall",
    [EItManagement.Vpn]: "VPN",
    [EItManagement.ServiceRequest]: "Requisição de novo serviço",
  },
};

export const IT_MANAGEMENT_MORE_DETAILS: MenuOptions = {
  className: "IT_MANAGEMENT_MORE_DETAILS",
  message: "Por favor, informe mais detalhes sobre sua solicitação",
};
