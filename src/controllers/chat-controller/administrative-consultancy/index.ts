import { State } from "../interface";
import { ADMINISTRATIVE_CONSULTANCY } from "../../../domain/menu-options/administrative-consultancy";
import { SUCCESS_ANSWER } from "../../../domain/menu-options/shared/success";

export const AdministrativeConsultancyMenuOptionsState: State = {
  menu: ADMINISTRATIVE_CONSULTANCY,
  next: () => AnswerAdministrativeConsultancyState,
};

export const AnswerAdministrativeConsultancyState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
