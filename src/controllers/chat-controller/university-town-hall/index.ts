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
  TICKET_CONFIRMATION,
} from "../../../domain/menu-options/shared/success";
import { extractValuesFromObject } from "../../../helpers";

import { ticketConfirmation as ticketConfirmationTemplate } from "../../../templates/ticket-confirmation";

const ticketConfirmationMenuOptions = { ...TICKET_CONFIRMATION };

const maintenanceCategoryOptions = extractValuesFromObject<string>(
  EMaintenanceCategoryKind
);

const maintenanceDepartmentRttOptions = extractValuesFromObject<string>(
  EMaintenanceDepartmentRtt
);

const maintenanceDepartmentMmeOptions = extractValuesFromObject<string>(
  EMaintenanceDepartmentMme
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
    const { message } = ticketConfirmationMenuOptions;

    ticketConfirmationMenuOptions.message = [
      message,
      ticketConfirmationTemplate(ticket),
    ].join("\n");

    return TicketConfirmationState;
  },
};

export const TicketConfirmationState: State = {
  menu: ticketConfirmationMenuOptions,
  next: () => AnswerPuMaintenanceState,
};

export const AnswerPuMaintenanceState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
