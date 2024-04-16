import { GTIC } from "../../../../../src/domain/menu-options/gtic";
import { INTERNET_ACCESS_KIND } from "../../../../../src/domain/menu-options/gtic/internet";
import {
  SETUP_WIFI,
  SO,
  ANSWER_SETUP_WIFI,
} from "../../../../../src/domain/menu-options/gtic/internet/setup-wifi";

import { generateMenu } from "../../../../../src/helpers";

export const phoneNumberMock = "+5583999999997";

export const gticMock = {
  menu: generateMenu(GTIC),
  internet: {
    menu: generateMenu(INTERNET_ACCESS_KIND),
    setupWifi: {
      menu: generateMenu(SETUP_WIFI),
      operationSystem: {
        android: {
          option: SO.ANDROID,
          answer: ANSWER_SETUP_WIFI[SO.ANDROID],
        },
        linux: {
          option: SO.LINUX,
          answer: ANSWER_SETUP_WIFI[SO.LINUX],
        },
        windows: {
          option: SO.WINDOWS,
          answer: ANSWER_SETUP_WIFI[SO.WINDOWS],
        },
        mac: {
          option: SO.MACOS,
          answer: ANSWER_SETUP_WIFI[SO.MACOS],
        },
      },
    },
  },
};
