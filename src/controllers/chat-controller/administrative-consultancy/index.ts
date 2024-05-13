import { State } from "../interface";
import { ADMINISTRATIVE_CONSULTANCY } from "../../../domain/menu-options/administrative-consultancy";
import {
  ETicketConfirmationOptions,
  SUCCESS_ANSWER,
  TICKET_CONFIRMATION,
} from "../../../domain/menu-options/shared/success";
import { extractValuesFromObject } from "../../../helpers";
import { MenuOptions } from "../../../domain/menu-options/interface";
import { administrativeConsultancyConfirmationTemplate } from "../../../templates/ticket-confirmation";

const ticketConfirmationOptions = extractValuesFromObject<string>(
  ETicketConfirmationOptions
);

export const AdministrativeConsultancyMenuOptionsState: State = {
  menu: ADMINISTRATIVE_CONSULTANCY,
  next: (_, ticket) => {
    const message = [
      TICKET_CONFIRMATION.message,
      administrativeConsultancyConfirmationTemplate(ticket),
      " ",
    ].join("\n");

    const menu: MenuOptions = { ...TICKET_CONFIRMATION, message };
    return TicketConfirmationState({ menu });
  },
};

export const TicketConfirmationState = (params?: State): State => ({
  menu: params.menu || TICKET_CONFIRMATION,
  next: (choice) =>
    ticketConfirmationOptions.includes(choice) &&
    AnswerAdministrativeConsultancyState,
});

export const AnswerAdministrativeConsultancyState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
