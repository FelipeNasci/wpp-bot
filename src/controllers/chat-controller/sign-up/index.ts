import { State } from "../interface";
import {
  FULL_NAME,
  USER_TYPE,
  LOCATION,
  ELocation,
  EUserType,
  EMAIL,
} from "../../../domain/menu-options/sign-up";
import { InitialMenuState } from "../entrypoint-state";
import { extractValuesFromObject } from "../../../helpers";

export const FullNameState: State = {
  menu: FULL_NAME,
  next: () => UserTypeState,
};

const usersType = extractValuesFromObject<string>(EUserType);

export const UserTypeState: State = {
  menu: USER_TYPE,
  next: (choice) => usersType.includes(choice) && LocationState,
};

const locations = extractValuesFromObject<string>(ELocation);

export const LocationState: State = {
  menu: LOCATION,
  next: (choice) => locations.includes(choice) && EmailState,
};

export const EmailState: State = {
  menu: EMAIL,
  next: () => InitialMenuState,
};
