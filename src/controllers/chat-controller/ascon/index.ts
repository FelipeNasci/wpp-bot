import { State } from "../interface";
import { ASCON } from "../../../domain/menu-options/ascon";
import { SUCCESS_ANSWER } from "../../../domain/menu-options/shared/success";

export const AsconMenuOptionsState: State = {
  menu: ASCON,
  next: () => AnswerAsconState,
};

export const AnswerAsconState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
