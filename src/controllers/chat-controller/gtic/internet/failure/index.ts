import { State } from "../../../interface";
import {
  BLOCK_FAILURE_INTERNET_ACCESS,
  HALL_FAILURE_INTERNET_ACCESS,
  MORE_DETAILS_FAILURE_INTERNET_ACCESS,
} from "../../../../../domain/menu-options/gtic/internet/failure";
import { SUCCESS_ANSWER } from "../../../../../domain/menu-options/shared/success";

export const FailureInternetBlockState: State = {
  menu: BLOCK_FAILURE_INTERNET_ACCESS,
  next: () => FailureInternetHallState,
};

export const FailureInternetHallState: State = {
  menu: HALL_FAILURE_INTERNET_ACCESS,
  next: () => FailureInternetMoreDetailsState,
};

export const FailureInternetMoreDetailsState: State = {
  menu: MORE_DETAILS_FAILURE_INTERNET_ACCESS,
  next: () => AnswerFailureInternetState,
};

export const AnswerFailureInternetState: State = {
  type: "service",
  answer: () => SUCCESS_ANSWER.message,
};
