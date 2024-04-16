import {
  EQUIPMENT_MAINTENANCE_KIND,
  EQUIPMENT_ID,
  EQUIPMENT_BLOCK_LOCATION,
  EQUIPMENT_HALL_LOCATION,
  EQUIPMENT_MORE_DETAILS,
  EEquipmentType,
  EQUIPMENT_SERVICE_KIND,
  EEquipmentServiceType,
} from "../../../../domain/menu-options/gtic/it-equipment";
import { SUCCESS_ANSWER } from "../../../../domain/menu-options/shared/success";
import { extractValuesFromObject } from "../../../../helpers";
import type { State } from "../../interface";

const equipments = extractValuesFromObject<string>(EEquipmentType);
const equipmentServiceTypes = extractValuesFromObject<string>(
  EEquipmentServiceType
);

export const EquipmentServiceKindState: State = {
  menu: EQUIPMENT_SERVICE_KIND,
  next: (choice) =>
    equipmentServiceTypes.includes(choice) && EquipmentMaintenanceKindState,
};

export const EquipmentMaintenanceKindState: State = {
  menu: EQUIPMENT_MAINTENANCE_KIND,
  next: (choice) => equipments.includes(choice) && EquipmentMaintenanceIDState,
};

export const EquipmentMaintenanceIDState: State = {
  menu: EQUIPMENT_ID,
  next: () => EquipmentMaintenanceBlockState,
};

export const EquipmentMaintenanceBlockState: State = {
  menu: EQUIPMENT_BLOCK_LOCATION,
  next: () => EquipmentMaintenanceHallState,
};

export const EquipmentMaintenanceHallState: State = {
  menu: EQUIPMENT_HALL_LOCATION,
  next: () => EquipmentMaintenanceMoreDetailsState,
};

export const EquipmentMaintenanceMoreDetailsState: State = {
  menu: EQUIPMENT_MORE_DETAILS,
  next: () => AnswerEquipmentMaintenanceState,
};

export const AnswerEquipmentMaintenanceState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
