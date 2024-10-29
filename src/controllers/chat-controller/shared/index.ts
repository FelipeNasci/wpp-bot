import { State } from "../interface";
import {
  ETicketConfirmationOptions,
  TICKET_CONFIRMATION,
} from "../../../domain/menu-options/shared/success";
import { MenuOptions } from "../../../domain/menu-options/interface";
import { extractValuesFromObject } from "../../../helpers";

const ticketConfirmationOptions = extractValuesFromObject<string>(
  ETicketConfirmationOptions
);

export const TicketConfirmationState = (
  NextState: State,
  template: string
): State => {
  const message = [TICKET_CONFIRMATION.message, template, " "].join("\n");
  const menu: MenuOptions = { ...TICKET_CONFIRMATION, message };

  return {
    menu: menu,
    next: (choice) => ticketConfirmationOptions.includes(choice) && NextState,
  };
};
