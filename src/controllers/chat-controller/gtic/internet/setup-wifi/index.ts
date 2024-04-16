import { State } from "../../../interface";
import {
  SETUP_WIFI,
  ANSWER_SETUP_WIFI,
} from "../../../../../domain/menu-options/gtic/internet/setup-wifi";

export const SetupWifiState: State = {
  menu: SETUP_WIFI,
  next: () => AnswerSetupWifiState,
};

export const AnswerSetupWifiState: State = {
  type: "information",
  answer: (choice) => ANSWER_SETUP_WIFI[choice],
};
