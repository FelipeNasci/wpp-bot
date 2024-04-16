import {
  FULL_NAME,
  LOCATION,
  EMAIL,
  USER_TYPE,
} from "../../../src/domain/menu-options/sign-up";
import { generateMenu } from "../../../src/helpers";
import { welcomeToChatMessage } from "../../../src/helpers/messages";

export const phoneNumberMock = "+5583999999997";

export const signUpMock = {
  nameRequest: generateMenu(FULL_NAME),
  localizationRequest: generateMenu(LOCATION),
  bondRequest: generateMenu(USER_TYPE),
  emailRequest: generateMenu(EMAIL),
};

export const actionsMock = {
  welcomeMessage: welcomeToChatMessage(signUpMock.nameRequest),
};
