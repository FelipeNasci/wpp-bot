import { MenuOptions } from "../interface";

export enum EMaintenanceDepartmentMme {
  Auditorium = "1",
  Library = "2",
  BlockA = "3",
  BlockB = "4",
  BlockC = "5",
  BlockD = "6",
  BlockE = "7",
  BlockF = "8",
  BlockG = "9",
  BlockH = "10",
  BlockI = "11",
  Other = "12",
}

export enum EMaintenanceDepartmentRtt {
  CenterSteering = "1",
  UniversityTownHall = "2",
  Library = "3",
  UniversityResidenceA = "4",
  UniversityResidenceB = "5",
  UniversityRestaurant = "6",
  BlockA = "7",
  BlockB = "8",
  BlockC = "9",
  BlockD = "10",
  BlockE = "11",
  BlockF = "12",
  BlockG = "13",
  BlockH = "14",
  BlockI = "15",
  BlockJ = "16",
  Other = "17",
}

export enum EMaintenanceCategoryKind {
  CivilBuilding = "1",
  Electricity = "2",
  AirConditioning = "3",
  EquipmentsOrMachines = "4",
  Hydraulic = "5",
  Gardening = "6",
  Woodwork = "7",
  Other = "8",
}

export const PU_DEPARTMENT_REQUESTER: MenuOptions = {
  className: "PU_DEPARTMENT_REQUESTER",
  message:
    "Vou precisar de algumas informações adicionais. \nPor favor informe o seu *setor* ou *lotação*.",
};

export const PU_REGISTER_NUMBER_REQUESTER: MenuOptions = {
  className: "PU_REGISTER_NUMBER_REQUESTER",
  message: "Agora preciso que você informe sua *matrícula*.",
};

export const PU_MAINTENANCE_DEPARTMENT_MME: MenuOptions = {
  className: "PU_MAINTENANCE_DEPARTMENT_MME",
  message: "Perfeito! Qual o setor que você deseja solicitar manutenção?",
  options: {
    [EMaintenanceDepartmentMme.Auditorium]: "Auditório",
    [EMaintenanceDepartmentMme.Library]: "Biblioteca",
    [EMaintenanceDepartmentMme.BlockA]: "Bloco A - Salas de Aulas",
    [EMaintenanceDepartmentMme.BlockB]: "Bloco B - Salas de Aulas",
    [EMaintenanceDepartmentMme.BlockC]:
      "Bloco C - Salas de Aulas e Laboratórios",
    [EMaintenanceDepartmentMme.BlockD]:
      "Bloco D - Coordenações e Departamentos",
    [EMaintenanceDepartmentMme.BlockE]: "Bloco E - Salas de Aulas",
    [EMaintenanceDepartmentMme.BlockF]: "Bloco F - LIFE",
    [EMaintenanceDepartmentMme.BlockG]: "Bloco G - Centros Acadêmicos",
    [EMaintenanceDepartmentMme.BlockH]: "Bloco H - Laboratórios de Informática",
    [EMaintenanceDepartmentMme.BlockI]:
      "Bloco I - Almoxarifado, PIBID, Extensão",
    [EMaintenanceDepartmentMme.Other]: "Outros",
  },
};

export const PU_MAINTENANCE_DEPARTMENT_RTT: MenuOptions = {
  className: "PU_MAINTENANCE_DEPARTMENT_RTT",
  message: "Perfeito! Qual o setor que você deseja solicitar manutenção?",
  options: {
    [EMaintenanceDepartmentRtt.CenterSteering]: "Direção de Centro",
    [EMaintenanceDepartmentRtt.UniversityTownHall]: "Prefeitura Universitária",
    [EMaintenanceDepartmentRtt.Library]: "Biblioteca",
    [EMaintenanceDepartmentRtt.UniversityResidenceA]:
      "Residencia Universitária - A",
    [EMaintenanceDepartmentRtt.UniversityResidenceB]:
      "Residencia Universitária - B",
    [EMaintenanceDepartmentRtt.UniversityRestaurant]:
      "Restaurante Universitário",
    [EMaintenanceDepartmentRtt.BlockA]: "Bloco A - Central de Aulas",
    [EMaintenanceDepartmentRtt.BlockB]: "Bloco B - Design",
    [EMaintenanceDepartmentRtt.BlockC]: "Bloco C - Laboratório",
    [EMaintenanceDepartmentRtt.BlockD]: "Bloco D - Centros Acadêmicos",
    [EMaintenanceDepartmentRtt.BlockE]: "Bloco E - Central de Aulas 2",
    [EMaintenanceDepartmentRtt.BlockF]: "Bloco F - Laboratórios",
    [EMaintenanceDepartmentRtt.BlockG]:
      "Bloco G - Coordenações de Departamentos",
    [EMaintenanceDepartmentRtt.BlockH]: "Bloco H - Pós de Antropologia",
    [EMaintenanceDepartmentRtt.BlockI]: "Bloco I - Administrativo",
    [EMaintenanceDepartmentRtt.BlockJ]: "Bloco J - Gerência Administrativa",
    [EMaintenanceDepartmentRtt.Other]: "Outros",
  },
};

export const PU_MAINTENANCE_DEPARTMENT: MenuOptions = {
  className: "PU_MAINTENANCE_DEPARTMENT",
  message: "Por favor, especifique melhor o local que você deseja solicitar manutenção",
};

export const PU_DEPARTMENT_PHONE_REQUESTER: MenuOptions = {
  className: "PU_DEPARTMENT_PHONE_REQUESTER",
  message: "Qual o ramal do seu setor",
};

export const PU_MAINTENANCE_CATEGORY: MenuOptions = {
  className: "PU_MAINTENANCE_CATEGORY",
  message: "Em qual categoria você acredita que se encaixa a sua solicitação?",
  options: {
    [EMaintenanceCategoryKind.CivilBuilding]: "Construção Civil",
    [EMaintenanceCategoryKind.Electricity]: "Elétrica",
    [EMaintenanceCategoryKind.AirConditioning]: "Ar-condicionado",
    [EMaintenanceCategoryKind.EquipmentsOrMachines]: "Máquinas e equipamentos",
    [EMaintenanceCategoryKind.Hydraulic]: "Hidráulica",
    [EMaintenanceCategoryKind.Gardening]: "Jardinagem",
    [EMaintenanceCategoryKind.Woodwork]: "Marcenaria",
    [EMaintenanceCategoryKind.Other]: "Outros",
  },
};

export const PU_MAINTENANCE_MORE_DETAILS: MenuOptions = {
  className: "PU_MAINTENANCE_MORE_DETAILS",
  message: "Para finalizar, informe mais detalhes sobre o problema enfrentado",
};
