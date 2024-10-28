import { botController } from "../../../../src/controllers/bot-controller";
import {
  ENTRYPOINT_MENU_OPTIONS,
  EntrypointOptions,
} from "../../../../src/domain/menu-options";
import {
  ChatUser,
  Location,
  Ticket,
  TicketDestination,
} from "../../../../src/domain";
import { welcomeToChatMessage } from "../../../../src/helpers/messages";
import * as Signup from "../../../../src/domain/menu-options/sign-up";
import { generateMenu } from "../../../../src/helpers";
import { GTIC, EGticOptions } from "../../../../src/domain/menu-options/gtic";
import { gticItManagementTicketConfirmation } from "../../../../src/templates/ticket-confirmation";
import {
  SUCCESS_ANSWER,
  TICKET_CONFIRMATION,
} from "../../../../src/domain/menu-options/shared/success";
import { ELocation } from "../../../../src/domain/menu-options/sign-up";
import EmailSender from "../../../../src/services/email";

import {
  EItManagement,
  IT_MANAGEMENT,
  IT_MANAGEMENT_MORE_DETAILS,
} from "../../../../src/domain/menu-options/gtic/it-management";

jest.mock("../../../../src/services/email", () => ({
  send: jest.fn(),
}));

const data = {
  firstMessage: "Hello",
  confirmTicket: "1",
  user: { name: "John Doe", email: "jhon@ccae.ufpb.br" },

  information: {
    description: "I need to create a new VPN.",
  },
};
const input = {
  ...data,
  user: { ...data.user, userType: Signup.EUserType.TAE },
  destination: {
    location: Signup.ELocation.MME,
    department: EntrypointOptions.GTIC,
  },
  information: {
    ...data.information,
    category: EGticOptions.ItManagement,
    serviceType: EItManagement.Vpn,
  },
};

const ticketMock: Ticket = {
  ...data,
  user: {
    ...data.user,
    userType: Signup.USER_TYPE.options[Signup.EUserType.TAE],
  },
  destination: {
    location: Signup.LOCATION.options[ELocation.MME] as Location,
    department: ENTRYPOINT_MENU_OPTIONS.options[
      EntrypointOptions.GTIC
    ] as TicketDestination,
  },
  information: {
    ...data.information,
    category: GTIC.options[EGticOptions.ItManagement],
    serviceType: IT_MANAGEMENT.options[EItManagement.Ssh],
  },
};

const useMock: ChatUser = { phoneNumber: "string", message: "" };

const setup = (message: string) => botController({ ...useMock, message });

describe("e2e: GTIC > IT Management :", () => {
  describe("Maintenance", () => {
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

    test("[step 6] - Input: 1: GTIC - Answer: GTIC Options", () => {
      expect(setup(input.destination.department)).toBe(generateMenu(GTIC));
    });

    test("[step 7] - Input: 6: Select IT Management Option - Answer: IT Management Options", () => {
      expect(setup(input.information.category)).toBe(
        generateMenu(IT_MANAGEMENT)
      );
    });

    test("[step 8] - Input: 2: What kind of IT service do you need - Answer: Type more details", () => {
      expect(setup(input.information.serviceType)).toBe(
        generateMenu(IT_MANAGEMENT_MORE_DETAILS)
      );
    });

    test("[step 9] - Input: Describe the Ticket - Answer: Ticket Confirmation", () => {
      const descriptionMock = [
        TICKET_CONFIRMATION.message,
        gticItManagementTicketConfirmation(ticketMock),
        " ",
      ].join("\n");

      expect(setup(input.information.description)).toBe(
        generateMenu({ ...TICKET_CONFIRMATION, message: descriptionMock })
      );
    });

    test("[step 13] - Input: Confirm message - Answer: Success Message", () => {
      expect(setup(input.confirmTicket)).toBe(generateMenu(SUCCESS_ANSWER));
      expect(EmailSender.send).toHaveBeenCalled();
    });
  });
});
