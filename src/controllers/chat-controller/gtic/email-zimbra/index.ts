import {
  ZIMBRA_KIND_SERVICE,
  ZIMBRA_MORE_DETAILS,
  EZimbraKindService,
} from "../../../../domain/menu-options/gtic/email-zimbra";
import { MenuOptions } from "../../../../domain/menu-options/interface";
import {
  ETicketConfirmationOptions,
  SUCCESS_ANSWER,
  TICKET_CONFIRMATION,
} from "../../../../domain/menu-options/shared/success";
import { extractValuesFromObject } from "../../../../helpers";
import { gticZimbraTicketConfirmation } from "../../../../templates/ticket-confirmation";
import type { State } from "../../interface";

const zimbraServices = extractValuesFromObject<string>(EZimbraKindService);
const ticketConfirmationOptions = extractValuesFromObject<string>(
  ETicketConfirmationOptions
);

export const ZimbraKindServiceState: State = {
  menu: ZIMBRA_KIND_SERVICE,
  next: (choice) => zimbraServices.includes(choice) && ZimbraMoreDetailsState,
};

export const ZimbraMoreDetailsState: State = {
  menu: ZIMBRA_MORE_DETAILS,
  next: (_, ticket) => {
    const message = [
      TICKET_CONFIRMATION.message,
      gticZimbraTicketConfirmation(ticket),
      " ",
    ].join("\n");

    const menu: MenuOptions = { ...TICKET_CONFIRMATION, message };
    return TicketConfirmationState({ menu });
  },
};

export const TicketConfirmationState = (params?: State): State => ({
  menu: params.menu || TICKET_CONFIRMATION,
  next: (choice) =>
    ticketConfirmationOptions.includes(choice) && AnswerZimbraServiceState,
});

export const AnswerZimbraServiceState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
