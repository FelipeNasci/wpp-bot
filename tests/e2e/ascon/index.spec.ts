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
import { GTIC, EGticOptions } from "../../../src/domain/menu-options/gtic";
import {
  asconConfirmationTemplate,
  gticItManagementTicketConfirmation,
} from "../../../src/templates/ticket-confirmation";
import {
  SUCCESS_ANSWER,
  TICKET_CONFIRMATION,
} from "../../../src/domain/menu-options/shared/success";
import { ELocation } from "../../../src/domain/menu-options/sign-up";
import EmailSender from "../../../src/services/email";

import {
  EItManagement,
  IT_MANAGEMENT,
  IT_MANAGEMENT_MORE_DETAILS,
} from "../../../src/domain/menu-options/gtic/it-management";
import { ASCON } from "../../../src/domain/menu-options/ascon";

jest.mock("../../../src/services/email", () => ({
  send: jest.fn(),
}));

const data = {
  firstMessage: "Hello",
  confirmTicket: "1",
  user: { name: "John Doe", email: "jhon@ccae.ufpb.br" },

  information: {
    description: "Publish the news about CCAE Chatbot.",
  },
};
const input = {
  ...data,
  user: { ...data.user, userType: Signup.EUserType.TAE },
  destination: {
    location: Signup.ELocation.MME,
    department: EntrypointOptions.ASCON,
  },
  information: {
    ...data.information,
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
      EntrypointOptions.ASCON
    ] as TicketDestination,
  },
  information: {
    ...data.information,
  },
};

const useMock: ChatUser = { phoneNumber: "string", message: "" };

const setup = (message: string) => botController({ ...useMock, message });

describe("e2e: ASCON:", () => {
  describe("Open a ticket", () => {
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

    test("[step 6] - Input: 2: ASCON - Answer: ASCON Details", () => {
      expect(setup(input.destination.department)).toBe(generateMenu(ASCON));
    });

    test("[step 7] - Input: Describe the Ticket - Answer: Ticket Confirmation", () => {
      const descriptionMock = [
        TICKET_CONFIRMATION.message,
        asconConfirmationTemplate(ticketMock),
        " ",
      ].join("\n");

      expect(setup(input.information.description)).toBe(
        generateMenu({ ...TICKET_CONFIRMATION, message: descriptionMock })
      );
    });

    test("[step 8] - Input: Confirm message - Answer: Success Message", () => {
      expect(setup(input.confirmTicket)).toBe(generateMenu(SUCCESS_ANSWER));
      expect(EmailSender.send).toHaveBeenCalled();
    });
  });
});
