import { botController } from "../../../src/controllers/bot-controller";
import {
  ENTRYPOINT_MENU_OPTIONS,
  EntrypointOptions,
} from "../../../src/domain/menu-options";
import { ChatUser, Location, Ticket, TicketDestination } from "../../../src/domain";
import { welcomeToChatMessage } from "../../../src/helpers/messages";
import * as Signup from "../../../src/domain/menu-options/sign-up";
import { generateMenu } from "../../../src/helpers";
import { GTIC, EGticOptions } from "../../../src/domain/menu-options/gtic";
import {
  EZimbraKindService,
  ZIMBRA_KIND_SERVICE,
  ZIMBRA_MORE_DETAILS,
} from "../../../src/domain/menu-options/gtic/email-zimbra";
import { gticZimbraTicketConfirmation } from "../../../src/templates/ticket-confirmation";
import {
  SUCCESS_ANSWER,
  TICKET_CONFIRMATION,
} from "../../../src/domain/menu-options/shared/success";
import { ELocation } from "../../../src/domain/menu-options/sign-up";
import EmailSender from "../../../src/services/email";

jest.mock("../../../src/services/email", () => ({
  send: jest.fn(),
}));

const input = {
  firstMessage: "Hello",
  confirmTicket: "1",
  user: {
    name: "John Doe",
    email: "jhon@doe.com",
    userType: Signup.EUserType.TAE,
  },
  destination: {
    location: Signup.ELocation.MME,
    department: EntrypointOptions.GTIC,
  },
  information: {
    description:
      "create a email institutional for me. The email address can be: jhon@ccae.ufpb.br",
    category: EGticOptions.EmailZimbra,
    serviceType: EZimbraKindService.InstitutionalEmail,
  },
};

const ticketMock: Ticket = {
  user: {
    name: "John Doe",
    userType: Signup.USER_TYPE.options[Signup.EUserType.TAE],
    email: "jhon@doe.com",
  },
  destination: {
    location: Signup.LOCATION.options[ELocation.MME] as Location,
    department: ENTRYPOINT_MENU_OPTIONS.options[EntrypointOptions.GTIC] as TicketDestination,
  },
  information: {
    description:
      "create a email institutional for me. The email address can be: jhon@ccae.ufpb.br",
  },
  serviceType: "Criação de email institucional",
};

const descriptionMock = [
  TICKET_CONFIRMATION.message,
  gticZimbraTicketConfirmation(ticketMock),
  " ",
].join("\n");

const useMock: ChatUser = { phoneNumber: "string", message: "" };

const setup = (message: string) => botController({ ...useMock, message });

describe("GTIC Integration Tests", () => {
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
    expect(setup(input.destination.location)).toBe(generateMenu(Signup.EMAIL));
  });

  test("[step 5] - Input: User Email - Answer: Which department do you want to say", () => {
    expect(setup(input.user.email)).toBe(generateMenu(ENTRYPOINT_MENU_OPTIONS));
  });

  test("[step 6] - Input: 1: GTIC - Answer: GTIC Options", () => {
    expect(setup(input.destination.department)).toBe(generateMenu(GTIC));
  });

  test("[step 7] - Input: 2: Email Zimbra - Answer: Email Zimbra Options", () => {
    expect(setup(input.information.category)).toBe(
      generateMenu(ZIMBRA_KIND_SERVICE)
    );
  });

  test("[step 8] - Input: 1: Select Create Email Zimbra - Answer: How can you describe your solicitation?", () => {
    expect(setup(input.information.serviceType)).toBe(
      generateMenu(ZIMBRA_MORE_DETAILS)
    );
  });

  test("[step 9] - Input: Describe the Ticket - Answer: Ticket Confirmation", () => {
    expect(setup(input.information.description)).toBe(
      generateMenu({ ...TICKET_CONFIRMATION, message: descriptionMock })
    );
  });

  test("[step 10] - Input: Confirm message - Answer: Success Message", () => {
    expect(setup(input.confirmTicket)).toBe(generateMenu(SUCCESS_ANSWER));
    expect(EmailSender.send).toHaveBeenCalled();
  });
});
