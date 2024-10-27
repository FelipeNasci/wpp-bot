import {
  EMAIL_GROUP_MORE_DETAILS,
  EMAIL_GROUP_KIND,
  EEmailGroupKind,
} from "../../../../domain/menu-options/gtic/email-group";
import { SUCCESS_ANSWER } from "../../../../domain/menu-options/shared/success";
import { extractValuesFromObject } from "../../../../helpers";
import { TicketConfirmationState } from "../../shared";
import type { State } from "../../interface";
import { gticEmailGroupTicketConfirmation } from "../../../../templates/ticket-confirmation";

const emailsKind = extractValuesFromObject<string>(EEmailGroupKind);

export const EmailGroupKindState: State = {
  menu: EMAIL_GROUP_KIND,
  next: (choice) => emailsKind.includes(choice) && EmailGroupMoreDetailsState,
};

export const EmailGroupMoreDetailsState: State = {
  menu: EMAIL_GROUP_MORE_DETAILS,
  next: (_, ticket) =>
    TicketConfirmationState(
      AnswerEmailGroupState,
      gticEmailGroupTicketConfirmation(ticket)
    ),
};

export const AnswerEmailGroupState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
