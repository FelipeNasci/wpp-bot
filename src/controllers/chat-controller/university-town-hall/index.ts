import { State } from "../interface";
import {
  PU_DEPARTMENT_REQUESTER,
  PU_REGISTER_NUMBER_REQUESTER,
  PU_DEPARTMENT_PHONE_REQUESTER,
  PU_MAINTENANCE_CATEGORY,
  PU_MAINTENANCE_DEPARTMENT,
  PU_MAINTENANCE_DEPARTMENT_RTT,
  PU_MAINTENANCE_DEPARTMENT_MME,
  PU_MAINTENANCE_MORE_DETAILS,
  EMaintenanceCategoryKind,
  EMaintenanceDepartmentRtt,
  EMaintenanceDepartmentMme,
} from "../../../domain/menu-options/university-town-hall";
import { LOCATION, ELocation } from "../../../domain/menu-options/sign-up";

import {
  SUCCESS_ANSWER,
  RESTART_PROCESS,
  TICKET_CONFIRMATION,
  ETicketConfirmationOptions,
} from "../../../domain/menu-options/shared/success";
import { extractValuesFromObject } from "../../../helpers";

import {
  puTicketConfirmationTemplate,
  ticketConfirmation as ticketConfirmationTemplate,
} from "../../../templates/ticket-confirmation";
import { MenuOptions } from "../../../domain/menu-options/interface";

const maintenanceCategoryOptions = extractValuesFromObject<string>(
  EMaintenanceCategoryKind
);

const maintenanceDepartmentRttOptions = extractValuesFromObject<string>(
  EMaintenanceDepartmentRtt
);

const maintenanceDepartmentMmeOptions = extractValuesFromObject<string>(
  EMaintenanceDepartmentMme
);

const ticketConfirmationOptions = extractValuesFromObject<string>(
  ETicketConfirmationOptions
);

export const PuMaintenanceDepartmentKindState: State = {
  menu: PU_DEPARTMENT_REQUESTER,
  next: () => PuMaintenanceRegisterNumberState,
};

export const PuMaintenanceRegisterNumberState: State = {
  menu: PU_REGISTER_NUMBER_REQUESTER,
  next: () => PuMaintenanceDepartmentPhoneState,
};

export const PuMaintenanceDepartmentPhoneState: State = {
  menu: PU_DEPARTMENT_PHONE_REQUESTER,
  next: (_, ticket) => {
    if (ticket?.destination.department === LOCATION.options[ELocation.RTT])
      return PuMaintenanceDepartmentRttState;
    return PuMaintenanceDepartmentMmeState;
  },
};

export const PuMaintenanceDepartmentRttState: State = {
  menu: PU_MAINTENANCE_DEPARTMENT_RTT,
  next: (choice) =>
    maintenanceDepartmentRttOptions.includes(choice) &&
    PuMaintenanceDepartmentState,
};

export const PuMaintenanceDepartmentMmeState: State = {
  menu: PU_MAINTENANCE_DEPARTMENT_MME,
  next: (choice) =>
    maintenanceDepartmentMmeOptions.includes(choice) &&
    PuMaintenanceDepartmentState,
};

export const PuMaintenanceDepartmentState: State = {
  menu: PU_MAINTENANCE_DEPARTMENT,
  next: () => PuMaintenanceCategoryState,
};

export const PuMaintenanceCategoryState: State = {
  menu: PU_MAINTENANCE_CATEGORY,
  next: (choice) =>
    maintenanceCategoryOptions.includes(choice) &&
    PuMaintenanceMoreDetailsState,
};

export const PuMaintenanceMoreDetailsState: State = {
  menu: PU_MAINTENANCE_MORE_DETAILS,
  next: (_, ticket) => {
    const message = [
      TICKET_CONFIRMATION.message,
      puTicketConfirmationTemplate(ticket),
      " ",
    ].join("\n");

    const menu: MenuOptions = { ...TICKET_CONFIRMATION, message };
    return TicketConfirmationState({ menu });
  },
};

export const TicketConfirmationState = (params?: State): State => ({
  menu: params.menu || TICKET_CONFIRMATION,
  next: (choice) =>
    ticketConfirmationOptions.includes(choice) && AnswerPuMaintenanceState,
});

export const AnswerPuMaintenanceState: State = {
  type: "service",
  answer: (choice) => {
    if (choice === ETicketConfirmationOptions.AllRight)
      return SUCCESS_ANSWER.message;
    return RESTART_PROCESS.message;
  },
};
