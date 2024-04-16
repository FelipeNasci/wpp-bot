import { State } from "../../controllers/chat-controller/interface";
import { EUserType, USER_TYPE } from "../../domain/menu-options/sign-up";
import { otherPermissions } from "./other";
import { studentPermissions } from "./student";

type Permissions = Record<string, { denied: Record<string, "*" | string[]> }>;

const { options: user } = USER_TYPE;
const { Student, Other } = EUserType;

const permissions: Permissions = {
  [user[Student]]: studentPermissions,
  [user[Other]]: otherPermissions,
};

const convertArrayToObject = (acc: object, [key, value]) => {
  acc[key] = value;
  return acc;
};

export const isAllowedOption = (
  routeName: string,
  userType: string,
  option: string
) => {
  const deniedList = permissions[userType]?.denied[routeName] || [];
  return !deniedList.includes(option);
};
export const getAllowedMenu = (
  routeName: string,
  userType: string,
  { menu }: State
) => {
  const deniedList = permissions[userType]?.denied[routeName];

  if (!deniedList) return;

  const allowedMenu = Object.entries(menu.options)
    .filter(([key]) => !deniedList.includes(key))
    .reduce(convertArrayToObject, {});

  return allowedMenu;
};
