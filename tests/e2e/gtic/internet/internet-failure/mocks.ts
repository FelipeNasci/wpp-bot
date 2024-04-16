import { ENTRYPOINT_MENU_OPTIONS } from "../../../../../src/domain/menu-options";
import { GTIC } from "../../../../../src/domain/menu-options/gtic";
import { SUCCESS_ANSWER } from "../../../../../src/domain/menu-options/shared/success";
import { INTERNET_ACCESS_KIND } from "../../../../../src/domain/menu-options/gtic/internet";
import {
  BLOCK_FAILURE_INTERNET_ACCESS,
  HALL_FAILURE_INTERNET_ACCESS,
  MORE_DETAILS_FAILURE_INTERNET_ACCESS,
} from "../../../../../src/domain/menu-options/gtic/internet/failure";
import { SETUP_WIFI } from "../../../../../src/domain/menu-options/gtic/internet/setup-wifi";

import { generateMenu } from "../../../../../src/helpers";

export const phoneNumberMock = "+5583999999997";

export const departmentMock = {
  departmentMenu: generateMenu(ENTRYPOINT_MENU_OPTIONS),
};

export const gticMock = {
  menu: generateMenu(GTIC),
  internet: {
    menu: generateMenu(INTERNET_ACCESS_KIND),
    failure: {
      block: generateMenu(BLOCK_FAILURE_INTERNET_ACCESS),
      hall: generateMenu(HALL_FAILURE_INTERNET_ACCESS),
      moreDetails: generateMenu(MORE_DETAILS_FAILURE_INTERNET_ACCESS),
      answer: SUCCESS_ANSWER.message,
    },
    setupWifi: { menu: generateMenu(SETUP_WIFI) },
  },
};
