import { State } from "../interface";
import { ASCON } from "../../../domain/menu-options/ascon";
import {
  ETicketConfirmationOptions,
  SUCCESS_ANSWER,
  TICKET_CONFIRMATION,
} from "../../../domain/menu-options/shared/success";
import { MenuOptions } from "../../../domain/menu-options/interface";
import { extractValuesFromObject } from "../../../helpers";
import { asconConfirmationTemplate } from "../../../templates/ticket-confirmation";

const ticketConfirmationOptions = extractValuesFromObject<string>(
  ETicketConfirmationOptions
);

export const AsconMenuOptionsState: State = {
  menu: ASCON,
  next: (_, ticket) => {
    const message = [
      TICKET_CONFIRMATION.message,
      asconConfirmationTemplate(ticket),
      " ",
    ].join("\n");

    const menu: MenuOptions = { ...TICKET_CONFIRMATION, message };
    return TicketConfirmationState({ menu });
  },
};

export const TicketConfirmationState = (params?: State): State => ({
  menu: params.menu || TICKET_CONFIRMATION,
  next: (choice) =>
    ticketConfirmationOptions.includes(choice) && AnswerAsconState,
});

export const AnswerAsconState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
