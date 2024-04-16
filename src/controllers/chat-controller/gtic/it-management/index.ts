import {
  IT_MANAGEMENT,
  EItManagement,
  IT_MANAGEMENT_MORE_DETAILS,
} from "../../../../domain/menu-options/gtic/it-management";
import { SUCCESS_ANSWER } from "../../../../domain/menu-options/shared/success";
import { extractValuesFromObject } from "../../../../helpers";
import type { State } from "../../interface";

const itManagementOptions = extractValuesFromObject<string>(EItManagement);

export const ItManagementState: State = {
  menu: IT_MANAGEMENT,
  next: (choice) =>
    itManagementOptions.includes(choice) && ItManagementMoreDetailsState,
};

export const ItManagementMoreDetailsState: State = {
  menu: IT_MANAGEMENT_MORE_DETAILS,
  next: () => AnswerItManagementState,
};

export const AnswerItManagementState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
