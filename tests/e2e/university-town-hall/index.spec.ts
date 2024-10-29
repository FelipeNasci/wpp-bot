
import { botController } from "../../../src/controllers/bot-controller";
import {
  ENTRYPOINT_MENU_OPTIONS,
  EntrypointOptions,
} from "../../../src/domain/menu-options";
import {
  ChatUser,
  Location,
  Ticket,
  TicketDestination,
} from "../../../src/domain";
import { welcomeToChatMessage } from "../../../src/helpers/messages";
import * as Signup from "../../../src/domain/menu-options/sign-up";
import { generateMenu } from "../../../src/helpers";
import { puTicketConfirmationTemplate } from "../../../src/templates/ticket-confirmation";
import {
  SUCCESS_ANSWER,
  TICKET_CONFIRMATION,
} from "../../../src/domain/menu-options/shared/success";
import { ELocation } from "../../../src/domain/menu-options/sign-up";

import {
  EMaintenanceCategoryKind,
  EMaintenanceDepartmentMme,
  PU_DEPARTMENT_PHONE_REQUESTER,
  PU_DEPARTMENT_REQUESTER,
  PU_MAINTENANCE_CATEGORY,
  PU_MAINTENANCE_DEPARTMENT,
  PU_MAINTENANCE_DEPARTMENT_MME,
  PU_MAINTENANCE_DEPARTMENT_RTT,
  PU_MAINTENANCE_MORE_DETAILS,
  PU_REGISTER_NUMBER_REQUESTER,
} from "../../../src/domain/menu-options/university-town-hall";
import { Http } from "../../../src/services/http";

jest.mock("../../../src/services/http", () => ({
  Http: {
    getInstance: jest.fn().mockImplementation(() => ({ post: jest.fn() })),
  },
}));

const data = {
  firstMessage: "Hello",
  confirmTicket: "1",
  user: {
    name: "John Doe",
    email: "jhon@ccae.ufpb.br",
    department: "GTIC",
    register: "123456789",
    phone: "987654321",
  },
  destination: { specificPlace: "MA 102" },
  information: {
    description: "Replace a light bulb in the hallway",
  },
};
const input = {
  ...data,
  user: { ...data.user, userType: Signup.EUserType.TAE },
  destination: {
    ...data.destination,
    location: Signup.ELocation.MME,
    block: EMaintenanceDepartmentMme.Auditorium,
    department: EntrypointOptions.SUBPREFEITRA,
  },
  information: {
    ...data.information,
    serviceType: EMaintenanceCategoryKind.Electricity,
  },
};

const ticketMock: Ticket = {
  ...data,
  user: {
    ...data.user,
    userType: Signup.USER_TYPE.options[Signup.EUserType.TAE],
  },
  destination: {
    ...data.destination,
    block:
      PU_MAINTENANCE_DEPARTMENT_MME.options[
        EMaintenanceDepartmentMme.Auditorium
      ],
    location: Signup.LOCATION.options[ELocation.MME] as Location,
    department: ENTRYPOINT_MENU_OPTIONS.options[
      EntrypointOptions.SUBPREFEITRA
    ] as TicketDestination,
  },
  information: {
    ...data.information,
    serviceType:
      PU_MAINTENANCE_CATEGORY.options[EMaintenanceCategoryKind.Electricity],
  },
};

const MAINTENANCE_DEPARTMENT = {
  [Signup.ELocation.MME]: PU_MAINTENANCE_DEPARTMENT_MME,
  [Signup.ELocation.RTT]: PU_MAINTENANCE_DEPARTMENT_RTT,
};

const useMock: ChatUser = { phoneNumber: "string", message: "" };

const setup = (message: string) => botController({ ...useMock, message });

describe("e2e: PU UNIVERSITY TOWN HALL:", () => {
  describe("Open ticket to solve a electricity problem", () => {
    test("[step 1] - Input: Say hello - Answer: Full Name", () => {
      expect(setup(input.firstMessage)).toBe(
        welcomeToChatMessage(Signup.FULL_NAME.message)
      );
    });

    test("[step 2] - Input: Inform name - Answer: User Type", () => {
      expect(setup(input.user.name)).toBe(generateMenu(Signup.USER_TYPE));
    });

    test("[step 3] - Input: User Type - Answer: User Location", () => {
      expect(setup(input.user.userType)).toBe(generateMenu(Signup.LOCATION));
    });

    test("[step 4] - Input: User Location - Answer: User Email", () => {
      expect(setup(input.destination.location)).toBe(
        generateMenu(Signup.EMAIL)
      );
    });

    test("[step 5] - Input: User Email - Answer: Which department do you want open a ticket", () => {
      expect(setup(input.user.email)).toBe(
        generateMenu(ENTRYPOINT_MENU_OPTIONS)
      );
    });

    test("[step 6] - Input: 4: University Town Hall - Answer: User Department", () => {
      expect(setup(input.destination.department)).toBe(
        generateMenu(PU_DEPARTMENT_REQUESTER)
      );
    });

    test("[step 7] - Input: User department - Answer: User Register Number", () => {
      expect(setup(input.user.department)).toBe(
        generateMenu(PU_REGISTER_NUMBER_REQUESTER)
      );
    });

    test("[step 8] - Input: User Register Number - Answer: User Register Number", () => {
      expect(setup(input.user.register)).toBe(
        generateMenu(PU_DEPARTMENT_PHONE_REQUESTER)
      );
    });

    test("[step 9] - Input: User Phone Number - Answer: Which department to open the Ticket", () => {
      expect(setup(input.user.phone)).toBe(
        generateMenu(MAINTENANCE_DEPARTMENT[input.user.userType])
      );
    });

    test("[step 10] - Input 1: Choice department - Answer: Which department to open the Ticket", () => {
      expect(setup(input.destination.block)).toBe(
        generateMenu(PU_MAINTENANCE_DEPARTMENT)
      );
    });

    test("[step 11] - Input 1: Choice department - Answer: Which department to open the Ticket", () => {
      expect(setup(input.destination.specificPlace)).toBe(
        generateMenu(PU_MAINTENANCE_CATEGORY)
      );
    });

    test("[step 11] - Input 1: Choice department - Answer: Which department to open the Ticket", () => {
      expect(setup(input.information.serviceType)).toBe(
        generateMenu(PU_MAINTENANCE_MORE_DETAILS)
      );
    });

    test("[step 12] - Input: Describe the Ticket - Answer: Ticket Confirmation", () => {
      const descriptionMock = [
        TICKET_CONFIRMATION.message,
        puTicketConfirmationTemplate(ticketMock),
        " ",
      ].join("\n");

      expect(setup(input.information.description)).toBe(
        generateMenu({ ...TICKET_CONFIRMATION, message: descriptionMock })
      );
    });

    test("[step 13] - Input: Confirm message - Answer: Success Message", () => {
      expect(setup(input.confirmTicket)).toBe(generateMenu(SUCCESS_ANSWER));
      expect(Http.getInstance().post).toBeCalled();
    });
  });
});
